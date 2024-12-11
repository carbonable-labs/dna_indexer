import { StarknetStream } from "@apibara/starknet";
import { defineIndexer } from "@apibara/indexer";
import { NatsClient } from "./nats";
import { EventMapper } from "./parser";

import * as schema from "../schema";
import { db } from "../drizzle/dbConnexion";
import crypto from "crypto";

import { extractAndMergeAbi, getAppAddresses } from "./extract-and-merge-abi";
import { json } from "stream/consumers";

function pascalToSnakeCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
}
export function setupIndexer(appName: string) {
  const addresses = getAppAddresses(appName);
  const mergedAbi = extractAndMergeAbi(appName);
  const events = addresses.map((address) => ({ address }));
  const eventMapper = new EventMapper(mergedAbi);
  let natsClient: NatsClient;

  const setupNats = async () => {
    const client = new NatsClient({
      name: appName,
      subjects: [`indexer.${appName}.>`],
    });
    await client.connect();
    await client.createStreamIfNotExists();
    return client;
  };

  setupNats()
    .then((client) => {
      natsClient = client;
    })
    .catch(console.error);

  return defineIndexer(StarknetStream)({
    streamUrl: "https://starknet.preview.apibara.org",
    startingCursor: { orderKey: 900000n },
    filter: { events },
    async transform({ block }) {
      const { events, header } = block;
      for (const event of events) {
        const { selector, data } = extractSlectorAndData(
          event.keys!,
          event.data!
        );
        const object = eventMapper.createObjectFromAbi(selector, data);
        const event_id = generateEventId(object, event.transactionHash!);
        const name = eventMapper.getEventName(selector);
        if (!name) {
          console.error(`Event with selector ${selector} not found`);
          await schema["unknown_events"];
          continue;
        }
        const table = schema[pascalToSnakeCase(name)];
        try {
          await table
            .insert({
              event_id,
              contract_address: event.address,
              tx_hash: event.transactionHash,
              block_number: header?.blockNumber,
              // Other fields
            })
            .onConflict((cd) => cd.column(table.event_id).doNothing())
            .run();
        } catch (error) {
          if (error.code === "23505") {
            // Unique constraint violation
            console.log("Event already exists, skipping");
          } else {
            console.error(error);
          }
        }
        const natsString = `indexer.${appName}.event.${name}.${event.address}.ACCEPTED.${header?.blockNumber}.${event.transactionHash}`;
        console.log(natsString, object);
        await natsClient.publish(natsString, object);
      }
    },
  });
}
function generateEventId(event: string, txHash: string) {
  const hash = crypto.createHash("sha256");
  hash.update(JSON.stringify(event) + txHash);
  return hash.digest("base64");
}
type ArrayProcessingResult = {
  selector: string;
  data: string[];
};

function extractSlectorAndData(
  array1: readonly `0x${string}`[],
  array2: readonly `0x${string}`[]
): ArrayProcessingResult {
  if (array1.length === 0) {
    throw new Error("array1 must not be empty");
  }
  return {
    selector: array1[0],
    data: [...array1.slice(1), ...array2],
  };
}

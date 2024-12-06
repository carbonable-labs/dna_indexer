import { StarknetStream } from "@apibara/starknet";
import { defineIndexer } from "@apibara/indexer";
import { NatsClient } from "./nats";
import { EventMapper } from "./parser";
import { readdirSync, readFileSync } from "fs";
import { join } from "path";

export function setupIndexer(appName: string) {
  const eventsPath = join(__dirname, `../../protocols/${appName}`);
  const addresses = JSON.parse(
    readFileSync(join(eventsPath, "addresses/mainnet.json"), "utf8")
  );
  const events = addresses.map((address) => ({ address }));

  const mergedAbi = readdirSync(eventsPath)
    .filter((file) => file.endsWith(".json"))
    .map((file) => JSON.parse(readFileSync(join(eventsPath, file), "utf8")))
    .flat();

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
        const { selector: selectorStr, data } = extractSlectorAndData(
          event.keys!,
          event.data!
        );
        const selector = removeLeadingZeros(selectorStr);
        const object = eventMapper.createObjectFromAbi(selector, data);
        const name = eventMapper.getEventName(selector);
        const natsString = `indexer.${appName}.${name}.${event.address}.ACCEPTED.${header?.blockNumber}.${event.transactionHash}`;
        await natsClient.publish(natsString, object);
      }
    },
  });
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

function removeLeadingZeros(hex: string): string {
  const [prefix, numbers] = hex.split("0x");
  const cleanNumbers = numbers.replace(/^0+(?=\d)/, "");
  return `0x${cleanNumbers}`;
}

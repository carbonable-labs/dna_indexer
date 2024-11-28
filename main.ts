import type {
  Config,
  NetworkOptions,
  SinkOptions,
} from "https://esm.sh/@apibara/indexer";
import { hash } from "https://esm.run/starknet@5.14";

const ContractAddress = "";
const contractClassFilePath = "";
const eventsToParse: string[] = [];

async function loadContractEvents(filePath: string) {
  const fileContent = await Deno.readTextFile(filePath);
  const contractData = JSON.parse(fileContent);
  const abi = JSON.parse(contractData.abi);

  // Extract and normalize events
  const events = abi
    .filter((item: any) => item.type === "event")
    .map((event: any) => ({
      eventName: event.name,
      selectorName: event.name.split("::").pop(),
      members: event.members,
    }));

  const matchedEvents = events.filter((event: any) =>
    eventsToParse.includes(event.selectorName)
  );

  if (matchedEvents.length === 0) {
    console.error("No matching events found in the ABI.");
    return;
  }

  return events.reduce(
    (map: Record<string, any>, event: any) => ({
      ...map,
      [event.selector]: event,
    }),
    {}
  );
}

function generateConfig(
  eventsMetadata: Record<string, any>
): Config<NetworkOptions, SinkOptions> {
  const filterEvents = eventsMetadata.map((event: any) => ({
    fromAddress: ContractAddress,
    // @ts-ignore: hash.getSelectorName exists
    keys: [hash.getSelectorFromName(event.selectorName)],
    includeTransaction: true,
    includeReceipt: false,
  }));

  return {
    streamUrl: "https://sepolia.starknet.a5a.ch",
    startingBlock: 100000,
    finality: "DATA_STATUS_ACCEPTED",
    network: "starknet",
    filter: {
      header: { weak: true },
      events: filterEvents,
    },
    sinkType: "postgres",
    sinkOptions: {
      noTls: true,
      tableName: "transactions",
      connectionString:
        "postgresql://postgres:postgres@127.0.0.1:54322/postgres",
    },
  };
}

function parseObject(type: string, data: string) {
  return "";
}

function createTransformFunction(eventsMetadata: Record<string, any>) {
  return function transform({
    header,
    events,
  }: {
    header: { blockNumber: string; blockHash: string; timestamp: string };
    events: Array<{
      event: { keys: string[]; data: string[] };
      transaction: { meta: { hash: string } };
    }>;
  }) {
    const { blockNumber, blockHash, timestamp } = header;

    return events.map(({ event, transaction }) => {
      const transactionHash = transaction.meta.hash;
      const eventSelector = event.keys[0];

      // Check if the event selector matches a stored event
      const eventMetadata = eventsMetadata[eventSelector];

      if (!eventMetadata) {
        console.warn(`Unknown event with selector: ${eventSelector}`);
        return null;
      }

      // Transform event data based on member types
      const transformedData: Record<string, any> = {};
      const eventData = event.data;

      for (let i = 0; i < eventData.length; i++) {
        const type = eventMetadata[0].member.type.split("::").pop();
        const data = eventData[0];
        // transform the data according to type;
        const _data = parseObject(type, data);
        transformedData[eventMetadata[0].member.name] = _data;
      }

      return {
        network: "starknet-sepolia",
        block_hash: blockHash,
        block_number: +blockNumber,
        block_timestamp: timestamp,
        transaction_hash: transactionHash,
        event_name: eventMetadata.originalName,
        data: transformedData,
      };
    });
  };
}

// Load events metadata from contractClassFile
const eventsMetadata = await loadContractEvents(contractClassFilePath);

// Set up config for apibara using those events
export const config = generateConfig(eventsMetadata);

// Create the transform function
export const transform = createTransformFunction(eventsMetadata);

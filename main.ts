import type {
  Config,
  NetworkOptions,
  SinkOptions,
} from "https://esm.sh/@apibara/indexer";
import { hash, uint256, shortString } from "https://esm.run/starknet@5.14";
import { Header, Event } from "./types.ts";

const ContractAddress = "";
const contractClassFilePath = "";
const eventsToParse: string[] = [];

/**
 * Helper: Split hex string into `low` and `high` for uint256.
 */
function splitHexToUint256(hex: string): { low: string; high: string } {
  const paddedHex = hex.slice(2).padStart(64, "0");
  const high = "0x" + paddedHex.slice(0, 32);
  const low = "0x" + paddedHex.slice(32);
  return { low, high };
}

/**
 * Helper: Trim leading zeros from hex strings.
 */
function trimLeadingZeros(hexString: string): string {
  if (hexString.startsWith("0x")) {
    const trimmed = hexString.slice(2).replace(/^0+/, "");
    return "0x" + trimmed;
  }
  return hexString.replace(/^0+/, "");
}

function escapeInvalidCharacters(str: string) {
  return str.replace(/^[\x00-\x1F]+/, "");
}

function parseBool(data: string): boolean {
  const normalizedData = data.startsWith("0x")
    ? parseInt(data, 16)
    : parseInt(data, 10);
  return normalizedData !== 0;
}

/**
 * Load events metadata from the contract class file.
 */
async function loadContractEvents(filePath: string) {
  const fileContent = await Deno.readTextFile(filePath);
  const contractData = JSON.parse(fileContent);
  const abi = JSON.parse(contractData.abi);

  // Extract and normalize events
  const events = abi
    .filter((item: any) => item.type === "event")
    .map((event: any) => ({
      eventName: event.name,
      selector: hash.getSelectorFromName(event.name.split("::").pop()),
      members: event.members,
    }));

  // Match events based on `eventsToParse`
  const matchedEvents = events.filter((event: any) =>
    eventsToParse.includes(event.eventName.split("::").pop())
  );

  if (matchedEvents.length === 0) {
    console.error("No matching events found in the ABI.");
    return {};
  }

  return matchedEvents.reduce(
    (map: Record<string, any>, event: any) => ({
      ...map,
      [event.selector]: event,
    }),
    {}
  );
}

/**
 * Generate Apibara config for the matched events.
 */
function generateConfig(
  eventsMetadata: Record<string, any>
): Config<NetworkOptions, SinkOptions> {
  const filterEvents = Object.values(eventsMetadata).map((event: any) => ({
    fromAddress: ContractAddress,
    keys: [event.selector],
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

/**
 * Parse data based on its type.
 */
function parseObject(type: string, data: string) {
  switch (type) {
    case "u256": {
      const { low, high } = splitHexToUint256(data);
      return uint256.uint256ToBN({ low, high }).toString();
    }
    case "felt252":
      return data;
    case "string":
      return escapeInvalidCharacters(shortString.decodeShortString(data));
    case "hex":
      return trimLeadingZeros(data);
    case "bool":
      return parseBool(data);
    default:
      return data;
  }
}

/**
 * Create the transform function for Apibara.
 */
function createTransformFunction(eventsMetadata: Record<string, any>) {
  return function transform({
    header,
    events,
  }: {
    header: Header;
    events: Event[];
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
        const member = eventMetadata.members[i];
        const data = eventData[i];
        transformedData[member.name] = parseObject(
          member.type.split("::").pop(),
          data
        );
      }

      return {
        network: "starknet-sepolia",
        block_hash: blockHash,
        block_number: +blockNumber,
        block_timestamp: timestamp,
        transaction_hash: transactionHash,
        event_name: eventMetadata.eventName,
        data: transformedData,
      };
    });
  };
}

// Main Execution
const eventsMetadata = await loadContractEvents(contractClassFilePath);
if (!eventsMetadata) {
  console.error("Failed to load events metadata.");
  Deno.exit(1);
}

export const config = generateConfig(eventsMetadata);
export const transform = createTransformFunction(eventsMetadata);

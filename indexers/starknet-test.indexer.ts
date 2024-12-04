import { StarknetStream } from "@apibara/starknet";
import { defineIndexer } from "@apibara/indexer";
import { useLogger } from "@apibara/indexer/plugins/logger";
import { NatsClient } from "../utils/nats";
import { EventMapper } from "../utils/parser";
import abi from "../events.json";

const APP_NAME = "test";

type ArrayProcessingResult = {
  selector: string;
  data: string[];
};

const eventMapper = new EventMapper(abi);

// Initialize NATS outside
const setupNats = async () => {
  const natsClient = new NatsClient({ name: APP_NAME });
  await natsClient.connect();
  await natsClient.createStreamIfNotExists();
  return natsClient;
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

let natsClient: NatsClient;

setupNats()
  .then((client) => {
    natsClient = client;
  })
  .catch(console.error);

export default defineIndexer(StarknetStream)({
  streamUrl: "https://starknet.preview.apibara.org",
  startingCursor: {
    orderKey: 944645n,
  },
  filter: {
    events: [
      {
        address:
          "0x0516d0acb6341dcc567e85dc90c8f64e0c33d3daba0a310157d6bba0656c8769",
      },
    ],
  },
  async transform({ block }) {
    const { events, header } = block;
    const logger = useLogger();

    for (const event of events) {
      const { selector: selectorStr, data } = extractSlectorAndData(
        event.keys!,
        event.data!
      );
      const selector = removeLeadingZeros(selectorStr);
      const object = eventMapper.createObjectFromAbi(selector, data);
      const name = eventMapper.getEventName(selector);

      const natsString = `indexer.${APP_NAME}.${name}.${event.address}.ACCEPTED.${header?.blockNumber}.${event.transactionHash}`;
      await natsClient.publish(natsString, object);
    }
  },
});

process.on("SIGINT", async () => {
  if (natsClient) {
    await natsClient.disconnect();
  }
  process.exit(0);
});

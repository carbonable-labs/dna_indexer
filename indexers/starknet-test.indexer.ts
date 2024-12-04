import { StarknetStream } from "@apibara/starknet";
import { defineIndexer } from "@apibara/indexer";
import { connect, NatsConnection } from "nats";
import { hash, uint256 } from "starknet";
import { useLogger } from "@apibara/indexer/plugins/logger";

// let natsClient: NatsConnection;

// // Initialize NATS connection
// async function initNats() {
//   try {
//     natsClient = await connect({ servers: "localhost:4222" });
//     console.log("Connected to NATS server");
//   } catch (err) {
//     console.error("Failed to connect to NATS:", err);
//     process.exit(1);
//   }
// }

// Initialize NATS before starting the indexer
// initNats();

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
    const { events, header, messages } = block;
    const logger = useLogger();

    // Publish block header info
    events.forEach((event) => {
      logger.log(
        `starknet.blocks - ${header?.blockHash} - ${header?.blockNumber}`
      );

      const { selector, data } = extractSlectorAndData(
        event.keys!,
        event.data!
      );
      const hashed = hash.getSelectorFromName("ApprovalForAll");
      logger.log(selector, hashed);
      if (removeLeadingZeros(selector) == hashed) {
        let [owner, operator, approved] = data;
        logger.log(`ApprovalForAll - ${owner} - ${operator} - ${approved}`);
      }
    });

    // await natsClient.publish("starknet.blocks", header?.blockHash);
    // const sub = await js.pullSubscribe("orders.new", {
    //   durable: "my-service-name",
    //   deliverPolicy: DeliverPolicy.LastPerSubject,
    // // Publish each event
    // for (const event of events) {
    //   const eventData = {
    //     // eventIndex: event.eventIndex,
    //     transactionHash: event.transactionHash,
    //     data: event.data,
    //     address: event.address,

    //     // blockNumber: header?.blockNumber,
    //   };

    //   await natsClient.publish("starknet.events", JSON.stringify(eventData));
    // }
  },
});

// // Handle cleanup on process exit
// process.on("SIGINT", async () => {
//   if (natsClient) {
//     await natsClient.close();
//     console.log("NATS connection closed");
//   }
//   process.exit(0);
// });

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
  // Split into '0x' and the rest
  const [prefix, numbers] = hex.split("0x");
  // Remove leading zeros and keep at least one digit
  const cleanNumbers = numbers.replace(/^0+(?=\d)/, "");
  // Reconstruct with '0x'
  return `0x${cleanNumbers}`;
}

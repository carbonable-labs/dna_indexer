import { Event, EventDetails, Header, Transaction } from "./types.ts";
import type {
  Config,
  NetworkOptions,
  SinkOptions,
} from "https://esm.sh/@apibara/indexer";
import { hash, uint256 } from "https://esm.run/starknet@5.14";
import { formatUnits } from "https://esm.run/viem@1.4";
const DECIMALS = 18;

export const config: Config<NetworkOptions, SinkOptions> = {
  streamUrl: "https://mainnet.starknet.a5a.ch",
  startingBlock: 898985, // Block number
  finality: "DATA_STATUS_ACCEPTED",
  network: "starknet",
  filter: {
    header: { weak: true },
    events: [
      {
        fromAddress: "address of the contract",
        keys: ["selector or ", hash.getSelectorFromName("Name of the event")],
      },
    ],
  },
  sinkType: "postgres",
  sinkOptions: {
    noTls: true,
    tableName: "transfers",
  },
};

export default function transform({
  header,
  events,
}: {
  header: Header;
  events: Event[];
}) {
  const { blockNumber, blockHash, timestamp } = header;
  console.log(`-------------\n\n${JSON.stringify(header)}\n\n`);

  return events.map(
    ({
      event,
      transaction,
    }: {
      event: EventDetails;
      transaction: Transaction;
    }) => {
      const transactionHash = transaction.meta.hash;
      const transferId = `${transactionHash}_${event.index}`;

      const [fromAddress, toAddress, amountLow, amountHigh] = event.data;

      const amountRaw = uint256.uint256ToBN({
        low: amountLow,
        high: amountHigh,
      });

      const amount = formatUnits(amountRaw, DECIMALS);

      // Convert to snake_case because it works better with postgres.
      return {
        network: "starknet-mainnet",
        symbol: "ETH",
        block_hash: blockHash,
        block_number: +blockNumber,
        block_timestamp: timestamp,
        transaction_hash: transactionHash,
        transfer_id: transferId,
        from_address: fromAddress,
        to_address: toAddress,
        amount: +amount,
        amount_raw: amountRaw.toString(),
      };
    }
  );
}
// It's gonna log here

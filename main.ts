import { BlockData, Event, EventDetails } from "./types";
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
  startingBlock: 898985,
  finality: "DATA_STATUS_ACCEPTED",
  network: "starknet",
  filter: {
    header: { weak: true },
    events: [
      {
        fromAddress: "address of the contract",
        keys: [hash.getSelectorFromName("Dame of the event")],
      },
    ],
  },
  sinkType: "console",
};

export default function transform({ header, events }) {
  const { blockNumber, blockHash, timestamp } = header;
  // console.table(header);
  console.log(`-------------\n\n${JSON.stringify(header)}\n\n`);

  return events.map(({ event, receipt }) => {
    // console.log(`-------------\n\n${JSON.stringify(event)}\n\n`);
    const { transactionHash } = receipt;

    const transferId = `${transactionHash}_${event.index}`;

    const [fromAddress, toAddress, amountLow, amountHigh] = event.data;
    const amountRaw = uint256.uint256ToBN({ low: amountLow, high: amountHigh });
    const amount = formatUnits(amountRaw, DECIMALS);

    // Convert to snake_case because it works better with postgres.
    let ret = {
      network: "starknet",
      symbol: "ETH",
      // block_hash: blockHash,
      block_number: +blockNumber,
      block_timestamp: timestamp,
      transaction_hash: transactionHash,
      transfer_id: transferId,
      from_address: fromAddress,
      to_address: toAddress,
      amount: amount,
      amount_raw: amountRaw.toString(),
    };
    // console.table(ret);
    return ret;
  });
}

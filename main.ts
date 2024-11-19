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
  sinkType: "console",
};

export default function transform({ header, events }) {
  const { blockNumber, blockHash, timestamp } = header;
  // console.table(header);
  console.log(`-------------\n\n${JSON.stringify(header)}\n\n`);

  return events.map(({ event, receipt }) => {
    // TODO  --> create the obejct with the good type here  by loading bloick cursor tx_hash and data
    //Data is an array of hex that you have to parse following the event specification
  });
}
// It's gonna log here

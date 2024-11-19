export interface BlockData {
  status: string;
  events: Event[];
}

export interface Event {
  transaction: Transaction;
  event: EventDetails;
}

export interface Transaction {
  meta: TransactionMeta;
  invokeV3: InvokeV3;
}

export interface TransactionMeta {
  hash: string;
  signature: string[];
  nonce: string;
  version: string;
  resourceBounds: ResourceBounds;
  nonceDataAvailabilityMode: string;
  feeDataAvailabilityMode: string;
  transactionIndex: string;
}

export interface ResourceBounds {
  l1Gas: Gas;
  l2Gas: Gas;
}

export interface Gas {
  maxAmount?: string;
  maxPricePerUnit?: PricePerUnit;
}

export interface PricePerUnit {
  high: string;
}

export interface InvokeV3 {
  senderAddress: string;
  calldata: string[];
}

export interface EventDetails {
  fromAddress: string;
  keys: string[];
  data: string[];
  index: string;
}

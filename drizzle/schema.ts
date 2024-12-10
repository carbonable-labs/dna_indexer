import { pgTable, serial, varchar, bigint, timestamp, index } from 'drizzle-orm/pg-core';

const baseColumns = {
  event_id: varchar('event_id', { length: 42 }).primaryKey(),
  created_at: timestamp('created_at').defaultNow(),
  contract_address: varchar('contract_address', { length: 66 }).notNull(),
  tx_hash: varchar('tx_hash', { length: 66 }).notNull(),
  block_number: bigint('block_number', { mode: 'number' }).notNull(),
};

export const unknownEvents = pgTable('unknown_event', {
  ...baseColumns,
  selector: varchar('selector', { length: 66 }),
  data: varchar("data", { length: 66 }).array(),
}, (table) => ({
  contractIdx: index('idx_unknown_event_contract').on(table.contract_address),
  txHashIdx: index('idx_unknown_event_tx').on(table.tx_hash),
  blockIdx: index('idx_unknown_event_block').on(table.block_number)
}));

export const absorptionUpdate = pgTable('absorption_update', {
  ...baseColumns,
  slot: varchar('slot', { length: 78 }),
 time: bigint('time', { mode: 'number' }),
}, (table) => ({
  contractIdx: index('idx_absorption_update_contract').on(table.contract_address),
  txHashIdx: index('idx_absorption_update_tx').on(table.tx_hash),
  blockIdx: index('idx_absorption_update_block').on(table.block_number)
}));

export const projectValueUpdate = pgTable('project_value_update', {
  ...baseColumns,
  slot: varchar('slot', { length: 78 }),
 value: varchar('value', { length: 78 }),
}, (table) => ({
  contractIdx: index('idx_project_value_update_contract').on(table.contract_address),
  txHashIdx: index('idx_project_value_update_tx').on(table.tx_hash),
  blockIdx: index('idx_project_value_update_block').on(table.block_number)
}));

export const deposit = pgTable('deposit', {
  ...baseColumns,
  address: varchar('address', { length: 66 }),
 value: varchar('value', { length: 78 }),
 time: bigint('time', { mode: 'number' }),
}, (table) => ({
  contractIdx: index('idx_deposit_contract').on(table.contract_address),
  txHashIdx: index('idx_deposit_tx').on(table.tx_hash),
  blockIdx: index('idx_deposit_block').on(table.block_number)
}));

export const withdraw = pgTable('withdraw', {
  ...baseColumns,
  address: varchar('address', { length: 66 }),
 value: varchar('value', { length: 78 }),
 time: bigint('time', { mode: 'number' }),
}, (table) => ({
  contractIdx: index('idx_withdraw_contract').on(table.contract_address),
  txHashIdx: index('idx_withdraw_tx').on(table.tx_hash),
  blockIdx: index('idx_withdraw_block').on(table.block_number)
}));

export const priceUpdate = pgTable('price_update', {
  ...baseColumns,
  price: varchar('price', { length: 78 }),
 time: bigint('time', { mode: 'number' }),
}, (table) => ({
  contractIdx: index('idx_price_update_contract').on(table.contract_address),
  txHashIdx: index('idx_price_update_tx').on(table.tx_hash),
  blockIdx: index('idx_price_update_block').on(table.block_number)
}));

export const claim = pgTable('claim', {
  ...baseColumns,
  address: varchar('address', { length: 66 }),
 amount: varchar('amount', { length: 78 }),
 time: bigint('time', { mode: 'number' }),
}, (table) => ({
  contractIdx: index('idx_claim_contract').on(table.contract_address),
  txHashIdx: index('idx_claim_tx').on(table.tx_hash),
  blockIdx: index('idx_claim_block').on(table.block_number)
}));

export const ownershipTransferred = pgTable('ownership_transferred', {
  ...baseColumns,
  previous_owner: varchar('previous_owner', { length: 66 }),
 new_owner: varchar('new_owner', { length: 66 }),
}, (table) => ({
  contractIdx: index('idx_ownership_transferred_contract').on(table.contract_address),
  txHashIdx: index('idx_ownership_transferred_tx').on(table.tx_hash),
  blockIdx: index('idx_ownership_transferred_block').on(table.block_number)
}));

export const upgraded = pgTable('upgraded', {
  ...baseColumns,
  class_hash: varchar('class_hash', { length: 255 }),
}, (table) => ({
  contractIdx: index('idx_upgraded_contract').on(table.contract_address),
  txHashIdx: index('idx_upgraded_tx').on(table.tx_hash),
  blockIdx: index('idx_upgraded_block').on(table.block_number)
}));

export const transfer = pgTable('transfer', {
  ...baseColumns,
  from: varchar('from', { length: 66 }),
 to: varchar('to', { length: 66 }),
 token_id: varchar('token_id', { length: 78 }),
}, (table) => ({
  contractIdx: index('idx_transfer_contract').on(table.contract_address),
  txHashIdx: index('idx_transfer_tx').on(table.tx_hash),
  blockIdx: index('idx_transfer_block').on(table.block_number)
}));

export const approval = pgTable('approval', {
  ...baseColumns,
  owner: varchar('owner', { length: 66 }),
 approved: varchar('approved', { length: 66 }),
 token_id: varchar('token_id', { length: 78 }),
}, (table) => ({
  contractIdx: index('idx_approval_contract').on(table.contract_address),
  txHashIdx: index('idx_approval_tx').on(table.tx_hash),
  blockIdx: index('idx_approval_block').on(table.block_number)
}));

export const approvalForAll = pgTable('approval_for_all', {
  ...baseColumns,
  owner: varchar('owner', { length: 66 }),
 operator: varchar('operator', { length: 66 }),
 approved: varchar('approved', { length: 255 }),
}, (table) => ({
  contractIdx: index('idx_approval_for_all_contract').on(table.contract_address),
  txHashIdx: index('idx_approval_for_all_tx').on(table.tx_hash),
  blockIdx: index('idx_approval_for_all_block').on(table.block_number)
}));

export const approvalForSlot = pgTable('approval_for_slot', {
  ...baseColumns,
  owner: varchar('owner', { length: 66 }),
 slot: varchar('slot', { length: 78 }),
 operator: varchar('operator', { length: 66 }),
 approved: varchar('approved', { length: 255 }),
}, (table) => ({
  contractIdx: index('idx_approval_for_slot_contract').on(table.contract_address),
  txHashIdx: index('idx_approval_for_slot_tx').on(table.tx_hash),
  blockIdx: index('idx_approval_for_slot_block').on(table.block_number)
}));

export const transferValue = pgTable('transfer_value', {
  ...baseColumns,
  from_token_id: varchar('from_token_id', { length: 78 }),
 to_token_id: varchar('to_token_id', { length: 78 }),
 value: varchar('value', { length: 78 }),
}, (table) => ({
  contractIdx: index('idx_transfer_value_contract').on(table.contract_address),
  txHashIdx: index('idx_transfer_value_tx').on(table.tx_hash),
  blockIdx: index('idx_transfer_value_block').on(table.block_number)
}));

export const approvalValue = pgTable('approval_value', {
  ...baseColumns,
  token_id: varchar('token_id', { length: 78 }),
 operator: varchar('operator', { length: 66 }),
 value: varchar('value', { length: 78 }),
}, (table) => ({
  contractIdx: index('idx_approval_value_contract').on(table.contract_address),
  txHashIdx: index('idx_approval_value_tx').on(table.tx_hash),
  blockIdx: index('idx_approval_value_block').on(table.block_number)
}));

export const slotChanged = pgTable('slot_changed', {
  ...baseColumns,
  token_id: varchar('token_id', { length: 78 }),
 old_slot: varchar('old_slot', { length: 78 }),
 new_slot: varchar('new_slot', { length: 78 }),
}, (table) => ({
  contractIdx: index('idx_slot_changed_contract').on(table.contract_address),
  txHashIdx: index('idx_slot_changed_tx').on(table.tx_hash),
  blockIdx: index('idx_slot_changed_block').on(table.block_number)
}));

export const preSaleOpen = pgTable('pre_sale_open', {
  ...baseColumns,
  time: bigint('time', { mode: 'number' }),
}, (table) => ({
  contractIdx: index('idx_pre_sale_open_contract').on(table.contract_address),
  txHashIdx: index('idx_pre_sale_open_tx').on(table.tx_hash),
  blockIdx: index('idx_pre_sale_open_block').on(table.block_number)
}));

export const preSaleClose = pgTable('pre_sale_close', {
  ...baseColumns,
  time: bigint('time', { mode: 'number' }),
}, (table) => ({
  contractIdx: index('idx_pre_sale_close_contract').on(table.contract_address),
  txHashIdx: index('idx_pre_sale_close_tx').on(table.tx_hash),
  blockIdx: index('idx_pre_sale_close_block').on(table.block_number)
}));

export const publicSaleOpen = pgTable('public_sale_open', {
  ...baseColumns,
  time: bigint('time', { mode: 'number' }),
}, (table) => ({
  contractIdx: index('idx_public_sale_open_contract').on(table.contract_address),
  txHashIdx: index('idx_public_sale_open_tx').on(table.tx_hash),
  blockIdx: index('idx_public_sale_open_block').on(table.block_number)
}));

export const publicSaleClose = pgTable('public_sale_close', {
  ...baseColumns,
  time: bigint('time', { mode: 'number' }),
}, (table) => ({
  contractIdx: index('idx_public_sale_close_contract').on(table.contract_address),
  txHashIdx: index('idx_public_sale_close_tx').on(table.tx_hash),
  blockIdx: index('idx_public_sale_close_block').on(table.block_number)
}));

export const soldOut = pgTable('sold_out', {
  ...baseColumns,
  time: bigint('time', { mode: 'number' }),
}, (table) => ({
  contractIdx: index('idx_sold_out_contract').on(table.contract_address),
  txHashIdx: index('idx_sold_out_tx').on(table.tx_hash),
  blockIdx: index('idx_sold_out_block').on(table.block_number)
}));

export const airdrop = pgTable('airdrop', {
  ...baseColumns,
  to: varchar('to', { length: 66 }),
 value: varchar('value', { length: 78 }),
 time: bigint('time', { mode: 'number' }),
}, (table) => ({
  contractIdx: index('idx_airdrop_contract').on(table.contract_address),
  txHashIdx: index('idx_airdrop_tx').on(table.tx_hash),
  blockIdx: index('idx_airdrop_block').on(table.block_number)
}));

export const bookingHandled = pgTable('booking_handled', {
  ...baseColumns,
  address: varchar('address', { length: 66 }),
 id: bigint('id', { mode: 'number' }),
 value: varchar('value', { length: 78 }),
}, (table) => ({
  contractIdx: index('idx_booking_handled_contract').on(table.contract_address),
  txHashIdx: index('idx_booking_handled_tx').on(table.tx_hash),
  blockIdx: index('idx_booking_handled_block').on(table.block_number)
}));

export const bookingClaimed = pgTable('booking_claimed', {
  ...baseColumns,
  address: varchar('address', { length: 66 }),
 id: bigint('id', { mode: 'number' }),
 value: varchar('value', { length: 78 }),
}, (table) => ({
  contractIdx: index('idx_booking_claimed_contract').on(table.contract_address),
  txHashIdx: index('idx_booking_claimed_tx').on(table.tx_hash),
  blockIdx: index('idx_booking_claimed_block').on(table.block_number)
}));

export const bookingRefunded = pgTable('booking_refunded', {
  ...baseColumns,
  address: varchar('address', { length: 66 }),
 id: bigint('id', { mode: 'number' }),
 value: varchar('value', { length: 78 }),
}, (table) => ({
  contractIdx: index('idx_booking_refunded_contract').on(table.contract_address),
  txHashIdx: index('idx_booking_refunded_tx').on(table.tx_hash),
  blockIdx: index('idx_booking_refunded_block').on(table.block_number)
}));

export const cancel = pgTable('cancel', {
  ...baseColumns,
  time: bigint('time', { mode: 'number' }),
}, (table) => ({
  contractIdx: index('idx_cancel_contract').on(table.contract_address),
  txHashIdx: index('idx_cancel_tx').on(table.tx_hash),
  blockIdx: index('idx_cancel_block').on(table.block_number)
}));

export const buy = pgTable('buy', {
  ...baseColumns,
  address: varchar('address', { length: 66 }),
 value: varchar('value', { length: 78 }),
 time: bigint('time', { mode: 'number' }),
}, (table) => ({
  contractIdx: index('idx_buy_contract').on(table.contract_address),
  txHashIdx: index('idx_buy_tx').on(table.tx_hash),
  blockIdx: index('idx_buy_block').on(table.block_number)
}));

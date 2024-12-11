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

export const ownershipTransferred = pgTable('ownership_transferred', {
  ...baseColumns,
  previous_owner: varchar('previous_owner', { length: 66 }),
 new_owner: varchar('new_owner', { length: 66 }),
}, (table) => ({
  contractIdx: index('idx_ownership_transferred_contract').on(table.contract_address),
  txHashIdx: index('idx_ownership_transferred_tx').on(table.tx_hash),
  blockIdx: index('idx_ownership_transferred_block').on(table.block_number)
}));

export const ownershipTransferStarted = pgTable('ownership_transfer_started', {
  ...baseColumns,
  previous_owner: varchar('previous_owner', { length: 66 }),
 new_owner: varchar('new_owner', { length: 66 }),
}, (table) => ({
  contractIdx: index('idx_ownership_transfer_started_contract').on(table.contract_address),
  txHashIdx: index('idx_ownership_transfer_started_tx').on(table.tx_hash),
  blockIdx: index('idx_ownership_transfer_started_block').on(table.block_number)
}));

export const upgraded = pgTable('upgraded', {
  ...baseColumns,
  class_hash: varchar('class_hash', { length: 255 }),
}, (table) => ({
  contractIdx: index('idx_upgraded_contract').on(table.contract_address),
  txHashIdx: index('idx_upgraded_tx').on(table.tx_hash),
  blockIdx: index('idx_upgraded_block').on(table.block_number)
}));

export const publicSaleOpen = pgTable('public_sale_open', {
  ...baseColumns,
  old_value: varchar('old_value', { length: 255 }),
 new_value: varchar('new_value', { length: 255 }),
}, (table) => ({
  contractIdx: index('idx_public_sale_open_contract').on(table.contract_address),
  txHashIdx: index('idx_public_sale_open_tx').on(table.tx_hash),
  blockIdx: index('idx_public_sale_open_block').on(table.block_number)
}));

export const publicSaleClose = pgTable('public_sale_close', {
  ...baseColumns,
  old_value: varchar('old_value', { length: 255 }),
 new_value: varchar('new_value', { length: 255 }),
}, (table) => ({
  contractIdx: index('idx_public_sale_close_contract').on(table.contract_address),
  txHashIdx: index('idx_public_sale_close_tx').on(table.tx_hash),
  blockIdx: index('idx_public_sale_close_block').on(table.block_number)
}));

export const soldOut = pgTable('sold_out', {
  ...baseColumns,
  sold_out: varchar('sold_out', { length: 255 }),
}, (table) => ({
  contractIdx: index('idx_sold_out_contract').on(table.contract_address),
  txHashIdx: index('idx_sold_out_tx').on(table.tx_hash),
  blockIdx: index('idx_sold_out_block').on(table.block_number)
}));

export const buy = pgTable('buy', {
  ...baseColumns,
  address: varchar('address', { length: 66 }),
 cc_amount: varchar('cc_amount', { length: 78 }),
 vintages: varchar('vintages', { length: 255 }),
}, (table) => ({
  contractIdx: index('idx_buy_contract').on(table.contract_address),
  txHashIdx: index('idx_buy_tx').on(table.tx_hash),
  blockIdx: index('idx_buy_block').on(table.block_number)
}));

export const mintCanceled = pgTable('mint_canceled', {
  ...baseColumns,
  is_canceled: varchar('is_canceled', { length: 255 }),
}, (table) => ({
  contractIdx: index('idx_mint_canceled_contract').on(table.contract_address),
  txHashIdx: index('idx_mint_canceled_tx').on(table.tx_hash),
  blockIdx: index('idx_mint_canceled_block').on(table.block_number)
}));

export const unitPriceUpdated = pgTable('unit_price_updated', {
  ...baseColumns,
  old_price: varchar('old_price', { length: 78 }),
 new_price: varchar('new_price', { length: 78 }),
}, (table) => ({
  contractIdx: index('idx_unit_price_updated_contract').on(table.contract_address),
  txHashIdx: index('idx_unit_price_updated_tx').on(table.tx_hash),
  blockIdx: index('idx_unit_price_updated_block').on(table.block_number)
}));

export const withdraw = pgTable('withdraw', {
  ...baseColumns,
  recipient: varchar('recipient', { length: 66 }),
 amount: varchar('amount', { length: 78 }),
}, (table) => ({
  contractIdx: index('idx_withdraw_contract').on(table.contract_address),
  txHashIdx: index('idx_withdraw_tx').on(table.tx_hash),
  blockIdx: index('idx_withdraw_block').on(table.block_number)
}));

export const amountRetrieved = pgTable('amount_retrieved', {
  ...baseColumns,
  token_address: varchar('token_address', { length: 66 }),
 recipient: varchar('recipient', { length: 66 }),
 amount: varchar('amount', { length: 78 }),
}, (table) => ({
  contractIdx: index('idx_amount_retrieved_contract').on(table.contract_address),
  txHashIdx: index('idx_amount_retrieved_tx').on(table.tx_hash),
  blockIdx: index('idx_amount_retrieved_block').on(table.block_number)
}));

export const minMoneyAmountPerTxUpdated = pgTable('min_money_amount_per_tx_updated', {
  ...baseColumns,
  old_amount: varchar('old_amount', { length: 78 }),
 new_amount: varchar('new_amount', { length: 78 }),
}, (table) => ({
  contractIdx: index('idx_min_money_amount_per_tx_updated_contract').on(table.contract_address),
  txHashIdx: index('idx_min_money_amount_per_tx_updated_tx').on(table.tx_hash),
  blockIdx: index('idx_min_money_amount_per_tx_updated_block').on(table.block_number)
}));

export const remainingMintableCcupdated = pgTable('remaining_mintable_ccupdated', {
  ...baseColumns,
  old_value: varchar('old_value', { length: 78 }),
 new_value: varchar('new_value', { length: 78 }),
}, (table) => ({
  contractIdx: index('idx_remaining_mintable_ccupdated_contract').on(table.contract_address),
  txHashIdx: index('idx_remaining_mintable_ccupdated_tx').on(table.tx_hash),
  blockIdx: index('idx_remaining_mintable_ccupdated_block').on(table.block_number)
}));

export const maxMintableCcupdated = pgTable('max_mintable_ccupdated', {
  ...baseColumns,
  old_value: varchar('old_value', { length: 78 }),
 new_value: varchar('new_value', { length: 78 }),
}, (table) => ({
  contractIdx: index('idx_max_mintable_ccupdated_contract').on(table.contract_address),
  txHashIdx: index('idx_max_mintable_ccupdated_tx').on(table.tx_hash),
  blockIdx: index('idx_max_mintable_ccupdated_block').on(table.block_number)
}));

export const redeemInvestment = pgTable('redeem_investment', {
  ...baseColumns,
  address: varchar('address', { length: 66 }),
 amount: varchar('amount', { length: 78 }),
}, (table) => ({
  contractIdx: index('idx_redeem_investment_contract').on(table.contract_address),
  txHashIdx: index('idx_redeem_investment_tx').on(table.tx_hash),
  blockIdx: index('idx_redeem_investment_block').on(table.block_number)
}));

export const requestedRetirement = pgTable('requested_retirement', {
  ...baseColumns,
  from: varchar('from', { length: 66 }),
 project: varchar('project', { length: 66 }),
 token_id: varchar('token_id', { length: 78 }),
 allocation_id: varchar('allocation_id', { length: 78 }),
 old_amount: varchar('old_amount', { length: 78 }),
 new_amount: varchar('new_amount', { length: 78 }),
}, (table) => ({
  contractIdx: index('idx_requested_retirement_contract').on(table.contract_address),
  txHashIdx: index('idx_requested_retirement_tx').on(table.tx_hash),
  blockIdx: index('idx_requested_retirement_block').on(table.block_number)
}));

export const retired = pgTable('retired', {
  ...baseColumns,
  from: varchar('from', { length: 66 }),
 project: varchar('project', { length: 66 }),
 token_id: varchar('token_id', { length: 78 }),
 old_amount: varchar('old_amount', { length: 78 }),
 new_amount: varchar('new_amount', { length: 78 }),
}, (table) => ({
  contractIdx: index('idx_retired_contract').on(table.contract_address),
  txHashIdx: index('idx_retired_tx').on(table.tx_hash),
  blockIdx: index('idx_retired_block').on(table.block_number)
}));

export const pendingRetirementRemoved = pgTable('pending_retirement_removed', {
  ...baseColumns,
  from: varchar('from', { length: 66 }),
 token_id: varchar('token_id', { length: 78 }),
 old_amount: varchar('old_amount', { length: 78 }),
 new_amount: varchar('new_amount', { length: 78 }),
}, (table) => ({
  contractIdx: index('idx_pending_retirement_removed_contract').on(table.contract_address),
  txHashIdx: index('idx_pending_retirement_removed_tx').on(table.tx_hash),
  blockIdx: index('idx_pending_retirement_removed_block').on(table.block_number)
}));

export const allocationClaimed = pgTable('allocation_claimed', {
  ...baseColumns,
  claimee: varchar('claimee', { length: 66 }),
 amount: varchar('amount', { length: 255 }),
 timestamp: varchar('timestamp', { length: 255 }),
 id: varchar('id', { length: 255 }),
}, (table) => ({
  contractIdx: index('idx_allocation_claimed_contract').on(table.contract_address),
  txHashIdx: index('idx_allocation_claimed_tx').on(table.tx_hash),
  blockIdx: index('idx_allocation_claimed_block').on(table.block_number)
}));

export const roleGranted = pgTable('role_granted', {
  ...baseColumns,
  role: varchar('role', { length: 255 }),
 account: varchar('account', { length: 66 }),
 sender: varchar('sender', { length: 66 }),
}, (table) => ({
  contractIdx: index('idx_role_granted_contract').on(table.contract_address),
  txHashIdx: index('idx_role_granted_tx').on(table.tx_hash),
  blockIdx: index('idx_role_granted_block').on(table.block_number)
}));

export const roleRevoked = pgTable('role_revoked', {
  ...baseColumns,
  role: varchar('role', { length: 255 }),
 account: varchar('account', { length: 66 }),
 sender: varchar('sender', { length: 66 }),
}, (table) => ({
  contractIdx: index('idx_role_revoked_contract').on(table.contract_address),
  txHashIdx: index('idx_role_revoked_tx').on(table.tx_hash),
  blockIdx: index('idx_role_revoked_block').on(table.block_number)
}));

export const roleAdminChanged = pgTable('role_admin_changed', {
  ...baseColumns,
  role: varchar('role', { length: 255 }),
 previous_admin_role: varchar('previous_admin_role', { length: 255 }),
 new_admin_role: varchar('new_admin_role', { length: 255 }),
}, (table) => ({
  contractIdx: index('idx_role_admin_changed_contract').on(table.contract_address),
  txHashIdx: index('idx_role_admin_changed_tx').on(table.tx_hash),
  blockIdx: index('idx_role_admin_changed_block').on(table.block_number)
}));

export const transferSingle = pgTable('transfer_single', {
  ...baseColumns,
  operator: varchar('operator', { length: 66 }),
 from: varchar('from', { length: 66 }),
 to: varchar('to', { length: 66 }),
 id: varchar('id', { length: 78 }),
 value: varchar('value', { length: 78 }),
}, (table) => ({
  contractIdx: index('idx_transfer_single_contract').on(table.contract_address),
  txHashIdx: index('idx_transfer_single_tx').on(table.tx_hash),
  blockIdx: index('idx_transfer_single_block').on(table.block_number)
}));

export const transferBatch = pgTable('transfer_batch', {
  ...baseColumns,
  operator: varchar('operator', { length: 66 }),
 from: varchar('from', { length: 66 }),
 to: varchar('to', { length: 66 }),
 ids: varchar('ids', { length: 255 }),
 values: varchar('values', { length: 255 }),
}, (table) => ({
  contractIdx: index('idx_transfer_batch_contract').on(table.contract_address),
  txHashIdx: index('idx_transfer_batch_tx').on(table.tx_hash),
  blockIdx: index('idx_transfer_batch_block').on(table.block_number)
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

export const uri = pgTable('uri', {
  ...baseColumns,
  value: varchar('value', { length: 255 }),
 id: varchar('id', { length: 78 }),
}, (table) => ({
  contractIdx: index('idx_uri_contract').on(table.contract_address),
  txHashIdx: index('idx_uri_tx').on(table.tx_hash),
  blockIdx: index('idx_uri_block').on(table.block_number)
}));

export const projectCarbonUpdated = pgTable('project_carbon_updated', {
  ...baseColumns,
  old_carbon: varchar('old_carbon', { length: 78 }),
 new_carbon: varchar('new_carbon', { length: 78 }),
}, (table) => ({
  contractIdx: index('idx_project_carbon_updated_contract').on(table.contract_address),
  txHashIdx: index('idx_project_carbon_updated_tx').on(table.tx_hash),
  blockIdx: index('idx_project_carbon_updated_block').on(table.block_number)
}));

export const vintageUpdate = pgTable('vintage_update', {
  ...baseColumns,
  token_id: varchar('token_id', { length: 78 }),
 old_vintage: varchar('old_vintage', { length: 255 }),
 new_vintage: varchar('new_vintage', { length: 255 }),
}, (table) => ({
  contractIdx: index('idx_vintage_update_contract').on(table.contract_address),
  txHashIdx: index('idx_vintage_update_tx').on(table.tx_hash),
  blockIdx: index('idx_vintage_update_block').on(table.block_number)
}));

export const vintageRebased = pgTable('vintage_rebased', {
  ...baseColumns,
  token_id: varchar('token_id', { length: 78 }),
 old_supply: varchar('old_supply', { length: 78 }),
 new_supply: varchar('new_supply', { length: 78 }),
}, (table) => ({
  contractIdx: index('idx_vintage_rebased_contract').on(table.contract_address),
  txHashIdx: index('idx_vintage_rebased_tx').on(table.tx_hash),
  blockIdx: index('idx_vintage_rebased_block').on(table.block_number)
}));

export const vintageStatusUpdated = pgTable('vintage_status_updated', {
  ...baseColumns,
  token_id: varchar('token_id', { length: 78 }),
 old_status: varchar('old_status', { length: 255 }),
 new_status: varchar('new_status', { length: 255 }),
}, (table) => ({
  contractIdx: index('idx_vintage_status_updated_contract').on(table.contract_address),
  txHashIdx: index('idx_vintage_status_updated_tx').on(table.tx_hash),
  blockIdx: index('idx_vintage_status_updated_block').on(table.block_number)
}));

export const vintageSet = pgTable('vintage_set', {
  ...baseColumns,
  token_id: varchar('token_id', { length: 78 }),
 old_vintage: varchar('old_vintage', { length: 255 }),
 new_vintage: varchar('new_vintage', { length: 255 }),
}, (table) => ({
  contractIdx: index('idx_vintage_set_contract').on(table.contract_address),
  txHashIdx: index('idx_vintage_set_tx').on(table.tx_hash),
  blockIdx: index('idx_vintage_set_block').on(table.block_number)
}));

export const metadataUpdate = pgTable('metadata_update', {
  ...baseColumns,
  token_id: varchar('token_id', { length: 78 }),
}, (table) => ({
  contractIdx: index('idx_metadata_update_contract').on(table.contract_address),
  txHashIdx: index('idx_metadata_update_tx').on(table.tx_hash),
  blockIdx: index('idx_metadata_update_block').on(table.block_number)
}));

export const batchMetadataUpdate = pgTable('batch_metadata_update', {
  ...baseColumns,
  from_token_id: varchar('from_token_id', { length: 78 }),
 to_token_id: varchar('to_token_id', { length: 78 }),
}, (table) => ({
  contractIdx: index('idx_batch_metadata_update_contract').on(table.contract_address),
  txHashIdx: index('idx_batch_metadata_update_tx').on(table.tx_hash),
  blockIdx: index('idx_batch_metadata_update_block').on(table.block_number)
}));

export const metadataUpgraded = pgTable('metadata_upgraded', {
  ...baseColumns,
  old_class_hash: varchar('old_class_hash', { length: 255 }),
 class_hash: varchar('class_hash', { length: 255 }),
}, (table) => ({
  contractIdx: index('idx_metadata_upgraded_contract').on(table.contract_address),
  txHashIdx: index('idx_metadata_upgraded_tx').on(table.tx_hash),
  blockIdx: index('idx_metadata_upgraded_block').on(table.block_number)
}));

export const requestedResale = pgTable('requested_resale', {
  ...baseColumns,
  from: varchar('from', { length: 66 }),
 project: varchar('project', { length: 66 }),
 token_id: varchar('token_id', { length: 78 }),
 allocation_id: varchar('allocation_id', { length: 78 }),
 old_amount: varchar('old_amount', { length: 78 }),
 new_amount: varchar('new_amount', { length: 78 }),
}, (table) => ({
  contractIdx: index('idx_requested_resale_contract').on(table.contract_address),
  txHashIdx: index('idx_requested_resale_tx').on(table.tx_hash),
  blockIdx: index('idx_requested_resale_block').on(table.block_number)
}));

export const resale = pgTable('resale', {
  ...baseColumns,
  from: varchar('from', { length: 66 }),
 project: varchar('project', { length: 66 }),
 token_id: varchar('token_id', { length: 78 }),
 old_amount: varchar('old_amount', { length: 78 }),
 new_amount: varchar('new_amount', { length: 78 }),
}, (table) => ({
  contractIdx: index('idx_resale_contract').on(table.contract_address),
  txHashIdx: index('idx_resale_tx').on(table.tx_hash),
  blockIdx: index('idx_resale_block').on(table.block_number)
}));

export const pendingResaleRemoved = pgTable('pending_resale_removed', {
  ...baseColumns,
  from: varchar('from', { length: 66 }),
 token_id: varchar('token_id', { length: 78 }),
 old_amount: varchar('old_amount', { length: 78 }),
 new_amount: varchar('new_amount', { length: 78 }),
}, (table) => ({
  contractIdx: index('idx_pending_resale_removed_contract').on(table.contract_address),
  txHashIdx: index('idx_pending_resale_removed_tx').on(table.tx_hash),
  blockIdx: index('idx_pending_resale_removed_block').on(table.block_number)
}));

export const transfer = pgTable('transfer', {
  ...baseColumns,
  from: varchar('from', { length: 66 }),
 to: varchar('to', { length: 66 }),
 value: varchar('value', { length: 78 }),
}, (table) => ({
  contractIdx: index('idx_transfer_contract').on(table.contract_address),
  txHashIdx: index('idx_transfer_tx').on(table.tx_hash),
  blockIdx: index('idx_transfer_block').on(table.block_number)
}));

export const approval = pgTable('approval', {
  ...baseColumns,
  owner: varchar('owner', { length: 66 }),
 spender: varchar('spender', { length: 66 }),
 value: varchar('value', { length: 78 }),
}, (table) => ({
  contractIdx: index('idx_approval_contract').on(table.contract_address),
  txHashIdx: index('idx_approval_tx').on(table.tx_hash),
  blockIdx: index('idx_approval_block').on(table.block_number)
}));

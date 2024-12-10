CREATE TABLE "absorption_update" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"contract_address" varchar(66) NOT NULL,
	"tx_hash" varchar(66) NOT NULL,
	"block_number" bigint NOT NULL,
	"slot" varchar(78),
	"time" bigint
);
--> statement-breakpoint
CREATE TABLE "airdrop" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"contract_address" varchar(66) NOT NULL,
	"tx_hash" varchar(66) NOT NULL,
	"block_number" bigint NOT NULL,
	"to" varchar(66),
	"value" varchar(78),
	"time" bigint
);
--> statement-breakpoint
CREATE TABLE "approval" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"contract_address" varchar(66) NOT NULL,
	"tx_hash" varchar(66) NOT NULL,
	"block_number" bigint NOT NULL,
	"owner" varchar(66),
	"approved" varchar(66),
	"token_id" varchar(78)
);
--> statement-breakpoint
CREATE TABLE "approval_for_all" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"contract_address" varchar(66) NOT NULL,
	"tx_hash" varchar(66) NOT NULL,
	"block_number" bigint NOT NULL,
	"owner" varchar(66),
	"operator" varchar(66),
	"approved" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "approval_for_slot" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"contract_address" varchar(66) NOT NULL,
	"tx_hash" varchar(66) NOT NULL,
	"block_number" bigint NOT NULL,
	"owner" varchar(66),
	"slot" varchar(78),
	"operator" varchar(66),
	"approved" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "approval_value" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"contract_address" varchar(66) NOT NULL,
	"tx_hash" varchar(66) NOT NULL,
	"block_number" bigint NOT NULL,
	"token_id" varchar(78),
	"operator" varchar(66),
	"value" varchar(78)
);
--> statement-breakpoint
CREATE TABLE "booking_claimed" (
	"id" bigint,
	"created_at" timestamp DEFAULT now(),
	"contract_address" varchar(66) NOT NULL,
	"tx_hash" varchar(66) NOT NULL,
	"block_number" bigint NOT NULL,
	"address" varchar(66),
	"value" varchar(78)
);
--> statement-breakpoint
CREATE TABLE "booking_handled" (
	"id" bigint,
	"created_at" timestamp DEFAULT now(),
	"contract_address" varchar(66) NOT NULL,
	"tx_hash" varchar(66) NOT NULL,
	"block_number" bigint NOT NULL,
	"address" varchar(66),
	"value" varchar(78)
);
--> statement-breakpoint
CREATE TABLE "booking_refunded" (
	"id" bigint,
	"created_at" timestamp DEFAULT now(),
	"contract_address" varchar(66) NOT NULL,
	"tx_hash" varchar(66) NOT NULL,
	"block_number" bigint NOT NULL,
	"address" varchar(66),
	"value" varchar(78)
);
--> statement-breakpoint
CREATE TABLE "buy" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"contract_address" varchar(66) NOT NULL,
	"tx_hash" varchar(66) NOT NULL,
	"block_number" bigint NOT NULL,
	"address" varchar(66),
	"value" varchar(78),
	"time" bigint
);
--> statement-breakpoint
CREATE TABLE "cancel" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"contract_address" varchar(66) NOT NULL,
	"tx_hash" varchar(66) NOT NULL,
	"block_number" bigint NOT NULL,
	"time" bigint
);
--> statement-breakpoint
CREATE TABLE "claim" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"contract_address" varchar(66) NOT NULL,
	"tx_hash" varchar(66) NOT NULL,
	"block_number" bigint NOT NULL,
	"address" varchar(66),
	"amount" varchar(78),
	"time" bigint
);
--> statement-breakpoint
CREATE TABLE "deposit" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"contract_address" varchar(66) NOT NULL,
	"tx_hash" varchar(66) NOT NULL,
	"block_number" bigint NOT NULL,
	"address" varchar(66),
	"value" varchar(78),
	"time" bigint
);
--> statement-breakpoint
CREATE TABLE "ownership_transferred" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"contract_address" varchar(66) NOT NULL,
	"tx_hash" varchar(66) NOT NULL,
	"block_number" bigint NOT NULL,
	"previous_owner" varchar(66),
	"new_owner" varchar(66)
);
--> statement-breakpoint
CREATE TABLE "pre_sale_close" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"contract_address" varchar(66) NOT NULL,
	"tx_hash" varchar(66) NOT NULL,
	"block_number" bigint NOT NULL,
	"time" bigint
);
--> statement-breakpoint
CREATE TABLE "pre_sale_open" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"contract_address" varchar(66) NOT NULL,
	"tx_hash" varchar(66) NOT NULL,
	"block_number" bigint NOT NULL,
	"time" bigint
);
--> statement-breakpoint
CREATE TABLE "price_update" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"contract_address" varchar(66) NOT NULL,
	"tx_hash" varchar(66) NOT NULL,
	"block_number" bigint NOT NULL,
	"price" varchar(78),
	"time" bigint
);
--> statement-breakpoint
CREATE TABLE "project_value_update" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"contract_address" varchar(66) NOT NULL,
	"tx_hash" varchar(66) NOT NULL,
	"block_number" bigint NOT NULL,
	"slot" varchar(78),
	"value" varchar(78)
);
--> statement-breakpoint
CREATE TABLE "public_sale_close" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"contract_address" varchar(66) NOT NULL,
	"tx_hash" varchar(66) NOT NULL,
	"block_number" bigint NOT NULL,
	"time" bigint
);
--> statement-breakpoint
CREATE TABLE "public_sale_open" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"contract_address" varchar(66) NOT NULL,
	"tx_hash" varchar(66) NOT NULL,
	"block_number" bigint NOT NULL,
	"time" bigint
);
--> statement-breakpoint
CREATE TABLE "slot_changed" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"contract_address" varchar(66) NOT NULL,
	"tx_hash" varchar(66) NOT NULL,
	"block_number" bigint NOT NULL,
	"token_id" varchar(78),
	"old_slot" varchar(78),
	"new_slot" varchar(78)
);
--> statement-breakpoint
CREATE TABLE "sold_out" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"contract_address" varchar(66) NOT NULL,
	"tx_hash" varchar(66) NOT NULL,
	"block_number" bigint NOT NULL,
	"time" bigint
);
--> statement-breakpoint
CREATE TABLE "transfer" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"contract_address" varchar(66) NOT NULL,
	"tx_hash" varchar(66) NOT NULL,
	"block_number" bigint NOT NULL,
	"from" varchar(66),
	"to" varchar(66),
	"token_id" varchar(78)
);
--> statement-breakpoint
CREATE TABLE "transfer_value" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"contract_address" varchar(66) NOT NULL,
	"tx_hash" varchar(66) NOT NULL,
	"block_number" bigint NOT NULL,
	"from_token_id" varchar(78),
	"to_token_id" varchar(78),
	"value" varchar(78)
);
--> statement-breakpoint
CREATE TABLE "upgraded" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"contract_address" varchar(66) NOT NULL,
	"tx_hash" varchar(66) NOT NULL,
	"block_number" bigint NOT NULL,
	"class_hash" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "withdraw" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"contract_address" varchar(66) NOT NULL,
	"tx_hash" varchar(66) NOT NULL,
	"block_number" bigint NOT NULL,
	"address" varchar(66),
	"value" varchar(78),
	"time" bigint
);
--> statement-breakpoint
CREATE INDEX "idx_absorption_update_contract" ON "absorption_update" USING btree ("contract_address");--> statement-breakpoint
CREATE INDEX "idx_absorption_update_tx" ON "absorption_update" USING btree ("tx_hash");--> statement-breakpoint
CREATE INDEX "idx_absorption_update_block" ON "absorption_update" USING btree ("block_number");--> statement-breakpoint
CREATE INDEX "idx_airdrop_contract" ON "airdrop" USING btree ("contract_address");--> statement-breakpoint
CREATE INDEX "idx_airdrop_tx" ON "airdrop" USING btree ("tx_hash");--> statement-breakpoint
CREATE INDEX "idx_airdrop_block" ON "airdrop" USING btree ("block_number");--> statement-breakpoint
CREATE INDEX "idx_approval_contract" ON "approval" USING btree ("contract_address");--> statement-breakpoint
CREATE INDEX "idx_approval_tx" ON "approval" USING btree ("tx_hash");--> statement-breakpoint
CREATE INDEX "idx_approval_block" ON "approval" USING btree ("block_number");--> statement-breakpoint
CREATE INDEX "idx_approval_for_all_contract" ON "approval_for_all" USING btree ("contract_address");--> statement-breakpoint
CREATE INDEX "idx_approval_for_all_tx" ON "approval_for_all" USING btree ("tx_hash");--> statement-breakpoint
CREATE INDEX "idx_approval_for_all_block" ON "approval_for_all" USING btree ("block_number");--> statement-breakpoint
CREATE INDEX "idx_approval_for_slot_contract" ON "approval_for_slot" USING btree ("contract_address");--> statement-breakpoint
CREATE INDEX "idx_approval_for_slot_tx" ON "approval_for_slot" USING btree ("tx_hash");--> statement-breakpoint
CREATE INDEX "idx_approval_for_slot_block" ON "approval_for_slot" USING btree ("block_number");--> statement-breakpoint
CREATE INDEX "idx_approval_value_contract" ON "approval_value" USING btree ("contract_address");--> statement-breakpoint
CREATE INDEX "idx_approval_value_tx" ON "approval_value" USING btree ("tx_hash");--> statement-breakpoint
CREATE INDEX "idx_approval_value_block" ON "approval_value" USING btree ("block_number");--> statement-breakpoint
CREATE INDEX "idx_booking_claimed_contract" ON "booking_claimed" USING btree ("contract_address");--> statement-breakpoint
CREATE INDEX "idx_booking_claimed_tx" ON "booking_claimed" USING btree ("tx_hash");--> statement-breakpoint
CREATE INDEX "idx_booking_claimed_block" ON "booking_claimed" USING btree ("block_number");--> statement-breakpoint
CREATE INDEX "idx_booking_handled_contract" ON "booking_handled" USING btree ("contract_address");--> statement-breakpoint
CREATE INDEX "idx_booking_handled_tx" ON "booking_handled" USING btree ("tx_hash");--> statement-breakpoint
CREATE INDEX "idx_booking_handled_block" ON "booking_handled" USING btree ("block_number");--> statement-breakpoint
CREATE INDEX "idx_booking_refunded_contract" ON "booking_refunded" USING btree ("contract_address");--> statement-breakpoint
CREATE INDEX "idx_booking_refunded_tx" ON "booking_refunded" USING btree ("tx_hash");--> statement-breakpoint
CREATE INDEX "idx_booking_refunded_block" ON "booking_refunded" USING btree ("block_number");--> statement-breakpoint
CREATE INDEX "idx_buy_contract" ON "buy" USING btree ("contract_address");--> statement-breakpoint
CREATE INDEX "idx_buy_tx" ON "buy" USING btree ("tx_hash");--> statement-breakpoint
CREATE INDEX "idx_buy_block" ON "buy" USING btree ("block_number");--> statement-breakpoint
CREATE INDEX "idx_cancel_contract" ON "cancel" USING btree ("contract_address");--> statement-breakpoint
CREATE INDEX "idx_cancel_tx" ON "cancel" USING btree ("tx_hash");--> statement-breakpoint
CREATE INDEX "idx_cancel_block" ON "cancel" USING btree ("block_number");--> statement-breakpoint
CREATE INDEX "idx_claim_contract" ON "claim" USING btree ("contract_address");--> statement-breakpoint
CREATE INDEX "idx_claim_tx" ON "claim" USING btree ("tx_hash");--> statement-breakpoint
CREATE INDEX "idx_claim_block" ON "claim" USING btree ("block_number");--> statement-breakpoint
CREATE INDEX "idx_deposit_contract" ON "deposit" USING btree ("contract_address");--> statement-breakpoint
CREATE INDEX "idx_deposit_tx" ON "deposit" USING btree ("tx_hash");--> statement-breakpoint
CREATE INDEX "idx_deposit_block" ON "deposit" USING btree ("block_number");--> statement-breakpoint
CREATE INDEX "idx_ownership_transferred_contract" ON "ownership_transferred" USING btree ("contract_address");--> statement-breakpoint
CREATE INDEX "idx_ownership_transferred_tx" ON "ownership_transferred" USING btree ("tx_hash");--> statement-breakpoint
CREATE INDEX "idx_ownership_transferred_block" ON "ownership_transferred" USING btree ("block_number");--> statement-breakpoint
CREATE INDEX "idx_pre_sale_close_contract" ON "pre_sale_close" USING btree ("contract_address");--> statement-breakpoint
CREATE INDEX "idx_pre_sale_close_tx" ON "pre_sale_close" USING btree ("tx_hash");--> statement-breakpoint
CREATE INDEX "idx_pre_sale_close_block" ON "pre_sale_close" USING btree ("block_number");--> statement-breakpoint
CREATE INDEX "idx_pre_sale_open_contract" ON "pre_sale_open" USING btree ("contract_address");--> statement-breakpoint
CREATE INDEX "idx_pre_sale_open_tx" ON "pre_sale_open" USING btree ("tx_hash");--> statement-breakpoint
CREATE INDEX "idx_pre_sale_open_block" ON "pre_sale_open" USING btree ("block_number");--> statement-breakpoint
CREATE INDEX "idx_price_update_contract" ON "price_update" USING btree ("contract_address");--> statement-breakpoint
CREATE INDEX "idx_price_update_tx" ON "price_update" USING btree ("tx_hash");--> statement-breakpoint
CREATE INDEX "idx_price_update_block" ON "price_update" USING btree ("block_number");--> statement-breakpoint
CREATE INDEX "idx_project_value_update_contract" ON "project_value_update" USING btree ("contract_address");--> statement-breakpoint
CREATE INDEX "idx_project_value_update_tx" ON "project_value_update" USING btree ("tx_hash");--> statement-breakpoint
CREATE INDEX "idx_project_value_update_block" ON "project_value_update" USING btree ("block_number");--> statement-breakpoint
CREATE INDEX "idx_public_sale_close_contract" ON "public_sale_close" USING btree ("contract_address");--> statement-breakpoint
CREATE INDEX "idx_public_sale_close_tx" ON "public_sale_close" USING btree ("tx_hash");--> statement-breakpoint
CREATE INDEX "idx_public_sale_close_block" ON "public_sale_close" USING btree ("block_number");--> statement-breakpoint
CREATE INDEX "idx_public_sale_open_contract" ON "public_sale_open" USING btree ("contract_address");--> statement-breakpoint
CREATE INDEX "idx_public_sale_open_tx" ON "public_sale_open" USING btree ("tx_hash");--> statement-breakpoint
CREATE INDEX "idx_public_sale_open_block" ON "public_sale_open" USING btree ("block_number");--> statement-breakpoint
CREATE INDEX "idx_slot_changed_contract" ON "slot_changed" USING btree ("contract_address");--> statement-breakpoint
CREATE INDEX "idx_slot_changed_tx" ON "slot_changed" USING btree ("tx_hash");--> statement-breakpoint
CREATE INDEX "idx_slot_changed_block" ON "slot_changed" USING btree ("block_number");--> statement-breakpoint
CREATE INDEX "idx_sold_out_contract" ON "sold_out" USING btree ("contract_address");--> statement-breakpoint
CREATE INDEX "idx_sold_out_tx" ON "sold_out" USING btree ("tx_hash");--> statement-breakpoint
CREATE INDEX "idx_sold_out_block" ON "sold_out" USING btree ("block_number");--> statement-breakpoint
CREATE INDEX "idx_transfer_contract" ON "transfer" USING btree ("contract_address");--> statement-breakpoint
CREATE INDEX "idx_transfer_tx" ON "transfer" USING btree ("tx_hash");--> statement-breakpoint
CREATE INDEX "idx_transfer_block" ON "transfer" USING btree ("block_number");--> statement-breakpoint
CREATE INDEX "idx_transfer_value_contract" ON "transfer_value" USING btree ("contract_address");--> statement-breakpoint
CREATE INDEX "idx_transfer_value_tx" ON "transfer_value" USING btree ("tx_hash");--> statement-breakpoint
CREATE INDEX "idx_transfer_value_block" ON "transfer_value" USING btree ("block_number");--> statement-breakpoint
CREATE INDEX "idx_upgraded_contract" ON "upgraded" USING btree ("contract_address");--> statement-breakpoint
CREATE INDEX "idx_upgraded_tx" ON "upgraded" USING btree ("tx_hash");--> statement-breakpoint
CREATE INDEX "idx_upgraded_block" ON "upgraded" USING btree ("block_number");--> statement-breakpoint
CREATE INDEX "idx_withdraw_contract" ON "withdraw" USING btree ("contract_address");--> statement-breakpoint
CREATE INDEX "idx_withdraw_tx" ON "withdraw" USING btree ("tx_hash");--> statement-breakpoint
CREATE INDEX "idx_withdraw_block" ON "withdraw" USING btree ("block_number");
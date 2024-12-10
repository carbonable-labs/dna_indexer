CREATE TABLE "unknown_event" (
	"event_id" varchar(42) PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"contract_address" varchar(66) NOT NULL,
	"tx_hash" varchar(66) NOT NULL,
	"block_number" bigint NOT NULL,
	"selector" varchar(66),
	"data" varchar(66)[]
);
--> statement-breakpoint
ALTER TABLE "absorption_update" RENAME COLUMN "id" TO "event_id";--> statement-breakpoint
ALTER TABLE "airdrop" RENAME COLUMN "id" TO "event_id";--> statement-breakpoint
ALTER TABLE "approval" RENAME COLUMN "id" TO "event_id";--> statement-breakpoint
ALTER TABLE "approval_for_all" RENAME COLUMN "id" TO "event_id";--> statement-breakpoint
ALTER TABLE "approval_for_slot" RENAME COLUMN "id" TO "event_id";--> statement-breakpoint
ALTER TABLE "approval_value" RENAME COLUMN "id" TO "event_id";--> statement-breakpoint
ALTER TABLE "buy" RENAME COLUMN "id" TO "event_id";--> statement-breakpoint
ALTER TABLE "cancel" RENAME COLUMN "id" TO "event_id";--> statement-breakpoint
ALTER TABLE "claim" RENAME COLUMN "id" TO "event_id";--> statement-breakpoint
ALTER TABLE "deposit" RENAME COLUMN "id" TO "event_id";--> statement-breakpoint
ALTER TABLE "ownership_transferred" RENAME COLUMN "id" TO "event_id";--> statement-breakpoint
ALTER TABLE "pre_sale_close" RENAME COLUMN "id" TO "event_id";--> statement-breakpoint
ALTER TABLE "pre_sale_open" RENAME COLUMN "id" TO "event_id";--> statement-breakpoint
ALTER TABLE "price_update" RENAME COLUMN "id" TO "event_id";--> statement-breakpoint
ALTER TABLE "project_value_update" RENAME COLUMN "id" TO "event_id";--> statement-breakpoint
ALTER TABLE "public_sale_close" RENAME COLUMN "id" TO "event_id";--> statement-breakpoint
ALTER TABLE "public_sale_open" RENAME COLUMN "id" TO "event_id";--> statement-breakpoint
ALTER TABLE "slot_changed" RENAME COLUMN "id" TO "event_id";--> statement-breakpoint
ALTER TABLE "sold_out" RENAME COLUMN "id" TO "event_id";--> statement-breakpoint
ALTER TABLE "transfer" RENAME COLUMN "id" TO "event_id";--> statement-breakpoint
ALTER TABLE "transfer_value" RENAME COLUMN "id" TO "event_id";--> statement-breakpoint
ALTER TABLE "upgraded" RENAME COLUMN "id" TO "event_id";--> statement-breakpoint
ALTER TABLE "withdraw" RENAME COLUMN "id" TO "event_id";--> statement-breakpoint
ALTER TABLE "booking_claimed" ADD COLUMN "event_id" varchar(42) PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE "booking_handled" ADD COLUMN "event_id" varchar(42) PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE "booking_refunded" ADD COLUMN "event_id" varchar(42) PRIMARY KEY NOT NULL;--> statement-breakpoint
CREATE INDEX "idx_unknown_event_contract" ON "unknown_event" USING btree ("contract_address");--> statement-breakpoint
CREATE INDEX "idx_unknown_event_tx" ON "unknown_event" USING btree ("tx_hash");--> statement-breakpoint
CREATE INDEX "idx_unknown_event_block" ON "unknown_event" USING btree ("block_number");
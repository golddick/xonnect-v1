/*
  Warnings:

  - You are about to drop the column `revenue` on the `creator_videos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "creator_event_tickets" ADD COLUMN     "platform_fee" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "creator_events" ADD COLUMN     "platform_fee" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "creator_videos" DROP COLUMN "revenue",
ADD COLUMN     "platform_fee" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "revenue_share" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "status" SET DEFAULT 'published';

-- AlterTable
ALTER TABLE "creators" ADD COLUMN     "event_stream_payout_percents" INTEGER NOT NULL DEFAULT 70,
ADD COLUMN     "event_venue_payout_percents" INTEGER NOT NULL DEFAULT 70,
ADD COLUMN     "video_payout_percents" INTEGER NOT NULL DEFAULT 70;

-- AlterTable
ALTER TABLE "profiles" ADD COLUMN     "allow_messages" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "creator_name" TEXT,
ADD COLUMN     "first_name" TEXT,
ADD COLUMN     "last_name" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "profile_visibility" TEXT NOT NULL DEFAULT 'public',
ADD COLUMN     "show_email" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "show_location" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "show_online_status" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "website" TEXT;

-- CreateTable
CREATE TABLE "creator_payout_accounts" (
    "id" TEXT NOT NULL,
    "creator_id" TEXT NOT NULL,
    "bank_name" TEXT NOT NULL,
    "account_number" TEXT NOT NULL,
    "account_name" TEXT NOT NULL,
    "account_type" TEXT NOT NULL,
    "is_primary" BOOLEAN NOT NULL DEFAULT false,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "verified_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "creator_payout_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "creator_payout_requests" (
    "id" TEXT NOT NULL,
    "creator_id" TEXT NOT NULL,
    "payout_account_id" TEXT,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'NGN',
    "status" TEXT NOT NULL DEFAULT 'pending',
    "note" TEXT,
    "transaction_id" TEXT,
    "requested_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "creator_payout_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "creator_event_ticket_items" (
    "id" TEXT NOT NULL,
    "purchase_id" TEXT NOT NULL,
    "ticket_id" TEXT NOT NULL,
    "ticket_code" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "checked_in_at" TIMESTAMP(3),
    "checked_in_by_user_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "creator_event_ticket_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "creator_payout_accounts_creator_id_idx" ON "creator_payout_accounts"("creator_id");

-- CreateIndex
CREATE INDEX "creator_payout_accounts_bank_name_idx" ON "creator_payout_accounts"("bank_name");

-- CreateIndex
CREATE INDEX "creator_payout_requests_creator_id_idx" ON "creator_payout_requests"("creator_id");

-- CreateIndex
CREATE INDEX "creator_payout_requests_status_idx" ON "creator_payout_requests"("status");

-- CreateIndex
CREATE UNIQUE INDEX "creator_event_ticket_items_ticket_code_key" ON "creator_event_ticket_items"("ticket_code");

-- CreateIndex
CREATE INDEX "creator_event_ticket_items_purchase_id_idx" ON "creator_event_ticket_items"("purchase_id");

-- CreateIndex
CREATE INDEX "creator_event_ticket_items_ticket_id_idx" ON "creator_event_ticket_items"("ticket_id");

-- AddForeignKey
ALTER TABLE "creator_payout_accounts" ADD CONSTRAINT "creator_payout_accounts_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "creators"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "creator_payout_requests" ADD CONSTRAINT "creator_payout_requests_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "creators"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "creator_payout_requests" ADD CONSTRAINT "creator_payout_requests_payout_account_id_fkey" FOREIGN KEY ("payout_account_id") REFERENCES "creator_payout_accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "creator_event_ticket_items" ADD CONSTRAINT "creator_event_ticket_items_purchase_id_fkey" FOREIGN KEY ("purchase_id") REFERENCES "creator_event_ticket_purchases"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "creator_event_ticket_items" ADD CONSTRAINT "creator_event_ticket_items_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "creator_event_tickets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "creator_event_ticket_items" ADD CONSTRAINT "creator_event_ticket_items_checked_in_by_user_id_fkey" FOREIGN KEY ("checked_in_by_user_id") REFERENCES "creator_event_check_in_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

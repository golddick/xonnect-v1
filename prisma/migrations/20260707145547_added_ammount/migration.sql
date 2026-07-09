/*
  Warnings:

  - You are about to drop the column `amount` on the `creator_event_ticket_purchases` table. All the data in the column will be lost.
  - You are about to drop the column `revenue` on the `creator_event_tickets` table. All the data in the column will be lost.
  - You are about to drop the column `revenue` on the `creator_events` table. All the data in the column will be lost.
  - You are about to drop the column `amount` on the `creator_video_purchases` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "creator_event_ticket_purchases" DROP COLUMN "amount",
ADD COLUMN     "amount_paid" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "platform_fee" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "revenue_made" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "creator_event_tickets" DROP COLUMN "revenue",
ADD COLUMN     "amount_paid" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "revenue_made" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "creator_events" DROP COLUMN "revenue",
ADD COLUMN     "amount_paid" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "revenue_made" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "creator_video_purchases" DROP COLUMN "amount",
ADD COLUMN     "amount_paid" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "platform_fee" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "revenue_made" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "creator_videos" ADD COLUMN     "amount_paid" INTEGER NOT NULL DEFAULT 0;

/*
  Warnings:

  - You are about to drop the column `recording_file_id` on the `creator_events` table. All the data in the column will be lost.
  - You are about to drop the column `recording_url` on the `creator_events` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "creator_events" DROP COLUMN "recording_file_id",
DROP COLUMN "recording_url";

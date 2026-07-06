/*
  Warnings:

  - A unique constraint covering the columns `[creator_video_id,liker_profile_id]` on the table `creator_video_likes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updated_at` to the `creator_video_likes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "creator_video_likes" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'active',
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "creators" ADD COLUMN     "followers_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "following_count" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "creator_follows" (
    "id" TEXT NOT NULL,
    "creator_id" TEXT NOT NULL,
    "follower_profile_id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "creator_follows_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "creator_event_likes" (
    "id" TEXT NOT NULL,
    "creator_event_id" TEXT NOT NULL,
    "liker_profile_id" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "creator_event_likes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "creator_follows_creator_id_idx" ON "creator_follows"("creator_id");

-- CreateIndex
CREATE INDEX "creator_follows_follower_profile_id_idx" ON "creator_follows"("follower_profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "creator_follows_follower_profile_id_creator_id_key" ON "creator_follows"("follower_profile_id", "creator_id");

-- CreateIndex
CREATE INDEX "creator_event_likes_creator_event_id_idx" ON "creator_event_likes"("creator_event_id");

-- CreateIndex
CREATE INDEX "creator_event_likes_liker_profile_id_idx" ON "creator_event_likes"("liker_profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "creator_event_likes_creator_event_id_liker_profile_id_key" ON "creator_event_likes"("creator_event_id", "liker_profile_id");

-- CreateIndex
CREATE INDEX "creator_video_likes_liker_profile_id_idx" ON "creator_video_likes"("liker_profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "creator_video_likes_creator_video_id_liker_profile_id_key" ON "creator_video_likes"("creator_video_id", "liker_profile_id");

-- AddForeignKey
ALTER TABLE "creator_follows" ADD CONSTRAINT "creator_follows_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "creators"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "creator_follows" ADD CONSTRAINT "creator_follows_follower_profile_id_fkey" FOREIGN KEY ("follower_profile_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "creator_video_likes" ADD CONSTRAINT "creator_video_likes_liker_profile_id_fkey" FOREIGN KEY ("liker_profile_id") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "creator_event_likes" ADD CONSTRAINT "creator_event_likes_creator_event_id_fkey" FOREIGN KEY ("creator_event_id") REFERENCES "creator_events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "creator_event_likes" ADD CONSTRAINT "creator_event_likes_liker_profile_id_fkey" FOREIGN KEY ("liker_profile_id") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

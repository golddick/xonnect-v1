/*
  Warnings:

  - Added the required column `folder_id` to the `creator_videos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "creator_videos" ADD COLUMN     "folder_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "creator_video_folders" (
    "id" TEXT NOT NULL,
    "creator_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "folder_type" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "thumbnail_url" TEXT,
    "thumbnail_file_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "creator_video_folders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "creator_video_views" (
    "id" TEXT NOT NULL,
    "creator_video_id" TEXT NOT NULL,
    "viewer_profile_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "creator_video_views_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "creator_video_likes" (
    "id" TEXT NOT NULL,
    "creator_video_id" TEXT NOT NULL,
    "liker_profile_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "creator_video_likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "creator_video_comments" (
    "id" TEXT NOT NULL,
    "creator_video_id" TEXT NOT NULL,
    "commenter_profile_id" TEXT,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "creator_video_comments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "creator_video_folders_creator_id_idx" ON "creator_video_folders"("creator_id");

-- CreateIndex
CREATE INDEX "creator_video_views_creator_video_id_idx" ON "creator_video_views"("creator_video_id");

-- CreateIndex
CREATE INDEX "creator_video_likes_creator_video_id_idx" ON "creator_video_likes"("creator_video_id");

-- CreateIndex
CREATE INDEX "creator_video_comments_creator_video_id_idx" ON "creator_video_comments"("creator_video_id");

-- CreateIndex
CREATE INDEX "creator_videos_folder_id_idx" ON "creator_videos"("folder_id");

-- AddForeignKey
ALTER TABLE "creator_video_folders" ADD CONSTRAINT "creator_video_folders_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "creators"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "creator_videos" ADD CONSTRAINT "creator_videos_folder_id_fkey" FOREIGN KEY ("folder_id") REFERENCES "creator_video_folders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "creator_video_views" ADD CONSTRAINT "creator_video_views_creator_video_id_fkey" FOREIGN KEY ("creator_video_id") REFERENCES "creator_videos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "creator_video_likes" ADD CONSTRAINT "creator_video_likes_creator_video_id_fkey" FOREIGN KEY ("creator_video_id") REFERENCES "creator_videos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "creator_video_comments" ADD CONSTRAINT "creator_video_comments_creator_video_id_fkey" FOREIGN KEY ("creator_video_id") REFERENCES "creator_videos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

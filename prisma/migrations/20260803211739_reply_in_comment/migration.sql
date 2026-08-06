-- DropIndex
DROP INDEX "creator_video_comments_creator_video_id_idx";

-- AlterTable
ALTER TABLE "creator_video_comments" ADD COLUMN     "parent_comment_id" TEXT;

-- CreateIndex
CREATE INDEX "creator_video_comments_creator_video_id_parent_comment_id_idx" ON "creator_video_comments"("creator_video_id", "parent_comment_id");

-- AddForeignKey
ALTER TABLE "creator_video_comments" ADD CONSTRAINT "creator_video_comments_commenter_profile_id_fkey" FOREIGN KEY ("commenter_profile_id") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "creator_video_comments" ADD CONSTRAINT "creator_video_comments_parent_comment_id_fkey" FOREIGN KEY ("parent_comment_id") REFERENCES "creator_video_comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

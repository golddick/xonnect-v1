-- AlterTable
ALTER TABLE "creator_videos" ADD COLUMN     "age_restriction" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "allow_comments" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "purchase_price" INTEGER,
ADD COLUMN     "rent24_price" INTEGER,
ADD COLUMN     "rent48_price" INTEGER;

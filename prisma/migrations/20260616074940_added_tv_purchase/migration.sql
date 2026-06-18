-- CreateTable
CREATE TABLE "creator_video_purchases" (
    "id" TEXT NOT NULL,
    "creator_id" TEXT NOT NULL,
    "creator_video_id" TEXT NOT NULL,
    "buyer_profile_id" TEXT,
    "buyer_name" TEXT,
    "buyer_email" TEXT,
    "buyer_phone" TEXT,
    "purchase_type" TEXT NOT NULL,
    "access_code" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'NGN',
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "transaction_id" TEXT NOT NULL,
    "access_expires_at" TIMESTAMP(3),
    "purchased_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMP(3),

    CONSTRAINT "creator_video_purchases_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "creator_video_purchases_access_code_key" ON "creator_video_purchases"("access_code");

-- CreateIndex
CREATE UNIQUE INDEX "creator_video_purchases_transaction_id_key" ON "creator_video_purchases"("transaction_id");

-- CreateIndex
CREATE INDEX "creator_video_purchases_creator_id_idx" ON "creator_video_purchases"("creator_id");

-- CreateIndex
CREATE INDEX "creator_video_purchases_creator_video_id_idx" ON "creator_video_purchases"("creator_video_id");

-- CreateIndex
CREATE INDEX "creator_video_purchases_buyer_profile_id_idx" ON "creator_video_purchases"("buyer_profile_id");

-- CreateIndex
CREATE INDEX "creator_video_purchases_buyer_email_idx" ON "creator_video_purchases"("buyer_email");

-- CreateIndex
CREATE INDEX "creator_video_purchases_status_idx" ON "creator_video_purchases"("status");

-- AddForeignKey
ALTER TABLE "creator_video_purchases" ADD CONSTRAINT "creator_video_purchases_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "creators"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "creator_video_purchases" ADD CONSTRAINT "creator_video_purchases_creator_video_id_fkey" FOREIGN KEY ("creator_video_id") REFERENCES "creator_videos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "creator_video_purchases" ADD CONSTRAINT "creator_video_purchases_buyer_profile_id_fkey" FOREIGN KEY ("buyer_profile_id") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

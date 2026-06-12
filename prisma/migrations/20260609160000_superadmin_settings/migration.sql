-- CreateEnum
CREATE TYPE "SuperAdminSettingSection" AS ENUM ('revenue', 'company_info');

-- CreateTable
CREATE TABLE "superadmin_settings" (
    "id" TEXT NOT NULL,
    "section" "SuperAdminSettingSection" NOT NULL,
    "platform_fee_percentage" INTEGER,
    "enterprise_fee_percentage" INTEGER,
    "minimum_payout_amount" INTEGER,
    "payout_processing_days" INTEGER,
    "company_name" TEXT,
    "company_email" TEXT,
    "support_email" TEXT,
    "company_phone" TEXT,
    "company_address" TEXT,
    "company_website" TEXT,
    "created_by" TEXT,
    "updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "superadmin_settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "superadmin_settings_section_key" ON "superadmin_settings"("section");

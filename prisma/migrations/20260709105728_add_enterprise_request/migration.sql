-- CreateTable
CREATE TABLE "enterprise_requests" (
    "id" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "contact_person" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "website" TEXT,
    "company_size" TEXT,
    "industry" TEXT,
    "address" TEXT,
    "description" TEXT,
    "requirements" TEXT,
    "estimated_users" INTEGER,
    "budget" TEXT,
    "timeline" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "enterprise_requests_pkey" PRIMARY KEY ("id")
);

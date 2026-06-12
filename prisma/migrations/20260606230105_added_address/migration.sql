-- AlterTable
ALTER TABLE "profiles" ADD COLUMN     "address_country" TEXT,
ADD COLUMN     "address_full" TEXT,
ADD COLUMN     "address_lat" DOUBLE PRECISION,
ADD COLUMN     "address_lon" DOUBLE PRECISION,
ADD COLUMN     "address_name" TEXT,
ADD COLUMN     "address_state" TEXT,
ADD COLUMN     "address_type" TEXT;

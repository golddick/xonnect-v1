-- CreateEnum
CREATE TYPE "CreatorEventStatus" AS ENUM ('draft', 'scheduled', 'live', 'ended', 'cancelled');

-- CreateEnum
CREATE TYPE "CreatorEventLocationType" AS ENUM ('country', 'state', 'city', 'address');

-- CreateEnum
CREATE TYPE "CreatorEventLocationRestrictionMode" AS ENUM ('block', 'allow');

-- CreateEnum
CREATE TYPE "CreatorEventTicketAccessType" AS ENUM ('stream', 'venue');

-- CreateEnum
CREATE TYPE "CreatorEventTicketStatus" AS ENUM ('active', 'paused', 'sold_out', 'archived');

-- CreateEnum
CREATE TYPE "CreatorEventTicketPurchaseStatus" AS ENUM ('pending', 'completed', 'cancelled', 'refunded', 'failed');

-- CreateEnum
CREATE TYPE "CreatorEventCheckInUserStatus" AS ENUM ('active', 'inactive');

-- CreateEnum
CREATE TYPE "CreatorEventCheckInScanStatus" AS ENUM ('success', 'duplicate', 'invalid', 'rejected');

-- CreateEnum
CREATE TYPE "CreatorEventRecordingStatus" AS ENUM ('disabled', 'pending', 'recording', 'processing', 'ready', 'failed');

-- CreateTable
CREATE TABLE "creator_events" (
    "id" TEXT NOT NULL,
    "creator_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT NOT NULL DEFAULT 'music',
    "status" "CreatorEventStatus" NOT NULL DEFAULT 'scheduled',
    "is_private" BOOLEAN NOT NULL DEFAULT false,
    "is_paid" BOOLEAN NOT NULL DEFAULT false,
    "require_ticket" BOOLEAN NOT NULL DEFAULT false,
    "enable_donations" BOOLEAN NOT NULL DEFAULT false,
    "enable_location_restriction" BOOLEAN NOT NULL DEFAULT false,
    "location_restriction_type" "CreatorEventLocationRestrictionMode" NOT NULL DEFAULT 'block',
    "address" TEXT,
    "location_name" TEXT,
    "location_country" TEXT,
    "location_state" TEXT,
    "location_type" "CreatorEventLocationType",
    "location_lat" DOUBLE PRECISION,
    "location_lon" DOUBLE PRECISION,
    "location_full_address" TEXT,
    "thumbnail_url" TEXT,
    "thumbnail_file_id" TEXT,
    "thumbnail_video_url" TEXT,
    "thumbnail_video_file_id" TEXT,
    "recorded_video_url" TEXT,
    "recorded_video_file_id" TEXT,
    "stream_key" TEXT,
    "rtmp_url" TEXT,
    "ingress_id" TEXT,
    "livekit_room_name" TEXT,
    "recording_enabled" BOOLEAN NOT NULL DEFAULT false,
    "recording_status" "CreatorEventRecordingStatus" NOT NULL DEFAULT 'disabled',
    "recording_asset_id" TEXT,
    "recording_url" TEXT,
    "recording_file_id" TEXT,
    "recording_started_at" TIMESTAMP(3),
    "recording_ended_at" TIMESTAMP(3),
    "has_recorded_video" BOOLEAN NOT NULL DEFAULT false,
    "timezone" TEXT NOT NULL DEFAULT 'Africa/Lagos',
    "scheduled_at" TIMESTAMP(3),
    "started_at" TIMESTAMP(3),
    "ended_at" TIMESTAMP(3),
    "duration_minutes" INTEGER NOT NULL DEFAULT 60,
    "max_viewers" INTEGER,
    "estimated_users" INTEGER,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "views_count" INTEGER NOT NULL DEFAULT 0,
    "likes_count" INTEGER NOT NULL DEFAULT 0,
    "comments_count" INTEGER NOT NULL DEFAULT 0,
    "peak_viewers_count" INTEGER NOT NULL DEFAULT 0,
    "current_viewers_count" INTEGER NOT NULL DEFAULT 0,
    "venue_participant_count" INTEGER NOT NULL DEFAULT 0,
    "revenue" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "creator_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "creator_event_location_restrictions" (
    "id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "state" TEXT,
    "lat" DOUBLE PRECISION,
    "lon" DOUBLE PRECISION,
    "location_type" "CreatorEventLocationType" NOT NULL,
    "full_address" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "creator_event_location_restrictions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "creator_event_tickets" (
    "id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "ticket_type" TEXT NOT NULL,
    "access" "CreatorEventTicketAccessType" NOT NULL DEFAULT 'stream',
    "price" INTEGER NOT NULL DEFAULT 0,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "sold_count" INTEGER NOT NULL DEFAULT 0,
    "revenue" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT,
    "benefits" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "status" "CreatorEventTicketStatus" NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "creator_event_tickets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "creator_event_ticket_purchases" (
    "id" TEXT NOT NULL,
    "ticket_id" TEXT NOT NULL,
    "buyer_name" TEXT NOT NULL,
    "buyer_email" TEXT NOT NULL,
    "buyer_phone" TEXT,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'NGN',
    "status" "CreatorEventTicketPurchaseStatus" NOT NULL DEFAULT 'completed',
    "transaction_id" TEXT NOT NULL,
    "ticket_code" TEXT NOT NULL,
    "purchased_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "refunded_at" TIMESTAMP(3),
    "checked_in_at" TIMESTAMP(3),
    "checked_in_by_user_id" TEXT,

    CONSTRAINT "creator_event_ticket_purchases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "creator_event_check_in_users" (
    "id" TEXT NOT NULL,
    "creator_id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "temp_password_hash" TEXT,
    "gate_name" TEXT NOT NULL,
    "status" "CreatorEventCheckInUserStatus" NOT NULL DEFAULT 'active',
    "must_change_password" BOOLEAN NOT NULL DEFAULT true,
    "scans_today" INTEGER NOT NULL DEFAULT 0,
    "total_scans" INTEGER NOT NULL DEFAULT 0,
    "last_login_at" TIMESTAMP(3),
    "last_scan_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "creator_event_check_in_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "creator_event_check_in_scans" (
    "id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "check_in_user_id" TEXT,
    "ticket_purchase_id" TEXT,
    "attendee_name" TEXT,
    "attendee_email" TEXT,
    "gate_name" TEXT,
    "scanned_code" TEXT,
    "status" "CreatorEventCheckInScanStatus" NOT NULL DEFAULT 'success',
    "notes" TEXT,
    "scanned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "creator_event_check_in_scans_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "creator_events_stream_key_key" ON "creator_events"("stream_key");

-- CreateIndex
CREATE UNIQUE INDEX "creator_events_ingress_id_key" ON "creator_events"("ingress_id");

-- CreateIndex
CREATE UNIQUE INDEX "creator_events_livekit_room_name_key" ON "creator_events"("livekit_room_name");

-- CreateIndex
CREATE UNIQUE INDEX "creator_events_recording_asset_id_key" ON "creator_events"("recording_asset_id");

-- CreateIndex
CREATE INDEX "creator_events_creator_id_idx" ON "creator_events"("creator_id");

-- CreateIndex
CREATE INDEX "creator_events_status_idx" ON "creator_events"("status");

-- CreateIndex
CREATE INDEX "creator_events_scheduled_at_idx" ON "creator_events"("scheduled_at");

-- CreateIndex
CREATE INDEX "creator_event_location_restrictions_event_id_idx" ON "creator_event_location_restrictions"("event_id");

-- CreateIndex
CREATE INDEX "creator_event_tickets_event_id_idx" ON "creator_event_tickets"("event_id");

-- CreateIndex
CREATE INDEX "creator_event_tickets_status_idx" ON "creator_event_tickets"("status");

-- CreateIndex
CREATE UNIQUE INDEX "creator_event_tickets_event_id_ticket_type_key" ON "creator_event_tickets"("event_id", "ticket_type");

-- CreateIndex
CREATE UNIQUE INDEX "creator_event_ticket_purchases_transaction_id_key" ON "creator_event_ticket_purchases"("transaction_id");

-- CreateIndex
CREATE UNIQUE INDEX "creator_event_ticket_purchases_ticket_code_key" ON "creator_event_ticket_purchases"("ticket_code");

-- CreateIndex
CREATE INDEX "creator_event_ticket_purchases_ticket_id_idx" ON "creator_event_ticket_purchases"("ticket_id");

-- CreateIndex
CREATE INDEX "creator_event_ticket_purchases_buyer_email_idx" ON "creator_event_ticket_purchases"("buyer_email");

-- CreateIndex
CREATE INDEX "creator_event_ticket_purchases_status_idx" ON "creator_event_ticket_purchases"("status");

-- CreateIndex
CREATE UNIQUE INDEX "creator_event_check_in_users_email_key" ON "creator_event_check_in_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "creator_event_check_in_users_username_key" ON "creator_event_check_in_users"("username");

-- CreateIndex
CREATE INDEX "creator_event_check_in_users_creator_id_idx" ON "creator_event_check_in_users"("creator_id");

-- CreateIndex
CREATE INDEX "creator_event_check_in_users_event_id_idx" ON "creator_event_check_in_users"("event_id");

-- CreateIndex
CREATE INDEX "creator_event_check_in_users_status_idx" ON "creator_event_check_in_users"("status");

-- CreateIndex
CREATE UNIQUE INDEX "creator_event_check_in_scans_scanned_code_key" ON "creator_event_check_in_scans"("scanned_code");

-- CreateIndex
CREATE INDEX "creator_event_check_in_scans_event_id_idx" ON "creator_event_check_in_scans"("event_id");

-- CreateIndex
CREATE INDEX "creator_event_check_in_scans_check_in_user_id_idx" ON "creator_event_check_in_scans"("check_in_user_id");

-- CreateIndex
CREATE INDEX "creator_event_check_in_scans_ticket_purchase_id_idx" ON "creator_event_check_in_scans"("ticket_purchase_id");

-- CreateIndex
CREATE INDEX "creator_event_check_in_scans_status_idx" ON "creator_event_check_in_scans"("status");

-- AddForeignKey
ALTER TABLE "creator_events" ADD CONSTRAINT "creator_events_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "creators"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "creator_event_location_restrictions" ADD CONSTRAINT "creator_event_location_restrictions_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "creator_events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "creator_event_tickets" ADD CONSTRAINT "creator_event_tickets_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "creator_events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "creator_event_ticket_purchases" ADD CONSTRAINT "creator_event_ticket_purchases_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "creator_event_tickets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "creator_event_ticket_purchases" ADD CONSTRAINT "creator_event_ticket_purchases_checked_in_by_user_id_fkey" FOREIGN KEY ("checked_in_by_user_id") REFERENCES "creator_event_check_in_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "creator_event_check_in_users" ADD CONSTRAINT "creator_event_check_in_users_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "creators"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "creator_event_check_in_users" ADD CONSTRAINT "creator_event_check_in_users_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "creator_events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "creator_event_check_in_scans" ADD CONSTRAINT "creator_event_check_in_scans_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "creator_events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "creator_event_check_in_scans" ADD CONSTRAINT "creator_event_check_in_scans_check_in_user_id_fkey" FOREIGN KEY ("check_in_user_id") REFERENCES "creator_event_check_in_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "creator_event_check_in_scans" ADD CONSTRAINT "creator_event_check_in_scans_ticket_purchase_id_fkey" FOREIGN KEY ("ticket_purchase_id") REFERENCES "creator_event_ticket_purchases"("id") ON DELETE SET NULL ON UPDATE CASCADE;

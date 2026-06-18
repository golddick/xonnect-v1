-- AlterTable
ALTER TABLE "creator_event_ticket_purchases" ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE "creator_event_check_in_camera_sessions" (
    "id" TEXT NOT NULL,
    "token_hash" TEXT NOT NULL,
    "token_prefix" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "operator_user_id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "expires_at" TIMESTAMP(3) NOT NULL,
    "opened_at" TIMESTAMP(3),
    "connected_at" TIMESTAMP(3),
    "completed_at" TIMESTAMP(3),
    "revoked_at" TIMESTAMP(3),
    "last_seen_at" TIMESTAMP(3),
    "client_label" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "creator_event_check_in_camera_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "creator_event_check_in_camera_signals" (
    "id" TEXT NOT NULL,
    "session_id" TEXT NOT NULL,
    "sender" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "payload" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "creator_event_check_in_camera_signals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "creator_event_check_in_camera_audits" (
    "id" TEXT NOT NULL,
    "session_id" TEXT,
    "actor" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "message" TEXT,
    "metadata" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "creator_event_check_in_camera_audits_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "creator_event_check_in_camera_sessions_token_hash_key" ON "creator_event_check_in_camera_sessions"("token_hash");

-- CreateIndex
CREATE INDEX "creator_event_check_in_camera_sessions_event_id_idx" ON "creator_event_check_in_camera_sessions"("event_id");

-- CreateIndex
CREATE INDEX "creator_event_check_in_camera_sessions_operator_user_id_idx" ON "creator_event_check_in_camera_sessions"("operator_user_id");

-- CreateIndex
CREATE INDEX "creator_event_check_in_camera_sessions_status_idx" ON "creator_event_check_in_camera_sessions"("status");

-- CreateIndex
CREATE INDEX "creator_event_check_in_camera_sessions_expires_at_idx" ON "creator_event_check_in_camera_sessions"("expires_at");

-- CreateIndex
CREATE INDEX "creator_event_check_in_camera_signals_session_id_idx" ON "creator_event_check_in_camera_signals"("session_id");

-- CreateIndex
CREATE INDEX "creator_event_check_in_camera_signals_created_at_idx" ON "creator_event_check_in_camera_signals"("created_at");

-- CreateIndex
CREATE INDEX "creator_event_check_in_camera_audits_session_id_idx" ON "creator_event_check_in_camera_audits"("session_id");

-- CreateIndex
CREATE INDEX "creator_event_check_in_camera_audits_actor_idx" ON "creator_event_check_in_camera_audits"("actor");

-- CreateIndex
CREATE INDEX "creator_event_check_in_camera_audits_action_idx" ON "creator_event_check_in_camera_audits"("action");

-- AddForeignKey
ALTER TABLE "creator_event_check_in_camera_sessions" ADD CONSTRAINT "creator_event_check_in_camera_sessions_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "creator_events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "creator_event_check_in_camera_sessions" ADD CONSTRAINT "creator_event_check_in_camera_sessions_operator_user_id_fkey" FOREIGN KEY ("operator_user_id") REFERENCES "creator_event_check_in_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "creator_event_check_in_camera_signals" ADD CONSTRAINT "creator_event_check_in_camera_signals_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "creator_event_check_in_camera_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "creator_event_check_in_camera_audits" ADD CONSTRAINT "creator_event_check_in_camera_audits_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "creator_event_check_in_camera_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

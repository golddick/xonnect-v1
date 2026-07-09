-- CreateTable
CREATE TABLE "chat_messages" (
    "id" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "channel_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "handle" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "reactions" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chat_messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "chat_messages_kind_channel_id_idx" ON "chat_messages"("kind", "channel_id");

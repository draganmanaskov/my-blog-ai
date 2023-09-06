/*
  Warnings:

  - Added the required column `postId` to the `conversations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "conversations" ADD COLUMN     "postId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "conversations_postId_idx" ON "conversations"("postId");

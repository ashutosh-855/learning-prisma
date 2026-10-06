/*
  Warnings:

  - You are about to drop the column `staffCount` on the `Organization` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Organization" DROP COLUMN "staffCount";

-- CreateTable
CREATE TABLE "Setting" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "timezone" TEXT NOT NULL DEFAULT 'Asia/Kolkata',
    "language" TEXT NOT NULL DEFAULT 'en',
    "emailNotification" BOOLEAN NOT NULL DEFAULT true,
    "smsNotification" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Setting_orgId_key" ON "Setting"("orgId");

-- AddForeignKey
ALTER TABLE "Setting" ADD CONSTRAINT "Setting_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

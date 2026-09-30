/*
  Warnings:

  - You are about to drop the column `availible` on the `Product` table. All the data in the column will be lost.
  - Added the required column `available` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "availible",
ADD COLUMN     "available" "Availibility" NOT NULL;

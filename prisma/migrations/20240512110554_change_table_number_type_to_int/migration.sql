/*
  Warnings:

  - Changed the type of `tableNumber` on the `Order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "tableNumber",
ADD COLUMN     "tableNumber" INTEGER NOT NULL;

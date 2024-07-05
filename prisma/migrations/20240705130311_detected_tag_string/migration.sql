/*
  Warnings:

  - You are about to drop the column `detectedTag` on the `telemetry` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `telemetry` DROP COLUMN `detectedTag`,
    ADD COLUMN `detectedTagSN` VARCHAR(191) NULL;

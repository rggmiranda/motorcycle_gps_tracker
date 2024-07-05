/*
  Warnings:

  - Added the required column `speed` to the `Telemetry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `telemetry` ADD COLUMN `speed` INTEGER NOT NULL;

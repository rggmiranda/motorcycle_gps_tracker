/*
  Warnings:

  - Added the required column `deviceId` to the `Telemetry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `telemetry` ADD COLUMN `deviceId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Telemetry` ADD CONSTRAINT `Telemetry_deviceId_fkey` FOREIGN KEY (`deviceId`) REFERENCES `Device`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

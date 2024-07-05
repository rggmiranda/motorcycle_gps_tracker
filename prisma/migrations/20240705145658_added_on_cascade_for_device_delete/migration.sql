/*
  Warnings:

  - A unique constraint covering the columns `[deviceParamsId]` on the table `Device` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `alarm` DROP FOREIGN KEY `Alarm_deviceId_fkey`;

-- DropForeignKey
ALTER TABLE `device` DROP FOREIGN KEY `Device_deviceParamsId_fkey`;

-- DropForeignKey
ALTER TABLE `tagsondevices` DROP FOREIGN KEY `TagsOnDevices_deviceId_fkey`;

-- DropForeignKey
ALTER TABLE `telemetry` DROP FOREIGN KEY `Telemetry_deviceId_fkey`;

-- CreateIndex
CREATE UNIQUE INDEX `Device_deviceParamsId_key` ON `Device`(`deviceParamsId`);

-- AddForeignKey
ALTER TABLE `TagsOnDevices` ADD CONSTRAINT `TagsOnDevices_deviceId_fkey` FOREIGN KEY (`deviceId`) REFERENCES `Device`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Device` ADD CONSTRAINT `Device_deviceParamsId_fkey` FOREIGN KEY (`deviceParamsId`) REFERENCES `DeviceParams`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Alarm` ADD CONSTRAINT `Alarm_deviceId_fkey` FOREIGN KEY (`deviceId`) REFERENCES `Device`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Telemetry` ADD CONSTRAINT `Telemetry_deviceId_fkey` FOREIGN KEY (`deviceId`) REFERENCES `Device`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

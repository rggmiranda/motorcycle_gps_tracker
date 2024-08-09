-- AlterTable
ALTER TABLE `device` ADD COLUMN `battery` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `telemetry` ADD COLUMN `vehicleBattery` INTEGER NULL;

-- CreateTable
CREATE TABLE `Device` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `alarmArmed` BOOLEAN NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` VARCHAR(191) NOT NULL,
    `deviceParamsId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DeviceParams` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `shutDownDistance` INTEGER NOT NULL DEFAULT 150,
    `shutDownMaxSpeed` INTEGER NOT NULL DEFAULT 40,
    `batteryLevelAlarm` DOUBLE NOT NULL DEFAULT 12,
    `minBatteryLevelAlarm` DOUBLE NOT NULL DEFAULT 11.5,
    `vibrationTriggerLevel` INTEGER NOT NULL DEFAULT 50,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Alarm` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deactivatedAt` DATETIME(3) NULL,
    `deviceId` INTEGER NOT NULL,
    `snapShot` VARCHAR(191) NULL,
    `trigger` ENUM('SHOCK', 'NO_POWER', 'TAG') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Telemetry` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `longitude` DOUBLE NOT NULL,
    `latitude` DOUBLE NOT NULL,
    `heading` DOUBLE NOT NULL,
    `acceleration_x` DOUBLE NULL,
    `acceleration_y` DOUBLE NULL,
    `acceleration_z` DOUBLE NULL,
    `detectedTag` VARCHAR(255) NULL,
    `tagBattery` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `alarmId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Device` ADD CONSTRAINT `Device_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Device` ADD CONSTRAINT `Device_deviceParamsId_fkey` FOREIGN KEY (`deviceParamsId`) REFERENCES `DeviceParams`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Alarm` ADD CONSTRAINT `Alarm_deviceId_fkey` FOREIGN KEY (`deviceId`) REFERENCES `Device`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Telemetry` ADD CONSTRAINT `Telemetry_alarmId_fkey` FOREIGN KEY (`alarmId`) REFERENCES `Alarm`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

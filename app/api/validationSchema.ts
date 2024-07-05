import { z } from "zod"
import { Trigger } from "@prisma/client";



export const createDeviceSchema = z.object({
	name: z.string().min(1, "Name is required.").max(255),
	userId: z.string().min(1, "Assigned user is required")
});

export const modifyDeviceSchema = z.object({
	name: z.string().min(1, "Name is required.").max(255).optional(),
	userId: z.string().min(1, "Assigned user is required").optional(),
	alarmArmed: z.boolean().optional()
});

export const deviceParamsSchema = z.object({
	shutDownDistance: z.number().min(100).max(1000).optional(),
	shutDownMaxSpeed: z.number().min(15).max(80).optional(),
	batteryLevelAlarm: z.number().min(11.5).max(14).optional(),
	minBatteryLevelAlarm: z.number().min(11.5).max(14).optional(),
	vibrationTriggerLevel: z.number().min(0).max(100).optional()
});

export const createAlarmSchema = z.object({
	deviceId: z.string(),
	snapShot: z.string().optional(),
	trigger: z.enum(Object.values(Trigger) as [string, ...string[]])
});

export const modifyAlarmSchema = z.object({
	active: z.boolean()
});

export const createTagSchema = z.object({
	serial: z.string().min(1, "Serial number is required"),
	userId: z.string().min(1, "Assigned user is required")
});

export const modifyTagSchema = z.object({
	userId: z.string().min(1, "Assigned user is required").optional(),
	batteryLevel: z.number().min(0).max(100).optional()
});

export const createTelemetrySchema = z.object({
	deviceId: z.number(),
	latitude: z.number(),
	longitude: z.number(),
	heading: z.number(),
	speed: z.number(),
	acceleration_x: z.number().optional(),
	acceleration_y: z.number().optional(),
	acceleration_z: z.number().optional(),
	detectedTagSN: z.string().optional(),
	tagBattery: z.number().optional()
});
import { deviceParamsSchema } from '@/app/api/validationSchema';
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    const body = await request.json();

    const validation = deviceParamsSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.format(), {
            status: 400,
        });

    const { shutDownDistance, shutDownMaxSpeed, batteryLevelAlarm, minBatteryLevelAlarm, vibrationTriggerLevel } = body;

    const device = await prisma.device.findUnique({
        where: { id: parseInt(params.id) },
    });
    if (!device)
        return NextResponse.json(
            { error: "Invalid device" },
            { status: 404 }
        );
    const deviceParams = await prisma.deviceParams.findUnique({
        where: { id: device?.deviceParamsId },
    });

    if (!deviceParams)
        return NextResponse.json(
            { error: "Device parameters data corrupted" },
            { status: 404 }
        );

    const updatedDeviceParams = await prisma.deviceParams.update({
        where: { id: deviceParams.id },
        data: {
            shutDownDistance,
            shutDownMaxSpeed,
            batteryLevelAlarm,
            minBatteryLevelAlarm,
            vibrationTriggerLevel,
        },
    });

    return NextResponse.json(updatedDeviceParams);
}


export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const device = await prisma.device.findUnique({
        where: { id: parseInt(params.id) },
    });
    if (!device)
        return NextResponse.json(
            { error: "Invalid device" },
            { status: 404 }
        );
    const deviceParams = await prisma.deviceParams.findUnique({
        where: { id: device?.deviceParamsId },
    });
    if (!deviceParams)
        return NextResponse.json(
            { error: "Device parameters data corrupted" },
            { status: 404 }
        );
    return NextResponse.json(deviceParams);
}

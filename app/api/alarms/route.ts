import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { createAlarmSchema } from '@/app/api/validationSchema';

export async function POST(request: NextRequest) {
      const body = await request.json();
      const validation = createAlarmSchema.safeParse(body);
      if (!validation.success)
            return NextResponse.json(validation.error.format(), { status: 400 });

      const { deviceId, snapShot, trigger } = body;

      // Verify that the device exists
      const device = await prisma.device.findUnique({
            where: { id: parseInt(deviceId) },
      });
      if (!device)
            return NextResponse.json(
                  { error: "Invalid device." },
                  { status: 404 }
            );

      // Verify if there already is an active alarm for the device
      const alarms = await prisma.alarm.findMany({
            where: {
                  AND: [
                        {
                              deviceId: parseInt(deviceId),
                              active: true
                        }]
            },
            orderBy: { createdAt: 'desc' }
      });
      if (alarms.length !== 0)
            return NextResponse.json(
                  { error: "There already is an active alarm for this device." },
                  { status: 400 }
            );

      // Create new alarm
      const newAlarm = await prisma.alarm.create({
            data: { deviceId: parseInt(deviceId), snapShot: snapShot, trigger: trigger },
      });

      return NextResponse.json(newAlarm, { status: 201 });
}

export async function GET(request: NextRequest) {

      const url = new URL(request.url);
      const userId = url.searchParams.get('userId') ?? '';
      // console.log(userId)
      const alarms = await prisma.alarm.findMany({
            where: {
                  device:{
                        userId:userId
                  }
            },
            orderBy: { createdAt: 'desc' }
      });
      return NextResponse.json(alarms);
}

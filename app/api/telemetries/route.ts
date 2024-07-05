import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { createTelemetrySchema } from '@/app/api/validationSchema';

export async function POST(request: NextRequest) {
   const body = await request.json();
   const validation = createTelemetrySchema.safeParse(body);
   if (!validation.success)
      return NextResponse.json(validation.error.format(), { status: 400 });


   //Check if device exists in DB
   const device = await prisma.device.findUnique({
      where: { id: body.deviceId },
   });
   if (!device)
      return NextResponse.json(
         { error: "Invalid device." },
         { status: 404 }
      );

   //Find active alarm, if found it will be assigned to the telemetry
   const alarm = await prisma.alarm.findFirst({
      where: {
         AND: [
            { deviceId: body.deviceId },
            { active: true },
         ]
      }
   });

   //If tag info comes with telemetry -> Update tag battery
   if (body.detectedTagSN && body.tagBattery) {
      const tag = await prisma.tag.findFirst({
         where: {
            serial: body.detectedTagSN
         }
      });
      if (tag) {
         const updatedTag = await prisma.tag.update({
            where: { id: tag.id },
            data: {
               batteryLevel: body.tagBattery
            },
         });
      }
   }

   //Save telemetry to DB
   const newTelemetry = await prisma.telemetry.create({
      data: {
         deviceId: body.deviceId,
         latitude: body.latitude,
         longitude: body.longitude,
         heading: body.heading,
         speed: body.speed,
         acceleration_x: body.acceleration_x,
         acceleration_y: body.acceleration_y,
         acceleration_z: body.acceleration_z,
         detectedTagSN: body.detectedTagSN,
         tagBattery: body.tagBattery,
         alarmId: alarm?.id
      },
   });
   return NextResponse.json(newTelemetry, { status: 201 });
}


export async function GET(request: NextRequest) {
   const url = new URL(request.url);
   const alarmId = url.searchParams.get('alarmId');
   let telemetries

   //if alarmId is present, get all the telemetries for that specific alarm
   if (alarmId) {
      telemetries = await prisma.telemetry.findMany({
         where: {
            alarmId: parseInt(alarmId)
         },
         orderBy: { createdAt: 'desc' }
      });
   } else {
      //if alarmId is not present, get the telemetries between the desired range
      const fromDate = url.searchParams.get('fromDate');
      const toDate = url.searchParams.get('toDate');
      if (fromDate && toDate) {
         const fromDateObj = new Date(fromDate);
         const toDateObj = new Date(toDate);
         telemetries = await prisma.telemetry.findMany({
            where: {
               createdAt: {
                  lt: toDateObj,
                  gt: fromDateObj,
               },
            },
            orderBy: { createdAt: 'desc' }
         });
      }
   }
   //if alarmId is not present, and dates are not provided return an empty object
   return NextResponse.json(telemetries||{});
}

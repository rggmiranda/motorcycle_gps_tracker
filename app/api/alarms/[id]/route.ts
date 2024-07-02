import { modifyAlarmSchema } from '@/app/api/validationSchema';
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";


export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
   const body = await request.json();

   const validation = modifyAlarmSchema.safeParse(body);
   if (!validation.success)
      return NextResponse.json(validation.error.format(), {
         status: 400,
      });

   const { active } = body;

   const alarm = await prisma.alarm.findUnique({
      where: { id: parseInt(params.id) },
   });
   if (!alarm)
      return NextResponse.json(
         { error: "Invalid alarm" },
         { status: 404 }
      );

   let errorMsg = ""
   if (active === true && alarm.active === true) {
      errorMsg = "Alarm is already active"
   } else if (active === true && alarm.active === false) {
      errorMsg = "Cannot re-activate an alarm"
   } else if (active === false && alarm.active === false) {
      errorMsg = "Alarm was already deactivated"
   }
   if (errorMsg != "") {
      return NextResponse.json(
         { error: errorMsg },
         { status: 400 }
      );
   }

   const updatedAlarm = await prisma.alarm.update({
      where: { id: parseInt(params.id) },
      data: {
         active
      },
   });

   return NextResponse.json(updatedAlarm);
}

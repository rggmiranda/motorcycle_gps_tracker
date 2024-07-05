import { modifyTagSchema } from '@/app/api/validationSchema';
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {

   const body = await request.json();

   const validation = modifyTagSchema.safeParse(body);
   if (!validation.success)
      return NextResponse.json(validation.error.format(), {
         status: 400,
      });

   const { userId } = body;

   //Check if user exists in DB
   if (userId) {
      const user = await prisma.user.findUnique({
         where: { id: userId },
      });
      if (!user)
         return NextResponse.json(
            { error: "Invalid user." },
            { status: 404 }
         );
   }

   //Find if tag exists in DB
   const tag = await prisma.tag.findUnique({
      where: { id: parseInt(params.id) },
   });
   if (!tag)
      return NextResponse.json(
         { error: "Invalid tag." },
         { status: 404 }
      );

   //Update userId (Tags can be transfered, the battery status is updated trough telemetries)
   const updatedTag = await prisma.tag.update({
      where: { id: tag.id },
      data: {
         userId
      },
   });

   return NextResponse.json(updatedTag);
}


export async function GET(
   request: NextRequest,
   { params }: { params: { id: string } }
) {

   //Check that tag exists
   const tag = await prisma.tag.findUnique({
      where: { id: parseInt(params.id) },
   });

   if (!tag)
      return NextResponse.json(
         { error: "Invalid tag" },
         { status: 404 }
      );


   //Search for all the devices asociated to the tag and return the json object with the devices field
   const tagsOnDevices = await prisma.tagsOnDevices.findMany({
      where: { tagId: tag.id }
   });
   let updatedTag = {
      ...tag,
      devices: tagsOnDevices.map((item) => item.deviceId)
   };
   return NextResponse.json(updatedTag);
}

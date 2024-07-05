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

   const tag = await prisma.tag.findUnique({
      where: { id: parseInt(params.id) },
   });
   if (!tag)
      return NextResponse.json(
         { error: "Invalid tag." },
         { status: 404 }
      );

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
   const tag = await prisma.tag.findUnique({
      where: { id: parseInt(params.id) },
   });

   if (!tag)
      return NextResponse.json(
         { error: "Invalid tag" },
         { status: 404 }
      );


   const tagsOnDevices = await prisma.tagsOnDevices.findMany({
      where: { tagId: tag.id }
   });
   let updatedTag = {
      ...tag,
      devices: tagsOnDevices.map((item) => item.deviceId)
   };
   return NextResponse.json(updatedTag);
}

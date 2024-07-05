import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { createTagSchema } from '@/app/api/validationSchema';

export async function POST(request: NextRequest) {
   const body = await request.json();
   const validation = createTagSchema.safeParse(body);
   if (!validation.success)
      return NextResponse.json(validation.error.format(), { status: 400 });

   const user = await prisma.user.findUnique({
      where: { id: body.userId },
   });
   if (!user)
      return NextResponse.json(
         { error: "Invalid user." },
         { status: 404 }
      );
   const newTag = await prisma.tag.create({
      data: { serial: body.serial, userId: body.userId },
   });
   console.log('newTag', newTag)

   return NextResponse.json(newTag, { status: 201 });
}


export async function GET(request: NextRequest) {
   const url = new URL(request.url);
   const userId = url.searchParams.get('userId') ?? '';

   const tags = await prisma.tag.findMany({
      where: {
         userId: userId
      },
      orderBy: { createdAt: 'desc' }
   });
   let updatedTags = []
   for (let i = 0; i < tags.length; i++) {
      const tagsOnDevices = await prisma.tagsOnDevices.findMany({
         where: { tagId: tags[i].id }
      });
      let updatedTag = {
         ...tags[i],
         devices: tagsOnDevices.map((item)=>item.deviceId)
       };
       updatedTags.push(updatedTag)
   }
   return NextResponse.json(updatedTags);
}

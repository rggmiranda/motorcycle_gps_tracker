import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { createDeviceSchema } from '@/app/api/validationSchema';
import { useSession } from "next-auth/react";
import getServerSession from 'next-auth';

export async function POST(request: NextRequest) {
	const body = await request.json();
	const validation = createDeviceSchema.safeParse(body);
	if (!validation.success)
		return NextResponse.json(validation.error.format(), { status: 400 });

	//Check that the user exists
	const user = await prisma.user.findUnique({
		where: { id: body.userId },
	});
	if (!user)
		return NextResponse.json(
			{ error: "Invalid user." },
			{ status: 404 }
		);

	//Create element of device parameters with default values
	const newDeviceParams = await prisma.deviceParams.create({})

	//Create a new device and associate the device parameters
	const newDevice = await prisma.device.create({
		data: { name: body.name, userId: body.userId, deviceParamsId: newDeviceParams.id },
	});

	return NextResponse.json(newDevice, { status: 201 });
}


export async function GET(request: NextRequest) {
	const users = await prisma.device.findMany({
		orderBy: { name: 'asc' }
	});
	return NextResponse.json(users);
}

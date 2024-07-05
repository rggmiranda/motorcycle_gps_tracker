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

	const { alarmArmed, name, userId } = body;


	//Check that the user exists
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

	//Check that the device exists
	const device = await prisma.device.findUnique({
		where: { id: parseInt(params.id) },
	});
	if (!device)
		return NextResponse.json(
			{ error: "Invalid device." },
			{ status: 404 }
		);

	const updatedDevice = await prisma.device.update({
		where: { id: device.id },
		data: {
			name,
			alarmArmed,
			userId
		},
	});

	return NextResponse.json(updatedDevice);
}

export async function DELETE(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	const device = await prisma.device.findUnique({
		where: { id: parseInt(params.id) },
	});

	//Check that the device exists
	if (!device)
		return NextResponse.json(
			{ error: "Invalid device" },
			{ status: 404 }
		);

	//Alarms, telemetries and other configs will be deleted on cascade
	await prisma.device.delete({
		where: { id: device.id },
	});

	return NextResponse.json({});
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

	return NextResponse.json(device);
}

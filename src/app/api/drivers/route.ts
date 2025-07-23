import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const drivers = await prisma.driver.findMany();
  return NextResponse.json(drivers);
}

export async function POST(request: Request) {
  const { name, license } = await request.json();
  const newDriver = await prisma.driver.create({
    data: { name, license },
  });
  return NextResponse.json(newDriver);
}

export async function PUT(request: Request) {
  const { id, name, license } = await request.json();
  const updatedDriver = await prisma.driver.update({
    where: { id },
    data: { name, license },
  });
  return NextResponse.json(updatedDriver);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  await prisma.driver.delete({ where: { id } });
  return NextResponse.json({ success: true });
}

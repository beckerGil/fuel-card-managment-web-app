import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const cards = await prisma.card.findMany();
  return NextResponse.json(cards);
}

export async function POST(request: Request) {
  const { name, number } = await request.json();
  const newCard = await prisma.card.create({
    data: { name, number },
  });
  return NextResponse.json(newCard);
}

export async function PUT(request: Request) {
  const { id, name, number } = await request.json();
  const updatedCard = await prisma.card.update({
    where: { id },
    data: { name, number },
  });
  return NextResponse.json(updatedCard);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  await prisma.card.delete({ where: { id } });
  return NextResponse.json({ success: true });
}

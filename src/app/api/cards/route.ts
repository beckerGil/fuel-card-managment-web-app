import { NextResponse } from 'next/server';

let cards: { id: number; name: string; number: string }[] = [];

export async function GET() {
  return NextResponse.json(cards);
}

export async function POST(request: Request) {
  const { name, number } = await request.json();
  const newCard = { id: Date.now(), name, number };
  cards.push(newCard);
  return NextResponse.json(newCard);
}

export async function PUT(request: Request) {
  const { id, name, number } = await request.json();
  cards = cards.map(card => card.id === id ? { ...card, name, number } : card);
  return NextResponse.json({ id, name, number });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  cards = cards.filter(card => card.id !== id);
  return NextResponse.json({ success: true });
}

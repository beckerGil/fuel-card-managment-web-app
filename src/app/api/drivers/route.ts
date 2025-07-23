import { NextResponse } from 'next/server';

let drivers: { id: number; name: string; license: string }[] = [];

export async function GET() {
  return NextResponse.json(drivers);
}

export async function POST(request: Request) {
  const { name, license } = await request.json();
  const newDriver = { id: Date.now(), name, license };
  drivers.push(newDriver);
  return NextResponse.json(newDriver);
}

export async function PUT(request: Request) {
  const { id, name, license } = await request.json();
  drivers = drivers.map(driver => driver.id === id ? { ...driver, name, license } : driver);
  return NextResponse.json({ id, name, license });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  drivers = drivers.filter(driver => driver.id !== id);
  return NextResponse.json({ success: true });
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const deal = await prisma.deal.findUnique({
    where: { id },
    include: { contact: true },
  });
  if (!deal) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(deal);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json();
  const deal = await prisma.deal.update({
    where: { id },
    data: {
      title: body.title,
      valueCents: body.valueCents,
      stage: body.stage,
      expectedCloseDate: body.expectedCloseDate
        ? new Date(body.expectedCloseDate)
        : undefined,
    },
  });
  return NextResponse.json(deal);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  await prisma.deal.delete({ where: { id } });
  return new NextResponse(null, { status: 204 });
}

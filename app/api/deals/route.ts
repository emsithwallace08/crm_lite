import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const deals = await prisma.deal.findMany({
    include: { contact: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(deals);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const deal = await prisma.deal.create({
    data: {
      title: body.title,
      valueCents: body.valueCents,
      stage: body.stage ?? "LEAD",
      expectedCloseDate: body.expectedCloseDate
        ? new Date(body.expectedCloseDate)
        : null,
      contactId: body.contactId,
    },
  });
  return NextResponse.json(deal, { status: 201 });
}

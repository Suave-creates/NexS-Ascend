// src/app/api/maintenance/shop-issue/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/utils/prisma';

export async function POST(req: Request) {
  try {
    const { pid, partName, quantity, unit, rate, category, total, issuedAt } =
      await req.json();
    const record = await prisma.maintenanceShopIssue.create({
      data: {
        pid,
        partName,
        quantity,
        unit,
        rate,
        category,
        total,
        issuedAt: new Date(issuedAt),
      },
    });
    return NextResponse.json(record);
  } catch (error: any) {
    console.error('Shop Issue API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

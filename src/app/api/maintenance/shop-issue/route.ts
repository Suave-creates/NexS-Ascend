// src/app/api/maintenance/shop-issue/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/utils/prisma';

export async function POST(req: Request) {
  try {
    const {
      pid,
      partName,
      quantity,
      unit,
      rate,
      category,
      total,
      destination,
      department,
      issuedAt,
    } = await req.json();

    // Basic validation
    for (const [key, value] of Object.entries({
      pid,
      partName,
      quantity,
      unit,
      rate,
      category,
      total,
      destination,
      department,
      issuedAt,
    })) {
      if (value === undefined || value === null || value === '') {
        return NextResponse.json(
          { error: `Missing or invalid field: ${key}` },
          { status: 400 }
        );
      }
    }

    const record = await prisma.maintenanceShopIssue.create({
      data: {
        pid,
        partName,
        quantity,
        unit,
        rate,
        category,
        total,
        destination : destination, // maps to destination_of_use in the DB
        department,
        issuedAt: new Date(issuedAt),
      },
    });

    return NextResponse.json(record);
  } catch (error: any) {
    console.error('Shop Issue API error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

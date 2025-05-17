// src/app/api/operations/metadata/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/utils/prisma';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const locationId = url.searchParams.get('locationId');
    if (!locationId) {
      return NextResponse.json({ error: 'locationId query parameter is required' }, { status: 400 });
    }

    // Optional: Simple API key auth
    // const apiKey = req.headers.get('x-api-key');
    // if (apiKey !== process.env.OPS_METADATA_KEY) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    // Query the operationsmetadata table in mydb
    const record = await prisma.operationsMetadata.findFirst({
      where: { locationId },
      select: { locationId: true, cityOdd: true }
    });

    if (!record) {
      return NextResponse.json({ found: false });
    }

    return NextResponse.json({
      found: true,
      locationId: record.locationId,
      cityOdd: record.cityOdd,
    });
  } catch (err: any) {
    console.error('Operations metadata API error:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}

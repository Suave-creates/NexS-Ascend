// src/app/api/operations/metadata/route.ts

import { NextResponse } from 'next/server';
import prisma from '@/utils/prisma';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const locationId = url.searchParams.get('locationId');
    if (!locationId) {
      return NextResponse.json(
        { error: 'locationId query parameter is required' },
        { status: 400 }
      );
    }

    const record = await prisma.operationsMetadata.findFirst({
      where: { locationId },
      select: { locationId: true, cityOdd: true }
    });

    if (!record) {
      return NextResponse.json({ found: false });
    }

    // Persist into fasttrackscan using the correct field names
    await prisma.fastTrackScan.create({
      data: {
        locationID: record.locationId,  
        cityOdd:   record.cityOdd,      
        // you can omit `time` since it defaults to `now()`
      },
    });

    return NextResponse.json({
      found: true,
      locationId: record.locationId,
      cityOdd:    record.cityOdd,
    });
  } catch (err: any) {
    console.error('Operations metadata API error:', err);
    return NextResponse.json(
      { error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

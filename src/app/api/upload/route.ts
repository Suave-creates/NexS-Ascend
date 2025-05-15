// src/app/api/upload/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import * as XLSX from 'xlsx';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as Blob;
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows: { ShippingID: string; City: string }[] =
      XLSX.utils.sheet_to_json(sheet);

    const ops = rows.map((row) =>
      prisma.shippingMetadata.upsert({
        where: { shippingID: row.ShippingID },
        create: { shippingID: row.ShippingID, city: row.City },
        update: { city: row.City },
      })
    );
    await prisma.$transaction(ops);

    return NextResponse.json({ success: true, count: rows.length });
  } catch (err) {
    console.error('Upload API error:', err);
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
}

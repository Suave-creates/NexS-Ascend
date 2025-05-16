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

    const rawRows: any[] = XLSX.utils.sheet_to_json(sheet);

    // Safely extract only the required columns
    const rows = rawRows
      .filter((row) => row.shipping_code && row.city_odd)
      .map((row) => ({
        shippingID: String(row.shipping_code).trim(),
        city: String(row.city_odd).trim(),
      }));

    if (rows.length === 0) {
      return NextResponse.json({ error: 'No valid rows found' }, { status: 400 });
    }

    const ops = rows.map((row) =>
      prisma.shippingMetadata.upsert({
        where: { shippingID: row.shippingID },
        create: { shippingID: row.shippingID, city: row.city },
        update: { city: row.city },
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

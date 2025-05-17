// src/app/api/operations/excel-upload/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import * as XLSX from 'xlsx';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as Blob;
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Read workbook and first sheet
    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    // Convert to JSON and extract only rows with both columns
    const rawRows: any[] = XLSX.utils.sheet_to_json(sheet, { defval: null });
    const rows = rawRows
      .filter(row => row.location_id != null && row.city_odd != null)
      .map(row => ({
        locationId: String(row.location_id).trim(),
        cityOdd: String(row.city_odd).trim(),
      }));

    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'No valid rows with location_id and city_odd found' },
        { status: 400 }
      );
    }

    // Delete all previous entries before inserting new data
    await prisma.operationsMetadata.deleteMany();

    // Insert new batch
    const operationsInserts = rows.map(r =>
      prisma.operationsMetadata.create({ data: r })
    );
    await prisma.$transaction(operationsInserts);

    return NextResponse.json({ success: true, count: rows.length });
  } catch (err: any) {
    console.error('Operations Excel Upload API error:', err);
    return NextResponse.json(
      { error: err.message || 'Upload failed' },
      { status: 500 }
    );
  }
}

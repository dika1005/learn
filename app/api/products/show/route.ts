import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error('[SHOW PRODUCTS ERROR]', error);
    return NextResponse.json({ message: 'Gagal ambil produk' }, { status: 500 });
  }
}

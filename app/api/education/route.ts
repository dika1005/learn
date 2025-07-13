import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '@/lib/middleware/auth';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const auth = await authMiddleware(req);
  if (auth) return auth;

  const body = await req.json();
  const { userId, school, major, startYear, endYear } = body;

  if (!userId || !school || !major || !startYear) {
    return NextResponse.json({ message: 'Data tidak lengkap' }, { status: 400 });
  }

  try {
    const newEdu = await prisma.education.create({
      data: {
        userId,
        school,
        major,
        startYear,
        endYear,
      },
    });

    return NextResponse.json({ message: 'Berhasil tambah', data: newEdu }, { status: 201 });
  } catch (err) {
    console.error('[POST EDUCATION]', err);
    return NextResponse.json({ message: 'Gagal tambah data' }, { status: 500 });
  }
}

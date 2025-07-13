// app/api/education/add/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '@/lib/middleware/auth'; 

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const authResult = await authMiddleware(req);

  if (authResult instanceof NextResponse) {
    return authResult; 
  }

  // --- Type Guard yang lebih lengkap dan aman ---
  // Pastikan authResult bukan null/undefined DAN memiliki properti userId
  if (!authResult || typeof authResult !== 'object' || !('userId' in authResult)) {
    // Logika ini seharusnya tidak pernah tercapai jika authMiddleware bekerja sesuai kontrak,
    // tetapi ini adalah penanganan error dan type guard yang baik untuk TypeScript.
    console.error('[POST EDUCATION] authMiddleware mengembalikan hasil tak terduga:', authResult);
    return NextResponse.json({ message: 'Autentikasi gagal: userId tidak ditemukan atau format tidak sesuai' }, { status: 401 });
  }
  
  // Setelah pengecekan di atas, TypeScript tahu authResult adalah objek dengan userId.
  const { userId } = authResult as { userId: string }; // Gunakan assertion di sini agar TypeScript tenang

  const body = await req.json();
  const { school, major, startYear, endYear } = body;

  if (!school || !major || !startYear) {
    return NextResponse.json({ message: 'Data pendidikan (sekolah, jurusan, atau tahun mulai) tidak lengkap' }, { status: 400 });
  }

  try {
    const newEdu = await prisma.education.create({
      data: {
        userId: userId,
        school,
        major,
        startYear,
        endYear, 
      },
    });

    return NextResponse.json({ message: 'Berhasil tambah data pendidikan', data: newEdu }, { status: 201 });
  } catch (err) {
    console.error('[POST EDUCATION ERROR]', err);
    return NextResponse.json({ message: 'Gagal tambah data pendidikan karena kesalahan server' }, { status: 500 });
  }
}
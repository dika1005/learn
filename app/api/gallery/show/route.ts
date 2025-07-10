import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET semua foto dari galeri
export async function GET() {
  try {
    const data = await prisma.gallery.findMany({
      orderBy: { takenAt: "desc" },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("❌ Error saat ambil galeri:", error);
    return NextResponse.json(
      { error: "Gagal mengambil galeri" },
      { status: 500 }
    );
  }
}

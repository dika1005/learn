import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop(); // ambil ID dari URL

  if (!id) {
    return NextResponse.json({ error: "ID galeri tidak ditemukan di URL" }, { status: 400 });
  }

  try {
    const gallery = await prisma.gallery.findUnique({
      where: { id },
    });

    if (!gallery) {
      return NextResponse.json({ error: "Galeri tidak ditemukan!" }, { status: 404 });
    }

    return NextResponse.json(gallery);
  } catch (err) {
    console.error("Error GET galeri:", err);
    return NextResponse.json({ error: "Gagal mengambil galeri" }, { status: 500 });
  }
}

// app/api/gallery/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function GET(req: NextRequest) {
  const urlParts = req.nextUrl.pathname.split("/");
  const id = urlParts[urlParts.indexOf("gallery") + 1]; // 🧠 Ambil ID setelah "gallery"

  if (!id) {
    return NextResponse.json(
      { error: "ID galeri tidak ditemukan di URL" },
      { status: 400 }
    );
  }

  try {
    const gallery = await prisma.gallery.findUnique({
      where: { id },
    });

    if (!gallery) {
      return NextResponse.json(
        { error: "Galeri tidak ditemukan!" },
        { status: 404 }
      );
    }

    return NextResponse.json(gallery);
  } catch (err) {
    console.error("Error GET galeri:", err);
    return NextResponse.json(
      { error: "Gagal mengambil galeri" },
      { status: 500 }
    );
  }
}


export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  if (!id) {
    return NextResponse.json({ error: "ID galeri tidak ditemukan" }, { status: 400 });
  }

  try {
    await prisma.gallery.delete({ where: { id } });

    return NextResponse.json({ message: "Galeri berhasil dihapus" }, { status: 200 });
  } catch (err) {
    console.error("Error DELETE galeri:", err);
    return NextResponse.json({ error: "Gagal menghapus galeri" }, { status: 500 });
  }
}

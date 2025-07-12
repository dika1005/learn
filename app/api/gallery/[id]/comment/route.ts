// app/api/gallery/[id]/comment/route.ts
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET komentar
export async function GET(req: NextRequest) {
  const urlParts = req.nextUrl.pathname.split("/");
  const id = urlParts[urlParts.indexOf("gallery") + 1]; // ambil dari /gallery/[id]/comment

  if (!id) {
    return NextResponse.json({ error: "ID galeri tidak ditemukan" }, { status: 400 });
  }

  try {
    const comments = await prisma.comment.findMany({
      where: { galleryId: id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(comments, { status: 200 });
  } catch (err) {
    console.error("Error GET komentar:", err);
    return NextResponse.json({ error: "Gagal mengambil komentar" }, { status: 500 });
  }
}

// POST komentar
export async function POST(req: NextRequest) {
  const urlParts = req.nextUrl.pathname.split("/");
  const id = urlParts[urlParts.indexOf("gallery") + 1]; // ambil dari /gallery/[id]/comment

  if (!id) {
    return NextResponse.json({ error: "ID galeri tidak ditemukan" }, { status: 400 });
  }

  try {
    const { user, message } = await req.json();

    if (!user || !message) {
      return NextResponse.json({ error: "Nama pengguna dan pesan tidak boleh kosong" }, { status: 400 });
    }

    const gallery = await prisma.gallery.findUnique({
      where: { id },
    });

    if (!gallery) {
      return NextResponse.json({ error: "Galeri tidak ditemukan!" }, { status: 404 });
    }

    const newComment = await prisma.comment.create({
      data: {
        user,
        message,
        galleryId: id,
      },
    });

    return NextResponse.json(newComment, { status: 201 });
  } catch (err) {
    console.error("Error POST komentar:", err);
    return NextResponse.json({ error: "Gagal menambahkan komentar" }, { status: 500 });
  }
}

import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET KOMENTAR
export async function GET(
  request: NextRequest,
  contextPromise: Promise<{ params: { id: string } }>
) {
  const { params } = await contextPromise;
  const id = params.id;

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

// POST KOMENTAR
export async function POST(
  request: NextRequest,
  contextPromise: Promise<{ params: { id: string } }>
) {
  const { params } = await contextPromise; // WAJIB DI-AWAIT!
  const galleryId = params.id;

  try {
    const { user, message } = await request.json();

    const gallery = await prisma.gallery.findUnique({
      where: { id: galleryId },
    });

    if (!gallery) {
      return NextResponse.json({ error: "Galeri tidak ditemukan!" }, { status: 404 });
    }

    const newComment = await prisma.comment.create({
      data: {
        user,
        message,
        gallery: {
          connect: { id: galleryId },
        },
      },
    });

    return NextResponse.json(newComment, { status: 201 });
  } catch (err) {
    console.error("Error POST komentar:", err);
    return NextResponse.json({ error: "Gagal menambahkan komentar" }, { status: 500 });
  }
}
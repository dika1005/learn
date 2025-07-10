import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, image, tags, takenAt } = body;

    const newGallery = await prisma.gallery.create({
      data: {
        title,
        description,
        image,
        tags,
        takenAt: new Date(takenAt),
      },
    });

    return NextResponse.json(newGallery, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Gagal menambahkan foto" }, { status: 500 });
  }
}

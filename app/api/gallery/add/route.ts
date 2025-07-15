import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { email: string };

    // Hanya admin yang boleh nambahin galeri (ini emailmu kan 😤)
    if (decoded.email !== "dikaramadan6@gmail.com") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

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
    console.error("[UPLOAD_ERROR]", error);
    return NextResponse.json({ message: "Invalid or expired token" }, { status: 403 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { authMiddleware } from "@/lib/middleware/auth";

const prisma = new PrismaClient();

export async function PATCH(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const auth = await authMiddleware(req);
  if (auth) return auth;

  const id = context.params.id;
  const body = await req.json();
  const { school, major, startYear, endYear } = body;

  try {
    const updated = await prisma.education.update({
      where: { id },
      data: { school, major, startYear, endYear },
    });

    return NextResponse.json({
      message: "Berhasil update",
      data: updated,
    });
  } catch (err) {
    console.error("[EDIT ERROR]", err);
    return NextResponse.json({ message: "Gagal update" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const auth = await authMiddleware(req);
  if (auth) return auth;

  const id = context.params.id;

  try {
    await prisma.education.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Berhasil hapus" });
  } catch (err) {
    console.error("[DELETE ERROR]", err);
    return NextResponse.json({ message: "Gagal hapus" }, { status: 500 });
  }
}

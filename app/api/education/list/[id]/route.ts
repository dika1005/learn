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
      data: {
        school,
        major,
        startYear,
        endYear: endYear || null,
      },
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
  { params }: { params: { id: string } } // <== INI DIA FIX-nya
) {
  const auth = await authMiddleware(req);
  if (auth instanceof NextResponse) return auth;

  const user = auth;
  const id = params.id;

  try {
    const existing = await prisma.education.findUnique({ where: { id } });
    if (!existing || existing.userId !== user.userId) {
      return NextResponse.json(
        { message: "Data tidak ditemukan atau bukan milikmu" },
        { status: 403 }
      );
    }

    await prisma.education.delete({ where: { id } });

    return NextResponse.json({ message: "Berhasil hapus" });
  } catch (err) {
    console.error("[DELETE ERROR]", err);
    return NextResponse.json({ message: "Gagal hapus" }, { status: 500 });
  }
}

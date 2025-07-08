// app/api/register/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // ❗ Cek apakah email sudah terdaftar
    const userExist = await prisma.user.findUnique({
      where: { email },
    });

    if (userExist) {
      return NextResponse.json(
        { message: "User sudah terdaftar" },
        { status: 400 }
      );
    }

    // ✅ Hash password
    const hashedPassword = await hash(password, 10);

    // ✅ Simpan ke database
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    const { password: _, ...safeUser } = user;

    return NextResponse.json(
      {
        message: "Registrasi berhasil!",
        user: safeUser,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[REGISTER ERROR]", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}

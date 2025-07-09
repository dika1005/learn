// lib/middleware/auth.ts
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function authMiddleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { message: "Token tidak ditemukan di cookies" },
      { status: 401 }
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    console.log("[authMiddleware] Token valid:", decoded);
    // bisa simpan decoded info ke req kalau mau
    return null; // artinya lanjutkan
  } catch (err) {
    console.error("[authMiddleware] Token error:", err);
    return NextResponse.json({ message: "Token tidak valid" }, { status: 403 });
  }
}

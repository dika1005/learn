// lib/middleware/auth.ts
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function authMiddleware(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("[authMiddleware] Token ga ada atau format salah 😒");
    return NextResponse.json(
      { message: "Token tidak ditemukan atau format salah" },
      { status: 401 }
    );
  }
  const token = authHeader.split(" ")[1];
  console.log("[authMiddleware] Extracted token:", token); // Pastikan tokennya benar diekstrak

  // -- TAMBAHKAN INI --
  console.log(
    "[authMiddleware] JWT_SECRET used for verification:",
    process.env.JWT_SECRET
  );
  // -- END TAMBAHKAN INI --

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    console.log("[authMiddleware] Token valid:", decoded);
    // ...
  } catch (err) {
    console.error("[authMiddleware] Token error:", err); // Ini yang kemungkinan besar muncul di log Next.js Anda
    return NextResponse.json({ message: "Token tidak valid" }, { status: 403 });
  }
}

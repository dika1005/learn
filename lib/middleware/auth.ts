import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function authMiddleware(req: NextRequest) {
  let token = req.cookies.get("token")?.value;

  // Cek juga dari Authorization header
  if (!token && req.headers.get("authorization")?.startsWith("Bearer ")) {
    token = req.headers.get("authorization")?.split(" ")[1];
  }

  if (!token) {
    return NextResponse.json(
      { message: "Token tidak ditemukan" },
      { status: 401 }
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    console.log("[authMiddleware] Token valid:", decoded);
    return null;
  } catch (err) {
    console.error("[authMiddleware] Token error:", err);
    return NextResponse.json({ message: "Token tidak valid" }, { status: 403 });
  }
}

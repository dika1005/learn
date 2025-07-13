// app/api/education/list/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { authMiddleware } from "@/lib/middleware/auth";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const auth = await authMiddleware(req);
  if (auth) return auth; // balikin error token kalau gak valid

  const token = req.cookies.get("token")?.value;
  const decoded = jwt.verify(token!, process.env.JWT_SECRET!) as { id: string };

  const educationList = await prisma.education.findMany({
    where: { userId: decoded.id },
    orderBy: { startYear: "desc" },
  });

  return NextResponse.json(educationList);
}

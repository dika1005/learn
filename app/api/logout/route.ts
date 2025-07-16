import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  // Hapus cookie JWT (misalnya "token")
  (await cookies()).delete("token");

  return NextResponse.json({ message: "Logout berhasil." }, { status: 200 });
}

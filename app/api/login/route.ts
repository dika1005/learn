// app/api/login/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { compare } from 'bcryptjs'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    const user = await prisma.user.findUnique({ where: { email } })

    if (!user || !user.password) {
      return NextResponse.json({ message: 'Email tidak ditemukan' }, { status: 404 })
    }

    const isValid = await compare(password, user.password)
    if (!isValid) {
      return NextResponse.json({ message: 'Password salah' }, { status: 401 })
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    )

    return NextResponse.json({
      message: 'Login berhasil!',
      token,
      user: {
        id: user.id,
        email: user.email
      }
    }, { status: 200 })

  } catch (error) {
    console.error('[LOGIN ERROR]', error)
    return NextResponse.json({ message: 'Terjadi kesalahan server' }, { status: 500 })
  }
}

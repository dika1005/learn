import clientPromise from '../../../../lib/mongodb'
import { compare } from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  const client = await clientPromise
  const db = client.db(process.env.MONGODB_DB)
  const users = db.collection('dika')

  const user = await users.findOne({ email })
  if (!user) {
    return NextResponse.json({ message: 'Email tidak ditemukan' }, { status: 404 })
  }

  const isMatch = await compare(password, user.password)
  if (!isMatch) {
    return NextResponse.json({ message: 'Password salah' }, { status: 401 })
  }

  return NextResponse.json({ message: 'Login berhasil!' }, { status: 200 })
}

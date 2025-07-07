import { NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongodb';
import bcrypt from 'bcrypt'; // Import bcrypt

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const users = db.collection('dika'); // Atau nama koleksi user Anda

    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    // Hashing password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 adalah salt rounds

    await users.insertOne({ email, password: hashedPassword }); // Simpan password yang sudah di-hash

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
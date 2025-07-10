// app/api/products/add/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    const { name, description, price } = await req.json()

    // Validasi dasar
    if (!name || !price) {
      return NextResponse.json({ message: "Nama dan harga produk wajib diisi!" }, { status: 400 })
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price), // pastikan harga bertipe float
      },
    })

    return NextResponse.json({
      message: "Produk berhasil ditambahkan!",
      product: newProduct,
    }, { status: 201 })

  } catch (error) {
    console.error("[ADD PRODUCT ERROR]", error)
    return NextResponse.json({ message: "Gagal menambahkan produk" }, { status: 500 })
  }
}

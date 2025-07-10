'use client'
import { useEffect, useState } from 'react'

type Product = {
  id: string
  name: string
  description?: string
  price: number
  createdAt: string
}

export default function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products/show')
        const data = await res.json()
        setProducts(data.products)
      } catch (err) {
        console.error('Gagal mengambil data produk:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div className="max-w-5xl mx-auto px-6 mt-12">
      <h1 className="text-3xl font-bold mb-6">Daftar Produk</h1>

      {loading ? (
        <p className="text-gray-500">Memuat data produk...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500">Belum ada produk ditambahkan.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded shadow hover:shadow-md transition"
            >
              <h2 className="text-xl font-bold text-blue-700">
                {product.name}
              </h2>
              <p className="text-gray-600">{product.description}</p>
              <p className="mt-2 font-semibold text-green-600">
                Rp {product.price.toLocaleString('id-ID')}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Ditambahkan: {new Date(product.createdAt).toLocaleString('id-ID')}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

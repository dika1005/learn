'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AddProductPage() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch('/api/products/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, price })
    })

    const data = await res.json()

    if (res.ok) {
      alert(data.message)
      router.push('/products/show') 
    } else {
      alert('Gagal tambah produk: ' + data.message)
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-12 px-6">
      <h1 className="text-3xl font-bold mb-6">Tambah Produk</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nama Produk</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border rounded p-2"
            placeholder="Contoh: Sepatu Tsundere"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Deskripsi</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded p-2"
            rows={3}
            placeholder="Sepatu keren buat yang suka galak tapi manis~"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Harga</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full border rounded p-2"
            placeholder="299.99"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Simpan Produk
        </button>
      </form>
    </div>
  )
}

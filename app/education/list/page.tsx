'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Education {
  id: string
  school: string
  major: string
  startYear: number
  endYear?: number
}

export default function EducationListPage() {
  const [data, setData] = useState<Education[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/education')
      const json = await res.json()
      setData(json.data || [])
      setLoading(false)
    }

    fetchData()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin hapus data ini?')) return

    const token = localStorage.getItem('token') // pastikan disimpan pas login
    const res = await fetch(`/api/education/list/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (res.ok) {
      setData((prev) => prev.filter((d) => d.id !== id))
      alert('Berhasil hapus data.')
    } else {
      alert('Gagal hapus data.')
    }
  }

  if (loading) return <p>Loading...</p>

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Riwayat Pendidikan</h1>

      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Sekolah</th>
            <th className="p-2">Jurusan</th>
            <th className="p-2">Tahun</th>
            <th className="p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((edu) => (
            <tr key={edu.id} className="border-t">
              <td className="p-2">{edu.school}</td>
              <td className="p-2">{edu.major}</td>
              <td className="p-2">{edu.startYear} - {edu.endYear || '-'}</td>
              <td className="p-2">
                <button
                  className="text-blue-600 mr-3"
                  onClick={() => router.push(`/education/edit/${edu.id}`)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600"
                  onClick={() => handleDelete(edu.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Education {
  id: string
  school: string
  major: string
  startYear: number
  endYear?: number
  // Add userId, createdAt, updatedAt if you plan to use them in the client
  // userId: string
  // createdAt: string
  // updatedAt: string
}

export default function EducationListPage() {
  const [data, setData] = useState<Education[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try { // Add try-catch for better error handling
        // >>>>>> FIX THIS FETCH URL <<<<<<
        const res = await fetch('/api/education/list') // Change from /api/education to /api/education/list
        
        if (!res.ok) {
          // Handle non-OK responses (e.g., 401, 403, 500)
          const errorData = await res.json();
          console.error('Failed to fetch education list:', errorData);
          setLoading(false);
          // You might want to redirect to login if it's an auth error
          if (res.status === 401 || res.status === 403) {
            alert('Sesi Anda telah berakhir atau tidak valid. Silakan login kembali.');
            router.push('/login');
          } else {
            alert(`Gagal memuat data pendidikan: ${errorData.message || res.statusText}`);
          }
          return; // Stop execution if response is not OK
        }

        const json = await res.json()
        setData(json.data || []) // Assume your API returns { data: [...] }
        setLoading(false)
      } catch (error) {
        console.error('Network or parsing error fetching education list:', error);
        setLoading(false);
        alert('Terjadi kesalahan jaringan saat memuat daftar pendidikan.');
      }
    }

    fetchData()
  }, [])

  // The handleDelete function also has an incorrect API path:
  // It's using `/api/education/list/${id}` which is good.
  // BUT the `authMiddleware` expects tokens in cookies, not `Authorization` header.
  // So, remove the Authorization header.
  const handleDelete = async (id: string) => {
    if (!confirm('Yakin hapus data ini?')) return

    // const token = localStorage.getItem('token') // NO LONGER NEEDED OR USED
    const res = await fetch(`/api/education/list/${id}`, {
      method: 'DELETE',
      headers: {
        // Authorization: `Bearer ${token}`, // <<< REMOVE THIS LINE! Token is in cookie
      },
    })

    if (res.ok) {
      setData((prev) => prev.filter((d) => d.id !== id))
      alert('Berhasil hapus data.')
    } else {
      const errorData = await res.json();
      alert(`Gagal hapus data: ${errorData.message || res.statusText}`);
    }
  }

  if (loading) return <p>Loading...</p>

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Riwayat Pendidikan</h1>

      {data.length === 0 && !loading ? (
        <p>Belum ada data pendidikan.</p>
      ) : (
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
      )}
    </div>
  )
}
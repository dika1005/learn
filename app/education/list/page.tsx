"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Education {
  id: string;
  school: string;
  major: string;
  startYear: number;
  endYear?: number;
}

export default function EducationListPage() {
  const [data, setData] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/education/list");
        if (!res.ok) {
          const errorData = await res.json();
          console.error("Failed to fetch education list:", errorData);
          setLoading(false);
          if (res.status === 401 || res.status === 403) {
            alert("Sesi Anda telah berakhir atau tidak valid. Silakan login kembali.");
            router.push("/login");
          } else {
            alert(`Gagal memuat data pendidikan: ${errorData.message || res.statusText}`);
          }
          return;
        }

        const json = await res.json();
        setData(json.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Network or parsing error fetching education list:", error);
        setLoading(false);
        alert("Terjadi kesalahan jaringan saat memuat daftar pendidikan.");
      }
    };

    fetchData();
  }, [router]);

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin hapus data ini?")) return;

    const res = await fetch(`/api/education/list/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setData((prev) => prev.filter((d) => d.id !== id));
      alert("Berhasil hapus data.");
    } else {
      const errorData = await res.json();
      alert(`Gagal apus data: ${errorData.message || res.statusText}`);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">📚 Riwayat Pendidikan</h1>

      {data.length === 0 ? (
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded text-center font-medium">
          Belum ada data pendidikan.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-md rounded border border-gray-200">
            <thead>
              <tr className="bg-indigo-600 text-white text-left text-sm uppercase tracking-wider">
                <th className="p-3">Sekolah</th>
                <th className="p-3">Jurusan</th>
                <th className="p-3">Tahun</th>
                <th className="p-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((edu) => (
                <tr
                  key={edu.id}
                  className="border-t hover:bg-indigo-50 transition duration-150"
                >
                  <td className="p-3">{edu.school}</td>
                  <td className="p-3">{edu.major}</td>
                  <td className="p-3">
                    {edu.startYear} - {edu.endYear || "-"}
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => router.push(`/education/edit/${edu.id}`)}
                      className="text-indigo-600 hover:text-indigo-900 font-semibold mr-4 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(edu.id)}
                      className="text-red-600 hover:text-red-800 font-semibold transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

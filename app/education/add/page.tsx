// app/education/add/page.tsx
"use client";
import EducationForm from "../form";
import { useRouter } from "next/navigation";

// Tipe data tidak diubah
type EducationFormData = {
  school: string;
  major: string;
  startYear: number;
  endYear?: number;
};

export default function AddEducationPage() {
  const router = useRouter();

  // >>>>>> FUNGSI LOGIKA INI TIDAK DIUBAH SAMA SEKALI <<<<<<
  const handleSubmit = async (data: EducationFormData) => {
    const payload = {
      ...data,
    };

    try {
      const res = await fetch("/api/education/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push("/education/list");
      } else {
        const errorData = await res.json();
        alert(`Gagal menambahkan data: ${errorData.message || res.statusText}`);
      }
    } catch (error) {
      console.error("Error adding education:", error);
      alert("Terjadi kesalahan jaringan saat menambahkan data.");
    }
  };


  // >>>>>> HANYA BAGIAN RETURN (TAMPILAN) YANG DIPERBARUI <<<<<<
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        {/* Card container untuk form */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          
          {/* Header di dalam card */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Tambah Riwayat Pendidikan
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Isi detail riwayat pendidikan Anda di bawah ini.
            </p>
          </div>

          {/* Komponen form dipanggil di sini, di dalam card */}
          <EducationForm onSubmit={handleSubmit} />

        </div>
      </div>
    </div>
  );
}
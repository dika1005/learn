// app/education/add/page.tsx
"use client";
import EducationForm from "../form";
import { useRouter } from "next/navigation";

type EducationFormData = {
  school: string;
  major: string;
  startYear: number;
  endYear?: number;
};

export default function AddEducationPage() {
  const router = useRouter();

  const handleSubmit = async (data: EducationFormData) => {
    const payload = {
      ...data,
    };

    try {
      // >>>>>> UBAH URL FETCH INI <<<<<<
      const res = await fetch("/api/education/add", { // Ganti dari "/api/education" menjadi "/api/education/add"
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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tambah Riwayat Pendidikan</h1>
      <EducationForm onSubmit={handleSubmit} />
    </div>
  );
}
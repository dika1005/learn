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
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId"); // ambil dari localStorage juga

    const payload = {
      userId, // tambahkan ini
      ...data,
    };

    const res = await fetch("/api/education", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push("/education/list");
    } else {
      alert("Gagal menambahkan data!");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tambah Riwayat Pendidikan</h1>
      <EducationForm onSubmit={handleSubmit} />
    </div>
  );
}

'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import EducationForm from '../../form';

type EducationFormData = {
  school: string;
  major: string;
  startYear: number;
  endYear?: number;
};

export default function EditEducationPage() {
  const router = useRouter();
  const params = useParams(); // ambil ID dari URL
  const id = params.id as string;

  const [initialData, setInitialData] = useState<EducationFormData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/education/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const json = await res.json();
        setInitialData({
          school: json.school,
          major: json.major,
          startYear: json.startYear,
          endYear: json.endYear,
        });
      } else {
        alert('Gagal mengambil data pendidikan!');
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (data: EducationFormData) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`/api/education/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push('/education/list');
    } else {
      alert('Gagal mengedit data!');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!initialData) return <p>Data tidak ditemukan 😡</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Riwayat Pendidikan</h1>
        <EducationForm
            onSubmit={handleSubmit}
            initialValues={initialData}
        />
    </div>
  );
}

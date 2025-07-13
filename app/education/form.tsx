'use client';
import { useEffect, useState } from 'react';

export type EducationFormData = {
  school: string;
  major: string;
  startYear: number;
  endYear?: number;
};

type Props = {
  onSubmit: (data: EducationFormData) => void;
  initialValues?: EducationFormData; // <- ini dia yang penting
};

export default function EducationForm({ onSubmit, initialValues }: Props) {
  const [form, setForm] = useState<EducationFormData>({
    school: '',
    major: '',
    startYear: new Date().getFullYear(),
    endYear: undefined,
  });

  // 🔁 Update form kalau `initialValues` di-set dari luar (biasanya untuk edit)
  useEffect(() => {
    if (initialValues) {
      setForm(initialValues);
    }
  }, [initialValues]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'startYear' || name === 'endYear' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="school"
        placeholder="Nama Sekolah / Universitas"
        value={form.school}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded"
        required
      />

      <input
        type="text"
        name="major"
        placeholder="Jurusan"
        value={form.major}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded"
        required
      />

      <input
        type="number"
        name="startYear"
        placeholder="Tahun Masuk"
        value={form.startYear}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded"
        required
      />

      <input
        type="number"
        name="endYear"
        placeholder="Tahun Lulus (opsional)"
        value={form.endYear || ''}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Simpan
      </button>
    </form>
  );
}

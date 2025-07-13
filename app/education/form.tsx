// app/education/form.tsx (atau lokasi EducationForm Anda)
"use client";
import { useState } from 'react';

// Definisikan tipe untuk data formulir pendidikan
// Ini harus cocok dengan EducationFormData di AddEducationPage
type EducationFormData = {
  school: string;
  major: string;
  startYear: number;
  endYear?: number;
};

// Definisikan tipe untuk props yang akan diterima oleh EducationForm
interface EducationFormProps {
  onSubmit: (data: EducationFormData) => Promise<void>; // Menunjukkan bahwa onSubmit adalah fungsi yang menerima data dan mengembalikan Promise<void>
}

// Ubah definisi komponen untuk menerima props
export default function EducationForm({ onSubmit }: EducationFormProps) {
  const [school, setSchool] = useState('');
  const [major, setMajor] = useState('');
  const [startYear, setStartYear] = useState<number | ''>(''); // Gunakan '' untuk state awal input number
  const [endYear, setEndYear] = useState<number | ''>('');

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Lakukan validasi dasar
    if (!school || !major || startYear === '') {
      alert('Nama sekolah, jurusan, dan tahun mulai harus diisi.');
      return;
    }

    const dataToSend: EducationFormData = {
      school,
      major,
      startYear: Number(startYear), // Pastikan ini number
      endYear: endYear !== '' ? Number(endYear) : undefined, // Pastikan ini number atau undefined
    };

    await onSubmit(dataToSend); // Panggil fungsi onSubmit yang diterima dari props
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      <div>
        <label htmlFor="school" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Nama Sekolah/Universitas
        </label>
        <input
          type="text"
          id="school"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
        />
      </div>
      <div>
        <label htmlFor="major" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Jurusan/Program Studi
        </label>
        <input
          type="text"
          id="major"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
        />
      </div>
      <div>
        <label htmlFor="startYear" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Tahun Mulai
        </label>
        <input
          type="number"
          id="startYear"
          value={startYear}
          onChange={(e) => setStartYear(parseInt(e.target.value) || '')} // Parse integer atau kosong
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
        />
      </div>
      <div>
        <label htmlFor="endYear" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Tahun Lulus (opsional)
        </label>
        <input
          type="number"
          id="endYear"
          value={endYear}
          onChange={(e) => setEndYear(parseInt(e.target.value) || '')} // Parse integer atau kosong
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Simpan
      </button>
    </form>
  );
}
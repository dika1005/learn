'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const updateEmail = () => {
    const email = localStorage.getItem('userEmail');
    setUserEmail(email);
    setLoading(false);
  };

  updateEmail(); // Saat komponen dimount

  window.addEventListener("userEmailChanged", updateEmail);

  return () => {
    window.removeEventListener("userEmailChanged", updateEmail);
  };
}, []);


  const handleLogout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('userEmail');
    window.dispatchEvent(new Event("userEmailChanged")); // 🧠 Notifikasi manual
  }
  alert("Anda telah berhasil logout!");
  router.push('/login');
};


  if (loading || !userEmail) return null; // ⛔ Jangan tampilkan navbar kalau belum login

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md px-4 py-5 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-600 dark:text-blue-400 hover:underline">
          DikaRamadani
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/gallery/show" className="text-gray-700 dark:text-gray-200 hover:text-blue-500">
            Gallery
          </Link>
          <Link href="/gallery/upload" className="text-gray-700 dark:text-gray-200 hover:text-blue-500">
            Tambah Foto
          </Link>
          {/* <Link href="/anime" className="text-gray-700 dark:text-gray-200 hover:text-blue-500">
            Anime
          </Link> */}
          <button
            onClick={handleLogout}
            className="text-red-600 hover:underline font-semibold transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

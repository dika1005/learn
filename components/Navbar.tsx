// components/Navbar.tsx
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    setUserEmail(email);
  }, []);

const handleLogout = () => {
    // Hapus email dari localStorage saat logout
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userEmail');
    }
    alert("Anda telah berhasil logout!"); // Pemberitahuan sederhana
    router.push('/login'); // Kembali ke halaman login
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md px-4 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-600 dark:text-blue-400 hover:underline">
          DikaStore
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/products/show" className="text-gray-700 dark:text-gray-200 hover:text-blue-500">
            Produk
          </Link>
          <Link href="/products/add" className="text-gray-700 dark:text-gray-200 hover:text-blue-500">
            Tambah Produk
          </Link>

          {userEmail && (
            <button
              onClick={handleLogout}
              className="text-red-600 hover:underline font-semibold transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

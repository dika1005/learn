"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import api from "@/lib/axios";

export default function Navbar() {
  const { user, loading, setUser } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await api.post("/logout");
    } catch (e) {
      console.error("Logout error:", e);
    } finally {
      setUser(null);
      router.push("/login");
    }
  };

  // Sembunyikan navbar kalau masih loading
  if (loading) return null;

  // Tampilkan minimal login button kalau belum login
  if (!user) {
    return (
      <nav className="bg-white shadow-md px-4 py-5 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link
            href="/"
            className="text-xl font-bold text-blue-600 hover:underline ml-20"
          >
            DikaRamadani
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </div>
        </div>
      </nav>
    );
  }

  // Tampilkan navbar lengkap kalau sudah login
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md px-4 py-5 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-xl font-bold text-blue-600 dark:text-blue-400 hover:underline ml-20"
        >
          DikaRamadani
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/gallery/show"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-500"
          >
            Gallery
          </Link>
          <Link
            href="/education/list"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-500"
          >
            Pendidikan
          </Link>

          {user?.email === "dikaramadan6@gmail.com" && (
            <>
              <Link
                href="/education/add"
                className="text-gray-700 dark:text-gray-200 hover:text-blue-500"
              >
                Tambah Pendidikan
              </Link>
              <Link
                href="/gallery/upload"
                className="text-gray-700 dark:text-gray-200 hover:text-blue-500"
              >
                Tambah Foto
              </Link>
            </>
          )}

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

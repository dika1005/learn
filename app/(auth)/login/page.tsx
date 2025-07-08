// app/auth/login/page.tsx
"use client";
import { useState, useEffect } from "react"; // Tambahkan useEffect
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // Redirect jika sudah login
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("userEmail")) {
      router.push("/");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  // Optional: Validasi kosong
  if (!email || !password) {
    alert("Isi email dan password dulu dong! 😤");
    return;
  }

  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert(data.message);

      // ✅ Simpan token & email ke localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("userEmail", data.user.email); // <- ini penting buat redirect

      // ✅ Redirect ke halaman utama
      router.push("/");
    } else {
      alert("Gagal login: " + data.message);
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("Terjadi kesalahan jaringan atau server.");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 font-sans text-gray-900 dark:text-white">
      <div className="relative z-10 bg-white dark:bg-gray-800 p-8 md:p-12 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 transform scale-95 hover:scale-100 ease-out max-w-md w-full border border-gray-100 dark:border-gray-700">
        {/* Background Blob/Shape - Ini hanya contoh, bisa diganti dengan SVG atau elemen dekoratif lainnya */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-purple-200 dark:bg-purple-800 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-pink-200 dark:bg-pink-800 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

        <h2 className="text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
          Selamat Datang Kembali
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@contoh.com"
              className="w-full px-5 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition duration-200 ease-in-out text-base"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Kata Sandi
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 8 karakter"
                className="w-full px-5 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-4 focus:ring-pink-200 dark:focus:ring-pink-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition duration-200 ease-in-out text-base pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-sm leading-5 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 ease-in-out"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Sembunyikan" : "Tampilkan"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition duration-300 ease-in-out transform hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-pink-700"
          >
            Masuk
          </button>
        </form>

        <p className="mt-8 text-center text-gray-600 dark:text-gray-400 text-base">
          Belum punya akun?{" "}
          <Link
            href="/register"
            className="text-purple-600 dark:text-purple-400 hover:text-pink-600 dark:hover:text-pink-400 hover:underline font-semibold transition-colors duration-200"
          >
            Daftar Sekarang
          </Link>
        </p>
      </div>
    </div>
  );
}

'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link' // Import Link

export default function RegisterPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const res = await fetch("/api/register", {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: { "Content-Type": "application/json" },
            });

            const data = await res.json();

            if (res.ok) {
                alert(data.message);
                router.push('/login'); // Arahkan ke halaman login setelah register berhasil
            } else {
                alert("Gagal: " + data.message);
            }
        } catch (error) {
            console.error('Register error:', error);
            alert('Terjadi kesalahan jaringan atau server.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 font-sans text-gray-900 dark:text-white">
            <div className="relative z-10 bg-white dark:bg-gray-800 p-8 md:p-12 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 transform scale-95 hover:scale-100 ease-out max-w-md w-full border border-gray-100 dark:border-gray-700">
                {/* Background Blob/Shape */}
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-teal-200 dark:bg-teal-800 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-500"></div>
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-blue-200 dark:bg-blue-800 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2500"></div>

                <h2 className="text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400">
                    Buat Akun Baru
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="nama@contoh.com"
                            className="w-full px-5 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-4 focus:ring-teal-200 dark:focus:ring-teal-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition duration-200 ease-in-out text-base"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kata Sandi</label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Min. 8 karakter"
                                className="w-full px-5 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition duration-200 ease-in-out text-base pr-12"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(v => !v)}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-sm leading-5 text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200 ease-in-out"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? 'Sembunyikan' : 'Tampilkan'}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white py-3 rounded-lg font-bold text-lg hover:from-teal-700 hover:to-blue-700 transition duration-300 ease-in-out transform hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-teal-300 dark:focus:ring-blue-700"
                    >
                        Daftar
                    </button>
                </form>

                <p className="mt-8 text-center text-gray-600 dark:text-gray-400 text-base">
                    Sudah punya akun?{' '}
                    {/* Perbaikan di sini: Hapus tag <a> */}
                    <Link href="/login" className="text-teal-600 dark:text-teal-400 hover:text-blue-600 dark:hover:text-blue-400 hover:underline font-semibold transition-colors duration-200">
                        Masuk di sini
                    </Link>
                </p>
            </div>
        </div>
    );
}
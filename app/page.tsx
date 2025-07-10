'use client'; // Penting: Ini adalah komponen klien karena menggunakan hooks dan localStorage
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Untuk navigasi dan redirect

export default function HomePage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Data Biodata Anda
  const biodata = {
    name: "Dika",
    profession: "Pengembang Web | Penggemar MongoDB",
    location: "Depok, Jawa Barat, Indonesia",
    about: "Seorang pengembang yang bersemangat dalam membangun aplikasi web modern dengan Next.js dan MongoDB. Selalu siap belajar hal baru dan menghadapi tantangan. Saya percaya pada kekuatan komunitas dan open-source.",
    // Anda bisa menambahkan link profil medsos di sini
    socialLinks: [
      { name: "GitHub", url: "https://github.com/your-github-username", icon: "/github.svg" }, // Ganti dengan username GitHub Anda
      { name: "LinkedIn", url: "https://linkedin.com/in/your-linkedin-username", icon: "/linkedin.svg" }, // Ganti dengan username LinkedIn Anda
    ]
  };

  // Efek untuk memeriksa status login dan mengambil email pengguna
  useEffect(() => {
    if (typeof window !== 'undefined') { // Pastikan kode berjalan di sisi klien (browser)
      const storedEmail = localStorage.getItem('userEmail');
      if (storedEmail) {
        setUserEmail(storedEmail);
      } else {
        // Jika tidak ada email di localStorage, berarti belum login, arahkan ke halaman login
        router.push('/login');
      }
      setLoading(false); // Selesai memuat
    }
  }, [router]); // Dependensi router agar useEffect berjalan jika router berubah



  // Tampilkan loading state saat data sedang diambil atau redirect sedang berlangsung
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-white">
        <p className="text-xl font-semibold animate-pulse">Memuat dashboard Anda...</p>
      </div>
    );
  }

  // Jika userEmail null (setelah loading selesai), berarti tidak login dan sudah diredirect di useEffect
  if (!userEmail) {
    return null; // Komponen tidak akan dirender karena sudah diredirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-white p-6 sm:p-8 md:p-12">
      {/* Header Dashboard */}
      <header className="flex flex-col sm:flex-row justify-between items-center mb-10 pb-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-4 sm:mb-0">
          Selamat Datang, {userEmail}!
        </h1>
      </header>

      {/* Main Content Area */}
      <main className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Biodata Card */}
        <section className="md:col-span-1 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col items-center mb-6">
            {/* Placeholder Avatar - Anda bisa mengganti ini dengan <Image> jika punya gambar profil */}
            <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white text-5xl font-bold mb-4 shadow-md">
              D
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{biodata.name}</h2>
            <p className="text-md text-gray-600 dark:text-gray-400">{biodata.profession}</p>
            <p className="text-sm text-gray-500 dark:text-gray-500">{biodata.location}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Tentang Saya</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{biodata.about}</p>
          </div>

          {biodata.socialLinks && biodata.socialLinks.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Terhubung</h3>
              <div className="flex gap-4 justify-center">
                {biodata.socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-200 shadow-sm"
                    aria-label={link.name}
                  >
                    {/* Menggunakan Image untuk ikon, pastikan file SVG ada di public/ */}
                    {link.icon ? (
                      <Image src={link.icon} alt={`${link.name} icon`} width={20} height={20} className="dark:invert" />
                    ) : (
                      link.name.substring(0, 1) // Fallback jika ikon tidak ada
                    )}
                  </a>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Dashboard Overview Cards (Placeholder untuk data aplikasi) */}
        <section className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Statistik Cepat */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Pengguna Aktif</h3>
            <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">1,234</p>
            <p className="text-sm text-gray-500 mt-2">Peningkatan 12% dari bulan lalu</p>
          </div>

          {/* Card 2: Proyek Selesai */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Proyek Selesai</h3>
            <p className="text-4xl font-bold text-green-600 dark:text-green-400">42</p>
            <p className="text-sm text-gray-500 mt-2">Total proyek yang telah selesai</p>
          </div>

          {/* Card 3: Notifikasi Baru */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Notifikasi Baru</h3>
            <p className="text-4xl font-bold text-yellow-600 dark:text-yellow-400">7</p>
            <p className="text-sm text-gray-500 mt-2">Perlu perhatian Anda</p>
          </div>

          {/* Card 4: Quick Links */}
          <div className="sm:col-span-2 lg:col-span-full bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Akses Cepat</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/settings" className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-200 text-center shadow-sm">
                <Image src="/settings-icon.svg" alt="Settings" width={30} height={30} className="mb-2 dark:invert" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Pengaturan</span>
              </Link>
              <Link href="/reports" className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-200 text-center shadow-sm">
                <Image src="/reports-icon.svg" alt="Laporan" width={30} height={30} className="mb-2 dark:invert" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Laporan</span>
              </Link>
              <Link href="/profile" className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-200 text-center shadow-sm">
                <Image src="/profile-icon.svg" alt="Profil" width={30} height={30} className="mb-2 dark:invert" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Profil</span>
              </Link>
              <Link href="/support" className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-200 text-center shadow-sm">
                <Image src="/support-icon.svg" alt="Dukungan" width={30} height={30} className="mb-2 dark:invert" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Dukungan</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Dashboard */}
      <footer className="mt-12 text-center text-gray-600 dark:text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} Aplikasi Dika. Semua Hak Dilindungi.</p>
        <p className="mt-2">Dibuat dengan ❤️ di {biodata.location.split(',')[0]}.</p>
      </footer>
    </div>
  );
}

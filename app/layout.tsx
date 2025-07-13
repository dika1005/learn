// app/layout.tsx
"use client"; // Ini harus tetap ada karena kita menggunakan usePathname

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css"; // Sesuaikan dengan lokasi CSS global Anda
import ClientNavbar from '@/components/ClientNavbar'; // Pastikan path ini benar
import { usePathname } from "next/navigation"; // Import usePathname

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Pastikan TIDAK ADA "export const metadata" di sini karena ini adalah "use client" component.
// Jika Anda masih melihat error "Ecmascript file had an error" terkait metadata,
// berarti baris ini masih ada di file Anda.

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); // Dapatkan jalur URL saat ini

  // Definisikan rute di mana navbar tidak akan ditampilkan
  const noNavbarRoutes = ["/login", "/register"];

  // Tentukan apakah navbar harus ditampilkan
  const showNavbar = !noNavbarRoutes.includes(pathname);

  return (
    // PASTIKAN TAG <html> dan <body> ini ada dan membungkus seluruh konten aplikasi Anda.
    // Jika error "Missing <html> and <body> tags" masih muncul,
    // maka ada masalah di sekitar struktur ini di file Anda.
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Render ClientNavbar hanya jika showNavbar adalah true */}
        {showNavbar && <ClientNavbar />}
        {children} {/* Ini akan merender konten halaman Anda */}
      </body>
    </html>
  );
}

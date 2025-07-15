// app/layout.tsx
"use client"; // Ini harus tetap ada karena kita menggunakan usePathname

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css"; // Sesuaikan dengan lokasi CSS global Anda
import ClientNavbar from "@/components/ClientNavbar"; // Pastikan path ini benar
import { usePathname } from "next/navigation"; // Import usePathname
import { UserProvider } from "@/context/UserContext";

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
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const noNavbarRoutes = ["/login", "/register"];
  const showNavbar = !noNavbarRoutes.includes(pathname);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserProvider>
          {showNavbar && <ClientNavbar />}
          {children}
        </UserProvider>
      </body>
    </html>
  );
}

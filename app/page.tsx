"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiDownload,
  FiArrowRight,
  FiGithub,
  FiLinkedin,
  FiMail,
} from "react-icons/fi";
import { useRouter } from "next/navigation";

// Data Proyek (lebih mudah dikelola)
const projects = [
  {
    title: "Aplikasi Posyandu",
    description:
      "Sistem informasi berbasis web untuk manajemen data Posyandu, memudahkan pencatatan dan pelaporan.",
    image: "/project-posyandu.png", // Ganti dengan path gambar proyek Anda
    tags: ["Next.js", "MongoDB", "Tailwind CSS"],
    githubLink: "https://github.com/dikaramadani/posyandu-app",
  },
  {
    title: "E-commerse Website toko online sepatu mang kus",
    description:
      "Aplikasi e-commerce untuk penjualan sepatu, dibangun menggunakan Laravel dan Tailwind CSS.",
    image: "/project-toko-sepatu.png", // Ganti dengan path gambar proyek Anda
    tags: ["Laravel", "Tailwind CSS", "MySQL"],
    githubLink: "https://github.com/dika1005/templates_mvc",
  },
];

export default function PortfolioPage() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Pastikan kode ini hanya berjalan di sisi klien
    if (typeof window !== "undefined") {
      const email = localStorage.getItem("userEmail");
      const token = localStorage.getItem("token");

      if (email && token) { // Periksa KEDUANYA: email dan token
        setUserEmail(email);
      } else {
        // Jika salah satu (atau keduanya) tidak ada, anggap belum login
        setUserEmail(null);
        // Redirect ke halaman login yang benar
        router.push("/login");
      }
    }
  }, [router]); // Tambahkan router sebagai dependensi

  // Varian animasi untuk Framer Motion
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  // Opsional: Tampilkan loading state atau null jika belum terautentikasi
  if (userEmail === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen font-sans">
      <main className="max-w-5xl mx-auto px-6 py-12 md:py-20">
        {/* Hero Section */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16 mb-24 md:mb-32"
        >
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold !leading-tight">
              Dika Ramadani
            </h1>
            <p className="mt-3 text-lg text-blue-600 dark:text-blue-400 font-medium">
              Web Developer | Mahasiswa Universitas Kuningan
            </p>
            <p className="mt-4 max-w-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Hallo, Nama saya Dika Ramadani, seorang web developer yang
              berfokus pada pengembangan aplikasi web modern dan responsif.
              Saya memiliki pengalaman dalam menggunakan teknologi seperti Next.js,
              React, dan Tailwind CSS untuk menciptakan pengalaman pengguna yang
              menarik dan fungsional.
              
            </p>
            <div className="mt-8 flex justify-center md:justify-start gap-4">
              <a
                href="/CV-DikaRamadani.pdf"
                download
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
              >
                <FiDownload /> Download CV
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all border border-gray-200 dark:border-gray-700"
              >
                Hubungi Saya <FiArrowRight />
              </a>
            </div>
          </div>
          <div className="flex-shrink-0">
            <Image
              src="/foto-dika.jpg" // Ganti dengan path foto Anda
              alt="Foto Profil Dika Ramadani"
              width={200}
              height={200}
              quality={95}
              priority
              className="rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-2xl"
            />
          </div>
        </motion.header>

        {/* Keahlian */}
        <motion.section
          id="skills"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeIn}
          className="mb-24 md:mb-32"
        >
          <h2 className="text-3xl font-bold text-center mb-10">
            Keahlian Teknologi
          </h2>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {[
              "Next.js",
              "React",
              "MongoDB",
              "Tailwind CSS",
              "TypeScript",
              "JavaScript",
              "Node.js",
              "Git",
              "Figma",
            ].map((skill) => (
              <div
                key={skill}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-5 py-2 rounded-full text-sm font-medium text-gray-700 dark:text-gray-200 shadow-sm transition-transform hover:-translate-y-1"
              >
                {skill}
              </div>
            ))}
          </div>
        </motion.section>

        {/* Proyek Terpilih */}
        <motion.section
          id="projects"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
          className="mb-24 md:mb-32"
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            Proyek Terpilih
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800/50 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 transition-all hover:shadow-2xl hover:-translate-y-1"
                variants={fadeIn}
              >
                <Image
                  src={project.image}
                  alt={`Screenshot Proyek ${project.title}`}
                  width={600}
                  height={350}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 text-xs font-medium px-2.5 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={project.githubLink}
                    target="_blank"
                    className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-sm hover:underline"
                  >
                    Lihat di GitHub <FiArrowRight />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Kontak */}
        <motion.section
          id="contact"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeIn}
          className="text-center bg-gray-100 dark:bg-gray-800/50 p-8 md:p-16 rounded-2xl"
        >
          <h2 className="text-3xl font-bold mb-4">Mari Terhubung!</h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 mb-8">
            Saya selalu terbuka untuk diskusi, kolaborasi, atau sekadar menyapa.
            Jangan ragu untuk menghubungi saya melalui platform di bawah ini.
          </p>
          <div className="flex justify-center flex-wrap gap-6 text-2xl">
            <a
              href="mailto:dikabangkok21@gmail.com"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <FiMail />
              <span className="text-base font-medium">
              dikabangkok21@gmail.com
              </span>
            </a>
            <a
              href="https://github.com/dika1005"
              target="_blank"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <FiGithub />
              <span className="text-base font-medium">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/dika-ramadani-41356b340/"
              target="_blank"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <FiLinkedin />
              <span className="text-base font-medium">LinkedIn</span>
            </a>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 dark:text-gray-400 py-8 border-t border-gray-200 dark:border-gray-800">
        © {new Date().getFullYear()} Dika Ramadani. Dibuat dengan ❤️ di
        Pemalang.
      </footer>
    </div>
  );
}

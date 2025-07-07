# 🚀 Aplikasi Next.js Keren

<div align="center">
    <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <br />
    <img src="https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge" alt="Status" />
    <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="License" />
    <img src="https://img.shields.io/badge/Version-1.0.0-orange?style=for-the-badge" alt="Version" />
</div>

<br />

<div align="center">
    <h1>🎯 Aplikasi Web Full-Stack Modern</h1>
    <h3>✨ Dibangun dengan Next.js 15, TypeScript, dan MongoDB</h3>
    <p>🔥 Fitur autentikasi, desain responsif, dan komponen UI yang indah</p>
    
    <br />
    
    <img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png" alt="line" />
</div>

---

## 📋 Daftar Isi

- [🚀 Mulai Cepat](#-mulai-cepat)
- [✨ Fitur](#-fitur)
- [🛠️ Teknologi](#️-teknologi)
- [📁 Struktur Proyek](#-struktur-proyek)
- [🎯 Pelajari Lebih Lanjut](#-pelajari-lebih-lanjut)
- [🚀 Deploy](#-deploy)

## 🚀 Mulai Cepat

### Prasyarat

Pastikan Node.js 18+ sudah terpasang di komputer Anda.

### Instalasi

1. **Clone repositori**
     ```bash
     git clone <url-repo-anda>
     cd learn
     ```

2. **Instal dependensi**
     ```bash
     npm install
     # atau
     yarn install
     # atau
     pnpm install
     # atau
     bun install
     ```

3. **Atur variabel lingkungan**
     ```bash
     cp .env.example .env.local
     # Tambahkan string koneksi MongoDB dan variabel lain yang diperlukan
     ```

4. **Jalankan server pengembangan**
     ```bash
     npm run dev
     # atau
     yarn dev
     # atau
     pnpm dev
     # atau
     bun dev
     ```

5. **Buka browser Anda**
     
     Kunjungi [http://localhost:3000](http://localhost:3000) untuk melihat aplikasi Anda! 🎉

## ✨ Fitur

<div align="center">
    <table>
        <tr>
            <td align="center">
                <h3>🔐 Autentikasi</h3>
                <p>Sistem login & registrasi aman dengan manajemen sesi</p>
            </td>
            <td align="center">
                <h3>📱 Desain Responsif</h3>
                <p>Bekerja sempurna di desktop, tablet, dan perangkat mobile</p>
            </td>
        </tr>
        <tr>
            <td align="center">
                <h3>🎨 UI Modern</h3>
                <p>Antarmuka bersih dan intuitif dengan Tailwind CSS</p>
            </td>
            <td align="center">
                <h3>🚀 Performa Cepat</h3>
                <p>Dioptimalkan dengan Next.js 15 untuk loading super cepat</p>
            </td>
        </tr>
        <tr>
            <td align="center">
                <h3>💾 Integrasi Database</h3>
                <p>MongoDB untuk penyimpanan dan pengambilan data efisien</p>
            </td>
            <td align="center">
                <h3>🔧 TypeScript</h3>
                <p>Pengembangan type-safe dengan kualitas kode lebih baik</p>
            </td>
        </tr>
    </table>
</div>

### 🎯 Sorotan Utama

- ✅ **Server-Side Rendering** - SEO-friendly dengan kemampuan SSR
- ✅ **API Routes** - Endpoint API bawaan untuk backend
- ✅ **Arsitektur Komponen** - Komponen UI yang reusable dan mudah dirawat
- ✅ **Hot Reloading** - Update instan saat pengembangan
- ✅ **Code Splitting** - Optimasi otomatis untuk performa lebih baik
- ✅ **Integrasi ESLint** - Menjaga kualitas dan konsistensi kode

## 🛠️ Teknologi

| Teknologi | Kegunaan |
|-----------|----------|
| **Next.js 15** | Framework React untuk produksi |
| **TypeScript** | JavaScript type-safe |
| **MongoDB** | Database NoSQL |
| **Tailwind CSS** | Framework CSS utility-first |
| **ESLint** | Linting dan format kode |

## 📁 Struktur Proyek

```
learn/
├── 📂 app/
│   ├── 📂 (auth)/
│   │   ├── 📂 login/
│   │   └── 📂 register/
│   ├── 📂 api/
│   │   └── 📂 (auth)/
│   ├── 📄 layout.tsx
│   └── 📄 page.tsx
├── 📂 components/
├── 📂 lib/
│   └── 📄 mongodb.ts
├── 📂 public/
└── 📋 File konfigurasi
```

## 🎯 Pelajari Lebih Lanjut

Perluas pengetahuan Anda dengan sumber berikut:

- 📚 [**Dokumentasi Next.js**](https://nextjs.org/docs) - Panduan lengkap fitur & API Next.js
- 🎓 [**Belajar Next.js**](https://nextjs.org/learn) - Tutorial interaktif untuk menguasai Next.js
- 💬 [**GitHub Next.js**](https://github.com/vercel/next.js) - Bergabung dan berkontribusi di komunitas!
- 🎨 [**Dokumentasi Tailwind CSS**](https://tailwindcss.com/docs) - Pelajari CSS utility-first
- 🍃 [**Dokumentasi MongoDB**](https://docs.mongodb.com/) - Kuasai database dokumen

## 🚀 Deploy

### Deploy di Vercel (Rekomendasi)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)

Cara termudah untuk deploy aplikasi Next.js Anda adalah menggunakan [Platform Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) dari pembuat Next.js.

### Opsi Deploy Lain

- 🌐 **Netlify** - Hosting situs statis yang mudah
- ☁️ **AWS** - Infrastruktur cloud yang skalabel  
- 🐳 **Docker** - Deploy dengan container
- 🔄 **GitHub Pages** - Hosting situs statis gratis

📖 Lihat [dokumentasi deploy Next.js](https://nextjs.org/docs/app/building-your-application/deploying) untuk instruksi lengkap.

---

<div align="center">
    <img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png" alt="line" />
    <br />
    <h3>💻 Pengembangan & Kontribusi</h3>
    <br />
</div>

## 🤝 Kontribusi

Kontribusi sangat diterima! Ikuti langkah berikut:

1. **Fork repositori**
2. **Buat branch fitur** (`git checkout -b fitur/fitur-keren`)
3. **Commit perubahan Anda** (`git commit -m 'Tambah fitur keren'`)
4. **Push ke branch** (`git push origin fitur/fitur-keren`)
5. **Buka Pull Request**

## 📊 Statistik Proyek

<div align="center">
    <img src="https://img.shields.io/github/stars/your-username/learn?style=for-the-badge" alt="Stars" />
    <img src="https://img.shields.io/github/forks/your-username/learn?style=for-the-badge" alt="Forks" />
    <img src="https://img.shields.io/github/issues/your-username/learn?style=for-the-badge" alt="Issues" />
    <img src="https://img.shields.io/github/license/your-username/learn?style=for-the-badge" alt="License" />
</div>

## 🔧 Skrip

| Skrip | Deskripsi |
|-------|-----------|
| `npm run dev` | Jalankan server pengembangan |
| `npm run build` | Build untuk produksi |
| `npm run start` | Jalankan server produksi |
| `npm run lint` | Jalankan ESLint |
| `npm run lint:fix` | Perbaiki masalah ESLint |

## 🌟 Roadmap

- [ ] Tambah profil & pengaturan pengguna
- [ ] Implementasi notifikasi real-time
- [ ] Tambah fitur upload file
- [ ] Buat dashboard admin
- [ ] Tambah toggle tema gelap/terang
- [ ] Implementasi fitur pencarian
- [ ] Tambah verifikasi email
- [ ] Buat versi aplikasi mobile

---

<div align="center">
    <p>Dibuat dengan ❤️ dan ☕</p>
    <p>⭐ Beri bintang repo ini jika Anda merasa terbantu!</p>
    <br />
    <img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png" alt="line" />
</div>

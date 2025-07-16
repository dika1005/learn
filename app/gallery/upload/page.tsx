"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// ✨ Komponen ikon sederhana untuk loading spinner dan upload
const SpinnerIcon = () => (
  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const UploadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
  </svg>
);


export default function UploadGalleryPage() {
  const router = useRouter();
  
  // ✨ State dipisah agar lebih mudah dikelola
  const [isAdminCheck, setIsAdminCheck] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "", // Base64 string for preview
    tags: "",
    takenAt: "",
  });
  const [fileName, setFileName] = useState("");

  // Logic admin check tidak berubah, hanya state loading yang di-improve
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        // ✨ Sebaiknya email admin disimpan di environment variable (.env)
        const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "dikaramadan6@gmail.com";
        const res = await fetch("/api/me");
        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        if (data.user.email !== ADMIN_EMAIL) {
          alert("Kamu tidak diizinkan mengakses halaman ini!");
          router.push("/gallery/show");
        } else {
          setIsAdminCheck(false); // Admin valid, tampilkan form
        }
      } catch {
        alert("Gagal validasi user. Login dulu ya!");
        router.push("/login");
      }
    };

    checkAdmin();
  }, [router]);

  // ✨ Satu handler untuk semua input teks, lebih efisien
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, image: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const payload = {
      ...form,
      tags: form.tags.split(",").map((tag) => tag.trim()).filter(tag => tag), // Filter tag kosong
    };
    
    try {
      const res = await fetch("/api/gallery/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Server gagal memproses permintaan.");
      }

      // Berhasil, redirect ke galeri
      router.push("/gallery/show");

    } catch (err) {
      setError("Gagal mengupload foto. Silakan coba lagi nanti.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✨ UI Loading state yang lebih baik
  if (isAdminCheck) {
    return (
      <div className="flex items-center justify-center h-screen">
        <SpinnerIcon />
        <span className="text-lg text-gray-600">Memverifikasi akses...</span>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            Upload Foto ke Galeri
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            Bagikan momen terbaikmu dengan deskripsi yang menarik.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            {/* ✨ Input dengan Label */}
            <div className="mb-4">
              <label htmlFor="title" className="font-medium text-gray-700">Judul Foto</label>
              <input
                id="title"
                name="title"
                type="text"
                value={form.title}
                onChange={handleChange}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="cth: Senja di Ufuk Barat"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="font-medium text-gray-700">Deskripsi</label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Ceritakan tentang foto ini..."
              />
            </div>

            {/* ✨ File Input yang lebih elegan */}
            <div className="mb-4">
              <label className="font-medium text-gray-700">Pilih Gambar</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /></svg>
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                      <span>Upload sebuah file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageChange} required />
                    </label>
                    <p className="pl-1">atau seret dan lepas</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF hingga 10MB</p>
                  {fileName && <p className="text-sm text-green-600 pt-2 font-semibold">{fileName}</p>}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label htmlFor="tags" className="font-medium text-gray-700">Tags</label>
                    <input
                        id="tags"
                        name="tags"
                        type="text"
                        value={form.tags}
                        onChange={handleChange}
                        className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="alam, senja, pantai (pisahkan koma)"
                    />
                </div>
                <div>
                    <label htmlFor="takenAt" className="font-medium text-gray-700">Waktu Pengambilan</label>
                    <input
                        id="takenAt"
                        name="takenAt"
                        type="datetime-local"
                        value={form.takenAt}
                        onChange={handleChange}
                        className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
            </div>
          </div>
          
          {/* ✨ Pesan Error Inline */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isSubmitting || !form.image}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <SpinnerIcon />
                  Menyimpan...
                </>
              ) : (
                <>
                  <UploadIcon />
                  Simpan ke Galeri
                </>
              )}
            </button>
          </div>
        </form>

        {form.image && (
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 text-center mb-4">Preview Gambar</h3>
            <div className="w-full overflow-hidden rounded-lg shadow-md">
                <Image
                    src={form.image}
                    alt="Preview"
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover"
                />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
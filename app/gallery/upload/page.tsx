"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function UploadGalleryPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    tags: "",
    takenAt: "",
  });

  // ✅ Ganti logic admin check
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await fetch("/api/me");
        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        if (data.user.email !== "dikaramadan6@gmail.com") {
          alert("Kamu tidak diizinkan mengakses halaman ini!");
          router.push("/gallery/show");
        } else {
          setChecking(false); // ✔️ Admin valid, boleh akses
        }
      } catch {
        alert("Gagal validasi user. Login dulu ya!");
        router.push("/login");
      }
    };

    checkAdmin();
  }, [router]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, image: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...form,
      tags: form.tags.split(",").map((tag) => tag.trim()),
    };

    const res = await fetch("/api/gallery/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push("/gallery/show");
    } else {
      alert("Gagal upload foto 😭");
    }
  };

  if (checking) return null;

  return (
    <div className="max-w-xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Upload Foto ke Galeri</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Form Inputs */}
        <input
          type="text"
          placeholder="Judul"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full border px-4 py-2 rounded"
          required
        />

        <textarea
          placeholder="Deskripsi"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full border px-4 py-2 rounded"
          rows={3}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full"
          required
        />

        <input
          type="text"
          placeholder="Tags (pisahkan dengan koma)"
          value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
          className="w-full border px-4 py-2 rounded"
        />

        <input
          type="datetime-local"
          value={form.takenAt}
          onChange={(e) => setForm({ ...form, takenAt: e.target.value })}
          className="w-full border px-4 py-2 rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Simpan ke Galeri
        </button>
      </form>

      {form.image && (
        <div className="mt-6">
          <Image
            src={form.image}
            alt="Preview"
            className="w-full rounded shadow"
            width={800}
            height={600}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      )}
    </div>
  );
}

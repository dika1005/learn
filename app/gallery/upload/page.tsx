"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UploadGalleryPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    tags: "",
    takenAt: "",
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, image: reader.result as string });
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

  return (
    <div className="max-w-xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Upload Foto ke Galeri</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
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
          <p className="text-sm text-gray-500 mb-1">Preview:</p>
          <img src={form.image} alt="Preview" className="w-full rounded shadow" />
        </div>
      )}
    </div>
  );
}

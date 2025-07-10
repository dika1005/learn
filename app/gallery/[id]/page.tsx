"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Comment = {
  id: string;
  user: string;
  message: string;
  createdAt: string;
};

type Gallery = {
  id: string;
  title: string;
  description: string;
  image: string;
  takenAt: string;
  tags: string[];
};

export default function GalleryDetailPage() {
  const { id } = useParams();
  const [gallery, setGallery] = useState<Gallery | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/gallery/${id}`)
      .then((res) => res.json())
      .then(setGallery);

    fetch(`/api/gallery/${id}/comment`)
      .then((res) => res.json())
      .then(setComments);
  }, [id]);

  if (!gallery) return <p className="text-center mt-10">Loading galeri...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">{gallery.title}</h1>
      <p className="text-gray-600 mb-4">{gallery.description}</p>

      {gallery.image && (
        <img
          src={gallery.image}
          alt={gallery.title}
          className="rounded-xl shadow-lg object-cover mb-6 w-full max-h-[500px]"
        />
      )}

      <p className="text-sm text-gray-500 mb-6">
        Diambil: {new Date(gallery.takenAt).toLocaleDateString("id-ID")}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {gallery.tags.map((tag) => (
          <span
            key={tag}
            className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-3">Komentar</h2>
      {comments.length === 0 ? (
        <p className="text-gray-500">Belum ada komentar.</p>
      ) : (
        <ul className="space-y-4 mb-6">
          {comments.map((comment) => (
            <li key={comment.id} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <p className="font-semibold">{comment.user}</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">{comment.message}</p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(comment.createdAt).toLocaleString("id-ID")}
              </p>
            </li>
          ))}
        </ul>
      )}

      <h2 className="text-xl font-semibold mt-10 mb-3">Tulis Komentar</h2>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const user = (form.elements.namedItem("user") as HTMLInputElement).value;
          const message = (form.elements.namedItem("message") as HTMLInputElement).value;

          if (!user || !message) {
            alert("Isi nama dan komentar dulu ya 😤");
            return;
          }

          const res = await fetch(`/api/gallery/${id}/comment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user, message }),
          });

          if (res.ok) {
            const newComment = await res.json();
            setComments((prev) => [newComment, ...prev]);
            form.reset();
          } else {
            alert("Gagal mengirim komentar!");
          }
        }}
        className="space-y-4"
      >
        <input
          type="text"
          name="user"
          placeholder="Nama kamu"
          className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
        <textarea
          name="message"
          placeholder="Tulis komentarnya..."
          rows={4}
          className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Kirim Komentar
        </button>
      </form>
    </div>
  );
}

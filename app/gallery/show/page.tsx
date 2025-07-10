"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  takenAt: string;
}

export default function GalleryPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      const res = await fetch("/api/gallery/show");
      const data = await res.json();
      setGallery(data);
      setLoading(false);
    };

    fetchGallery();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl animate-pulse">Memuat galeri...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Galeri Pribadi</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {gallery.map((item) => (
          <Link key={item.id} href={`/gallery/${item.id}`}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition overflow-hidden cursor-pointer">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-56 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-sm text-gray-500 mb-1">
                  {new Date(item.takenAt).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                  {item.description}
                </p>
                {item.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {item.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 text-xs px-2 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

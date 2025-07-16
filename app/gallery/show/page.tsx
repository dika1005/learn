"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

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
        <p className="text-xl animate-pulse text-gray-600 dark:text-gray-300">
          Memuat galeri...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-700 dark:text-indigo-300">
        🖼️ Galeri Pribadi
      </h1>

      {gallery.length === 0 ? (
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded text-center font-medium">
          Belum ada foto yang diunggah.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {gallery.map((item) => (
            <Link key={item.id} href={`/gallery/${item.id}`} className="block">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition duration-200 overflow-hidden border border-gray-200 dark:border-gray-700">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={600}
                  height={224}
                  className="w-full h-56 object-cover"
                  priority
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                    {item.title}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(item.takenAt).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 line-clamp-2">
                    {item.description}
                  </p>
                  {item.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-100 text-xs px-2 py-1 rounded-full"
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
      )}
    </div>
  );
}

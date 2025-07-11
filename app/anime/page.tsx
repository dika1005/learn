"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface AnimeItem {
  title: string;
  episode: string;
  link: string;
  image: string;
  type: "ongoing" | "complete";
}

export default function AnimePage() {
  const [ongoing, setOngoing] = useState<AnimeItem[]>([]);
  const [complete, setComplete] = useState<AnimeItem[]>([]);

  useEffect(() => {
    fetch("/api/anime/ongoing")
      .then((res) => res.json())
      .then(setOngoing);

    fetch("/api/anime/complete")
      .then((res) => res.json())
      .then(setComplete);
  }, []);

  return (
    <div className="p-6 space-y-10">
      <Section title="📺 Anime Ongoing" data={ongoing} />
      <Section title="✅ Anime Complete" data={complete} />
    </div>
  );
}

function Section({ title, data }: { title: string; data: AnimeItem[] }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.map((anime, i) => (
          <Link
            key={i}
            href={`/anime/${anime.link.split("/").filter(Boolean).pop()}`} // ambil slug dari URL
            className="rounded-xl overflow-hidden shadow hover:shadow-xl transition duration-300 bg-white"
          >
            <Image
              src={anime.image}
              alt={anime.title}
              width={400}
              height={225}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 space-y-1">
              <h3 className="text-lg font-semibold">{anime.title}</h3>
              <p className="text-sm text-gray-500">{anime.episode}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

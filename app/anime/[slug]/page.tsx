import { Metadata } from "next";
import Image from "next/image";

type AnimeDetail = {
  title: string;
  slug: string;
  image: string;
  datePublished: string;
  dateUpdated: string;
  author: string;
  info: {
    alternatif: string;
    episodeCount: number;
    season: string;
    airing: string;
    studio: string;
    duration: string;
    genre: string[];
    score: number;
    credit: string;
  };
  sinopsis: string[];
  episodes: {
    episode: string;
    fansub: string;
    downloads: {
      quality: string;
      size: string;
      links: {
        host: string;
        url: string;
      }[];
    }[];
  }[];
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const titleFromSlug = decodeURIComponent(params.slug).replace(/-/g, " ");
  return {
    title: `Detail Anime: ${titleFromSlug}`,
  };
}



async function getDetail(slug: string): Promise<AnimeDetail | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/anime/detail?url=https://meownime.ltd/${slug}/`,
    { cache: "no-store" }
  );
  if (!res.ok) return null;
  return res.json();
}

export default async function AnimeDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const detail = await getDetail(params.slug);

  if (!detail)
    return <div className="text-red-500">Gagal memuat detail anime! 😡</div>;

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">{detail.title}</h1>

      <Image
        src={detail.image}
        alt={detail.title}
        width={800}
        height={450}
        className="rounded-xl shadow-md"
      />

      <p className="text-sm text-gray-500">
        Dipublikasikan: {new Date(detail.datePublished).toLocaleDateString()}{" "}
        oleh {detail.author}
      </p>

      {/* Sinopsis */}
      <section>
        <h2 className="text-xl font-semibold">Sinopsis</h2>
        {detail.sinopsis.map((p, i) => (
          <p key={i} className="mt-2 text-justify">
            {p}
          </p>
        ))}
      </section>

      {/* Informasi */}
      <section>
        <h2 className="text-xl font-semibold">Informasi Anime</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Judul Alternatif:</strong> {detail.info.alternatif}
          </li>
          <li>
            <strong>Jumlah Episode:</strong> {detail.info.episodeCount}
          </li>
          <li>
            <strong>Musim:</strong> {detail.info.season}
          </li>
          <li>
            <strong>Tayang:</strong> {detail.info.airing}
          </li>
          <li>
            <strong>Studio:</strong> {detail.info.studio}
          </li>
          <li>
            <strong>Durasi:</strong> {detail.info.duration}
          </li>
          <li>
            <strong>Genre:</strong> {detail.info.genre.join(", ")}
          </li>
          <li>
            <strong>Score:</strong> {detail.info.score}
          </li>
          <li>
            <strong>Credit:</strong> {detail.info.credit}
          </li>
        </ul>
      </section>

      {/* Download List */}
      <section>
        <h2 className="text-xl font-semibold">Download Episode</h2>
        {detail.episodes.map((ep) => (
          <div key={ep.episode} className="border-t pt-4 mt-4">
            <h3 className="text-lg font-bold">
              Episode {ep.episode} – {ep.fansub}
            </h3>
            {ep.downloads.map((dl, i) => (
              <div key={i} className="mt-2">
                <p>
                  <strong>{dl.quality}</strong>{" "}
                  <span className="text-sm text-gray-500">({dl.size})</span>
                </p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {dl.links.map((link, j) => (
                    <a
                      key={j}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                    >
                      {link.host}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </section>
    </main>
  );
}

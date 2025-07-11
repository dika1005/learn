import { NextRequest } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";


export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const targetUrl = searchParams.get("url");

  if (!targetUrl) {
    return Response.json({ error: "URL tidak valid 😤" }, { status: 400 });
  }

  try {
    const { data } = await axios.get<string>(targetUrl);
    const $ = cheerio.load(data);

    const title = $("h1.entry-title").text().trim();
    const datePublished = $("time.published").attr("datetime") || "";
    const dateUpdated = $("time.updated").attr("datetime") || "";
    const author = $(".author.vcard").text().trim();

    const infoList: Record<string, string> = {};
    $(".mb-33 li").each((_, el) => {
      const label = $(el).find("strong").text().replace(" :", "").trim();
      const value = $(el)
        .contents()
        .filter((_, c) => c.type === "text")
        .text()
        .trim();
      if (label && value) infoList[label] = value;
    });

    const genres = (infoList["Genre"] || "").split(",").map((g) => g.trim());
    const score = parseFloat(infoList["Skor di MyAnimeList"] || "0");

    const sinopsis: string[] = [];
    $(".entry-content .mb-33 p").each((_, el) => {
      sinopsis.push($(el).text().trim());
    });

    type DownloadLink = { host: string; url: string };
    type Download = { quality: string; size: string; links: DownloadLink[] };
    type Episode = { episode: string; fansub: string; downloads: Download[] };
    const episodes: Episode[] = [];

    $("td[id]").each((_, el) => {
      const episode = $(el).attr("id") || "";
      const fansub =
        $(el)
          .find("span b")
          .text()
          .split("Episode")[1]
          ?.split("—")[1]
          ?.trim() || "";
      const downloads: Download[] = [];

      let next = $(el).parent().next();
      while (
        next.length &&
        !next.find("td[id]").length &&
        !next.find("td[id^='0']").length
      ) {
        const quality = next.find("td").first().text().split("|")[0].trim();
        const sizeMatch = next.find("td i").text().trim();
        const links: DownloadLink[] = [];

        next.find("a").each((_, a) => {
          const host = $(a).text().trim();
          const url = $(a).attr("href") || "";
          links.push({ host, url });
        });

        if (quality && links.length) {
          downloads.push({ quality, size: sizeMatch, links });
        }

        next = next.next();
      }

      episodes.push({ episode, fansub, downloads });
    });

  const image =
    $("meta[property='og:image']").attr("content") ||
    $("img.single-featured.wp-post-image").attr("src") ||
    "";

  return Response.json({
    title,
    slug: targetUrl.split("/").filter(Boolean).pop() || "",
    image,
    link: targetUrl,
    datePublished,
    dateUpdated,
    author,
    info: {
      alternatif: infoList["Judul Alternatif"] || "",
      episodeCount: parseInt(infoList["Jumlah Episode"] || "0"),
      season: infoList["Musim Rilis"] || "",
      airing: infoList["Tanggal Tayang"] || "",
      studio: infoList["Studio yang Memproduksi"] || "",
      duration: infoList["Durasi per Episode"] || "",
      genre: genres,
      score,
      credit: infoList["Credit"] || "",
    },
    sinopsis,
    episodes,
  });
  } catch (err) {
    console.error(err);
    return Response.json(
      { error: "Gagal mengambil detail anime 😡" },
      { status: 500 }
    );
  }
}

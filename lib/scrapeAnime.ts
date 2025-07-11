// lib/scrapeAnime.ts
import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeHomepage() {
  try {
    const { data } = await axios.get<string>("https://meownime.ltd", { responseType: "text" });
    const $ = cheerio.load(data);

    interface Anime { title: string; episode: string; image: string; link: string; type: "ongoing" | "complete"; }
    const ongoing: Anime[] = [];
    const complete: Anime[] = [];

    $("article.meownime.post").each((_, el) => {
      const el$ = $(el);
      const link = el$.find("a").first().attr("href") || "";
      const slug = link.split("/").filter(Boolean).pop() || "";
      const title = el$.find(".entry-title.title-font a").text().trim();
      const img = el$.find("img").attr("src") || "";
      const episodeText = el$.find(".postedon").text().trim(); // e.g. "Episode 02" or contains score for complete
      const isComplete = el$.hasClass("status-completed") || el$.hasClass("status-complete") || episodeText.match(/\d\.\d\d/);
      const type = isComplete ? "complete" : "ongoing";

      ongoing.push({ title, episode: episodeText, image: img, link: `/anime/${slug}`, type });
      if (type === "complete") {
        complete.push({ title, episode: episodeText, image: img, link: `/anime/${slug}`, type });
      }
    });

    // filter proper arrays
    const ongoingArr = ongoing.filter(a => a.type === "ongoing");
    const completeArr = ongoing.filter(a => a.type === "complete" || complete.includes(a));

    return { ongoing: ongoingArr, complete: completeArr };
  } catch (err) {
    console.error("⚠️ Gagal scraping homepage:", err);
    return { ongoing: [], complete: [] };
  }
}

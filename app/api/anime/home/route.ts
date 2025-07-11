import { scrapeHomepage } from "@/lib/scrapeAnime";
export async function GET() {
  const semua = await scrapeHomepage();
  console.log("🧪 Scraped Result:", semua);
  return Response.json(semua);
}

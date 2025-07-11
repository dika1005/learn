import { scrapeHomepage } from "@/lib/scrapeAnime";

export async function GET() {
  const semua = await scrapeHomepage();
  const { ongoing, complete } = semua;

  return Response.json({ ongoing, complete });
}

import { scrapeHomepage } from "@/lib/scrapeAnime";
export async function GET() {
  const { complete } = await scrapeHomepage();
  return Response.json(complete);
}
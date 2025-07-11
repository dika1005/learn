import { scrapeHomepage } from "@/lib/scrapeAnime";
export async function GET() {
  const { ongoing } = await scrapeHomepage();
  return Response.json(ongoing);
}

export const runtime = "nodejs";

export async function GET() {
  const hasDB = !!process.env.DATABASE_URL;
  const partial = process.env.DATABASE_URL
    ? process.env.DATABASE_URL.slice(0, 25) + "..."
    : null;

  return Response.json({
    DATABASE_URL_PRESENT: hasDB,
    PREVIEW: partial,
  });
}

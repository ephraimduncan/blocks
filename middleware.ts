import { type NextRequest, NextResponse } from "next/server";
import { blocksMetadata } from "./content/blocks-metadata";

const blockToCategory = new Map(
  blocksMetadata.map((b) => [b.id, b.category])
);

export function middleware(request: NextRequest) {
  const slug = request.nextUrl.pathname.slice(1);
  const category = blockToCategory.get(slug);
  if (category) {
    const url = request.nextUrl.clone();
    url.pathname = `/${category}/${slug}`;
    return NextResponse.rewrite(url);
  }
}

export const config = {
  matcher: [
    "/((?!_next|api|r|blocks|ingest|favicon\\.ico|.*\\..*).*)",
  ],
};

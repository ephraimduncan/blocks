import Link from "next/link";

export function ProductHuntBanner() {
  return (
    <Link
      href="https://www.producthunt.com/products/blocks-so"
      target="_blank"
      rel="noopener noreferrer"
      className="sticky top-0 z-50 flex w-full items-center justify-center gap-2 bg-[#ff6154] px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-[#e5574b]"
    >
      Blocks launched on Product Hunt. Please Upvote!
    </Link>
  );
}

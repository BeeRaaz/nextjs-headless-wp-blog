import Container from "@/components/layout/container";
import BlogCard from "@/components/layout/blog-card";
import { getPaginatedPosts } from "@/lib/wp-client";
import type { Metadata } from "next";
import Link from "next/link";

export const revalidate = 300;
const POSTS_PER_PAGE = 6;

export const metadata: Metadata = {
  title: "Articles",
  description: "Browse all travel stories from The Roam Report.",
};

type ArticlesPageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function ArticlesPage({ searchParams }: ArticlesPageProps) {
  const params = await searchParams;
  const currentPage = Number(params.page || "1");
  const safePage = Number.isNaN(currentPage) || currentPage < 1 ? 1 : currentPage;

  // Fail gracefully so the page still renders a helpful state if WP is temporarily unavailable.
  const { posts, totalPages } = await getPaginatedPosts(safePage, POSTS_PER_PAGE).catch(() => ({
    posts: [],
    total: 0,
    totalPages: 0,
  }));

  const prevPage = safePage > 1 ? safePage - 1 : null;
  const nextPage = safePage < totalPages ? safePage + 1 : null;

  return (
    <section className="bg-background-02 py-20 text-foreground lg:min-h-screen">
      <Container>
        <h1 className="mb-10 text-center text-[32px] font-semibold leading-[120%] tracking-[-0.05em] md:text-5xl">
          All Articles
        </h1>

        {posts.length > 0 ? (
          <>
            <ul className="mx-auto mb-10 grid max-w-[760px] grid-cols-1 gap-5 md:grid-cols-2">
              {posts.map((post) => (
                <li key={post.id}>
                  <BlogCard post={post} />
                </li>
              ))}
            </ul>

            {/* Server-rendered pagination keeps URLs crawlable and shareable. */}
            <nav aria-label="Pagination" className="flex items-center justify-center gap-5 text-base">
              {prevPage ? (
                <Link
                  href={`/articles?page=${prevPage}`}
                  className="text-foreground underline underline-offset-2 hover:no-underline"
                >
                  Previous
                </Link>
              ) : (
                <span className="text-foreground-04">Previous</span>
              )}
              <span className="text-foreground-04">
                Page {safePage} of {totalPages || 1}
              </span>
              {nextPage ? (
                <Link
                  href={`/articles?page=${nextPage}`}
                  className="text-foreground underline underline-offset-2 hover:no-underline"
                >
                  Next
                </Link>
              ) : (
                <span className="text-foreground-04">Next</span>
              )}
            </nav>
          </>
        ) : (
          <p className="mx-auto max-w-120 text-center leading-[150%] text-foreground-04">
            No articles are available yet. Add posts in WordPress and refresh this page.
          </p>
        )}
      </Container>
    </section>
  );
}

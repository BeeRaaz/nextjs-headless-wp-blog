import Container from "@/components/layout/container";
import BlogCard from "@/components/layout/blog-card";
import { getPostBySlug, getPostNavigation, getPostSlugs, getRelatedPosts } from "@/lib/wp-client";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 300;

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  // Prebuild known article paths and revalidate over time (SSG + ISR).
  const slugs = await getPostSlugs().catch(() => []);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Article not found",
    };
  }

  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  // WordPress excerpt/title fields can contain HTML, so sanitize before metadata output.
  const plainExcerpt = post.excerpt.rendered.replace(/<[^>]*>/g, "").trim();

  return {
    title: post.title.rendered,
    description: plainExcerpt || "Read this travel story from The Roam Report.",
    alternates: {
      canonical: `/articles/${post.slug}`,
    },
    openGraph: {
      title: post.title.rendered,
      description: plainExcerpt || "Read this travel story from The Roam Report.",
      type: "article",
      images: featuredImage ? [featuredImage] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title.rendered,
      description: plainExcerpt || "Read this travel story from The Roam Report.",
      images: featuredImage ? [featuredImage] : [],
    },
  };
}

export default async function ArticleSinglePage({
  params,
}: ArticlePageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0];
  const authorName = post._embedded?.author?.[0]?.name || "Unknown author";
  const plainExcerpt = post.excerpt.rendered.replace(/<[^>]*>/g, "").trim();
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const { previousPost, nextPost } = await getPostNavigation(slug);
  const relatedPosts = await getRelatedPosts(post.id, post.author, 3).catch(() => []);
  // JSON-LD improves rich results and clarifies article semantics to search engines.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title.rendered,
    datePublished: post.date,
    dateModified: post.modified,
    description: plainExcerpt,
    image: featuredImage?.source_url,
    mainEntityOfPage: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/articles/${post.slug}`,
  };

  return (
    <>
      <article className="bg-background text-foreground">
        {featuredImage?.source_url && (
          <div className="relative min-h-80 md:min-h-145">
            <Image
              src={featuredImage.source_url}
              alt={featuredImage.alt_text || post.title.rendered}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        )}
        <Container>
          <div>
            <div className="text-center pt-10">
              <h1 className="mb-5 text-[32px] font-semibold leading-[120%] tracking-[-0.05em] md:text-5xl">
                {post.title.rendered}
              </h1>
              <p className="mb-10 text-foreground-04">
                <span>{formattedDate}</span>
                <span className="mx-2" aria-hidden="true">
                  •
                </span>
                <span>By {authorName}</span>
              </p>
            </div>
            <div className="border-y border-dotted py-20">
              <div
                className="prose mx-auto max-w-190 text-foreground"
                dangerouslySetInnerHTML={{ __html: post.content.rendered }}
              />
            </div>
            <nav
              aria-label="Article navigation"
              className="mx-auto flex max-w-190 items-center justify-between gap-5 py-10"
            >
              {previousPost ? (
                <Link
                  href={`/articles/${previousPost.slug}`}
                  className="text-foreground underline underline-offset-2 hover:no-underline"
                >
                  Previous: {previousPost.title.rendered}
                </Link>
              ) : (
                <span className="text-foreground-04">No previous article</span>
              )}
              {nextPost ? (
                <Link
                  href={`/articles/${nextPost.slug}`}
                  className="text-right text-foreground underline underline-offset-2 hover:no-underline"
                >
                  Next: {nextPost.title.rendered}
                </Link>
              ) : (
                <span className="text-foreground-04">No next article</span>
              )}
            </nav>
          </div>
        </Container>
      </article>
      {relatedPosts.length > 0 && (
        <section className="bg-background-02 py-20 text-foreground">
          <Container>
            <h2 className="mb-10 text-center text-[32px] font-semibold leading-[120%] tracking-[-0.05em] md:text-5xl">
              Related articles
            </h2>
            <ul className="mx-auto grid max-w-190 grid-cols-1 gap-5 md:grid-cols-2">
              {relatedPosts.map((relatedPost) => (
                <li key={relatedPost.id}>
                  <BlogCard post={relatedPost} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}

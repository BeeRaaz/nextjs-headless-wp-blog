"use client";

import { Post } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface BlogCardProps {
  post: Post;
  isFeaturedArticle?: boolean;
}

export default function BlogCard({
  post,
  isFeaturedArticle = false,
}: BlogCardProps) {
  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0];
  const [isImageLoading, setIsImageLoading] = useState(true);
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <Link
        href={`/articles/${post.slug}`}
        className="block h-full w-full transition-transform duration-300 hover:scale-[1.02]"
      >
        <article className="bg-background h-full">
          <div className="px-2.5 pt-2.5">
            <div className="relative overflow-hidden rounded-3xl pt-67">
              {featuredImage?.source_url ? (
                <>
                  {isImageLoading && (
                    <div
                      className="absolute inset-0 animate-pulse bg-background-02"
                      aria-hidden="true"
                    />
                  )}
                  <Image
                    src={featuredImage.source_url}
                    alt={featuredImage.alt_text || post.title.rendered}
                    fill
                    sizes={isFeaturedArticle ? "(max-width: 768px) 100vw, 740px" : "(max-width: 768px) 100vw, 50vw"}
                    className={`object-cover object-center transition-opacity duration-300 ${isImageLoading ? "opacity-0" : "opacity-100"}`}
                    onLoad={() => setIsImageLoading(false)}
                  />
                </>
              ) : (
                // Keep the same visual rhythm when WP does not provide a featured image.
                <div className="absolute inset-0 bg-background-02" aria-hidden="true" />
              )}
            </div>
          </div>
          <div className="text-center py-12 px-6">
            <div className="text-foreground-04 font-medium tracking-[-0.02em] leading-[120%] text-base mb-3">
              {isFeaturedArticle ? (
                <strong>Featured Article</strong>
              ) : (
                <time dateTime={post.date}>{formattedDate}</time>
              )}
            </div>
            <h3 className="text-foreground font-semibold tracking-[-0.04em] leading-[120%] text-2xl">
              {post.title.rendered}
            </h3>
          </div>
        </article>
      </Link>
    </>
  );
}

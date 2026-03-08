import { Post } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0];

  return (
    <>
      <Link
        href={`/articles/${post.slug}`}
        className="block w-full h-full transition-transform duration-300 hover:scale-[1.02]"
      >
        <article className="bg-background h-full">
          <div className="px-2.5 pt-2.5">
            <div className="relative pt-67 rounded-3xl overflow-hidden">
              <Image
                src={`${featuredImage.source_url}`}
                alt={`${featuredImage.alt_text || post.title.rendered}`}
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
          <div className="text-center py-12 px-6">
            <div className="text-foreground-04 font-medium tracking-[-0.02em] leading-[120%] text-base mb-3">
              {post.sticky === true ? (
                <strong>Featured Article</strong>
              ) : (
                <time dateTime="2025-10-10">{post.date}</time>
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

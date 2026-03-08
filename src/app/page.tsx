import BlogCard from "@/components/layout/blog-card";
import Container from "@/components/layout/container";
import { getAllPosts } from "@/lib/cms";
import { Post } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const posts: Post[] = await getAllPosts();
  if (posts.length === 0) return;

  const featuredPost = posts.find((post) => post.sticky === true) || posts[0];

  const recentPosts = posts
    .filter((post) => post.id !== featuredPost.id)
    .slice(0, 4);

  return (
    <>
      <section className="h-187.5 sticky top-0 flex flex-wrap justify-center items-center py-20">
        <div className="absolute inset-0">
          <Image
            src="/hero-bg.jpg"
            alt="Hero BG"
            fill
            className="object-cover object-center"
          />
        </div>
        <Container className="relative z-10">
          <div className="md:max-w-92.5 md:mx-auto">
            <BlogCard post={featuredPost} />
          </div>
        </Container>
        <div className="absolute bottom-5 text-center text-foreground">
          <span>Scroll for more</span>
          <svg
            width="8"
            height="9"
            viewBox="0 0 8 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto"
          >
            <path
              d="M0 3.486L4.284 7.56L3.23398 7.546L7.57401 3.486V5.418L4.116 8.75H3.40198L0 5.418V3.486ZM3.06598 0H4.508V7.448H3.06598V0Z"
              fill="#332115"
            />
          </svg>
        </div>
      </section>
      <div className="relative z-99">
        <section className="bg-background-02 text-foreground py-20">
          <Container>
            <h2 className="text-center font-semibold tracking-[-0.05em] leading-[120%] text-[32px] mb-10 md:text-5xl">
              Latest travel stories
            </h2>
            {recentPosts && (
              <>
                <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 mb-10 max-w-92.5 mx-auto md:max-w-none md:mx-0">
                  {recentPosts.map((recentPost) => (
                    <li key={recentPost.id}>
                      <BlogCard post={recentPost} />
                    </li>
                  ))}
                </ul>
                <p className="text-center"><Link href={'/articles'} className="font-medium leading-[120%] tracking-[-0.02em] text-base text-foreground underline underline-offset-2 hover:no-underline">View all articles</Link></p>
              </>
            )}
          </Container>
        </section>
      </div>
    </>
  );
}

import NotFound from "@/app/not-found";
import Container from "@/components/layout/container";
import { getPostBySlug } from "@/lib/cms";
import Image from "next/image";

export default async function ArticleSinglePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return NotFound();

  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0];

  return (
    <>
      <article className="bg-background text-foreground">
        <div className="relative min-h-80 md:min-h-145">
          <Image
            src={featuredImage.source_url}
            alt={featuredImage.alt_text || post.title.rendered}
            fill
            className="object-cover object-center"
          />
        </div>
        <Container>
          <div>
            <div className="text-center">
              <h2>{post.title.rendered}</h2>
            </div>
            <div className="py-20 border-t border-b border-dotted">
              <div
                dangerouslySetInnerHTML={{ __html: post.content.rendered }}
              />
            </div>
          </div>
        </Container>
      </article>
    </>
  );
}

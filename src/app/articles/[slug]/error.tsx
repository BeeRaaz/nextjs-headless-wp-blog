"use client";

import Container from "@/components/layout/container";
import Link from "next/link";

export default function ArticleError() {
  return (
    <section className="bg-background py-20 text-foreground">
      <Container>
        <div className="mx-auto max-w-120 text-center">
          <h2 className="mb-4 text-2xl font-semibold tracking-[-0.04em]">Unable to load this article</h2>
          <p className="mb-8 text-foreground-04">
            Something went wrong while loading the post. Please try again later.
          </p>
          <Link
            href="/articles"
            className="font-medium text-foreground underline underline-offset-2 hover:no-underline"
          >
            Back to articles
          </Link>
        </div>
      </Container>
    </section>
  );
}

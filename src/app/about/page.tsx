import Container from "@/components/layout/container";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about The Roam Report and its editorial approach.",
};

export default function AboutPage() {
  return (
    <section className="bg-background-02 py-20 text-foreground lg:min-h-screen lg:flex lg:items-center lg:justify-center">
      <Container>
        <div className="mx-auto max-w-160">
          <h1 className="mb-6 text-center text-[32px] font-semibold leading-[120%] tracking-[-0.05em] md:text-5xl">
            About The Roam Report
          </h1>
          <p className="mb-4 text-center leading-[150%] text-foreground-04">
            The Roam Report is a travel journal focused on slow exploration, field notes, and visual storytelling.
          </p>
          <p className="text-center leading-[150%] text-foreground-04">
            This site is powered by Next.js and a headless WordPress backend to keep publishing simple while
            delivering a fast frontend experience.
          </p>
        </div>
      </Container>
    </section>
  );
}

import Container from "@/components/layout/container";

export default function ArticleLoading() {
  return (
    <section className="bg-background py-20 text-foreground">
      <Container>
        <p className="text-center text-foreground-04">Loading article...</p>
      </Container>
    </section>
  );
}

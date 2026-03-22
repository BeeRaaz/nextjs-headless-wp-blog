import Container from "@/components/layout/container";

export default function ArticlesLoading() {
  return (
    <section className="bg-background-02 py-20 text-foreground">
      <Container>
        <p className="text-center text-foreground-04">Loading articles...</p>
      </Container>
    </section>
  );
}

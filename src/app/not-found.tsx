import Container from "@/components/layout/container";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <section>
        <Container>
          <h2>Page Not Found</h2>
          <Link href={"/"}>Back to Home</Link>
        </Container>
      </section>
    </>
  );
}

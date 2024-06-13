import lostImg from "~/assets/lost.webp";
import Image from "next/image";

export default function NotFound() {
  return (
    <section>
      <h1 className="mb-5 text-lg">404 - Page not found</h1>
      <Image
        className="mt-6"
        src={lostImg}
        alt="Lost"
        width={400}
        height={300}
      />
    </section>
  );
}

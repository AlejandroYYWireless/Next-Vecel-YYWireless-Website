import { BoxReveal } from "@/components/magicui/box-reveal";

export default function Header() {
  return (
    <div className="size-full max-w-lg items-center justify-center overflow-hidden pt-8">
      <BoxReveal boxColor={"hsl(var(--primary))"} duration={0.5}>
        <p className="text-5xl font-semibold">
          About Us<span className="text-primary">.</span>
        </p>
      </BoxReveal>

      <BoxReveal boxColor={"hsl(var(--primary))"} duration={0.5}>
        <p className="mt-4 text-xl">
          From humble beginnings to becoming a{" "}
          <span className="text-primary font-semibold">
            refubished technology industry leader
          </span>
          , our journey has been defined by technical excellence and
          environmental responsibility. We&apos;re not just refurbishing
          products—we&apos;re{" "}
          <span className="text-primary font-semibold">
            reimagining what technology can and should be
          </span>
          .
        </p>
      </BoxReveal>
    </div>
  );
}

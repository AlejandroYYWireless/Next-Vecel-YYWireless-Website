import ContactUsDialog from "@/app/components/miscomponents/ContactUsDialog";
import { BoxReveal } from "@/components/magicui/box-reveal";
export function GlobeHeroText() {
  return (
    <div className="max-w-3xl  items-center space-y-6 justify-start overflow-hidden px-4 sm:px-6 lg:px-0">
      <BoxReveal boxColor={"hsl(var(--primary))"} duration={0.5}>
        <p className="text-2xl h-20  sm:text-3xl md:text-5xl lg:text-[3.8rem] font-bold whitespace-normal sm:whitespace-nowrap mt-0 pt-0 leading-tight">
          Repurpose<span className="text-primary font-semibold">.</span>{" "}
          Reconnect
          <span className="text-primary font-semibold">.</span>
        </p>
      </BoxReveal>

      <BoxReveal boxColor={"hsl(var(--primary))"} duration={0.5}>
        <p className="mt-2 sm:mt-[.8rem] text-sm sm:text-base md:text-lg lg:text-[1.2rem] font-medium">
          Setting the industry benchmark for{" "}
          <span className="text-primary font-semibold">
            &#34;Repurposing with Purpose&#34;
          </span>
        </p>
      </BoxReveal>

      <BoxReveal boxColor={"hsl(var(--primary))"} duration={0.5}>
        <ContactUsDialog />
      </BoxReveal>
    </div>
  );
}

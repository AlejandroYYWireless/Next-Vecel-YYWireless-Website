import { BoxReveal } from "@/components/magicui/box-reveal";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { Badge } from "@/components/ui/badge";
export function HeroBoxReveal() {
  return (
    <div className="max-w-3xl items-center justify-start overflow-hidden px-4 sm:px-6 lg:px-0">
      <BoxReveal boxColor={"hsl(var(--primary))"} duration={0.5}>
        <p className="text-2xl sm:text-3xl md:text-5xl lg:text-[3.8rem] font-bold whitespace-normal sm:whitespace-nowrap mt-0 pt-0 leading-tight">
          Quality At Every Step<span className="text-primary">.</span>
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
        <div className="mt-4 sm:mt-6 lg:mt-8 space-y-4 sm:space-y-6 lg:space-y-8">
          <div className="flex flex-col space-y-1 sm:space-y-2">
            <h3 className="text-lg sm:text-xl font-semibold flex items-center">
              Premium Grading Process
            </h3>
            <p className="text-sm sm:text-base pl-2 sm:pl-4 lg:pl-6">
              Our 27-point inspection ensures every device meets or exceeds OEM
              specifications. Each product undergoes rigorous testing with
              proprietary diagnostics that identify imperfections invisible to
              standard industry tools.
            </p>
          </div>

          <div className="flex flex-col space-y-1 sm:space-y-2">
            <h3 className="text-lg sm:text-xl font-semibold flex items-center">
              Superior Quality Assurance
            </h3>
            <p className="text-sm sm:text-base pl-2 sm:pl-4 lg:pl-6">
              Devices are categorized using our exclusive A+, A, B, and C
              grading system—setting a standard unmatched in the industry. Our
              A+ grade guarantees cosmetic perfection indistinguishable from
              factory-new condition.
            </p>
          </div>

          <div className="flex flex-col space-y-1 sm:space-y-2">
            <h3 className="text-lg sm:text-xl font-semibold flex items-center">
              Component-Level Certification
            </h3>
            <p className="text-sm sm:text-base pl-2 sm:pl-4 lg:pl-6">
              Unlike standard refurbishers, we certify individual
              components—batteries at 90%+ capacity, screens with zero pixel
              defects, and perfect touch response sensitivity. Every device
              includes a detailed quality report with its unique certification
              number.
            </p>
          </div>

          <div className="flex flex-col space-y-1 mt-2 sm:mt-3 lg:mt-4">
            <div className="flex flex-wrap gap-1 sm:gap-2 mt-1 sm:mt-2">
              <Badge
                variant="outline"
                className="text-xs sm:text-sm bg-primary/10 border-primary/50 text-primary"
              >
                ISO 9001 Certified
              </Badge>
              <Badge
                variant="outline"
                className="text-xs sm:text-sm border-primary/50 bg-primary/10 text-primary"
              >
                R2 Certified
              </Badge>
              <Badge
                variant="outline"
                className="text-xs sm:text-sm border-primary/50 bg-primary/10 text-primary"
              >
                120-Day Warranty
              </Badge>
              <Badge
                variant="outline"
                className="text-xs sm:text-sm border-primary/50 bg-primary/10 text-primary"
              >
                Eco-Friendly Packaging
              </Badge>
            </div>
          </div>
        </div>
      </BoxReveal>

      <BoxReveal boxColor={"hsl(var(--primary))"} duration={0.5}>
        <div className="mt-4 sm:mt-6 lg:mt-8 flex gap-2 sm:gap-4">
          <InteractiveHoverButton>Contact Us</InteractiveHoverButton>
        </div>
      </BoxReveal>
    </div>
  );
}

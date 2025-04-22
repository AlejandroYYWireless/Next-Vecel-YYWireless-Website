import { Button } from "@/components/ui/button";
import { BoxReveal } from "@/components/magicui/box-reveal";

export function HeroBoxReveal() {
  return (
    <div className="size-full max-w-lg items-center justify-start overflow-hidden">
      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <p className="text-[3.5rem] font-semibold mt-0 pt-0">
          YYWireless<span className="text-[#5046e6]">.</span>
        </p>
      </BoxReveal>

      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <h2 className="mt-[.5rem] text-[1rem]">
          Industry Standard for{" "}
          <span className="text-[#5046e6]"> Repurposing with Purpose</span>
        </h2>
      </BoxReveal>

      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <div className="mt-6">
          <div className="space-y-6">
            Pushing the boundaries of technology and sustainability since 2006.{" "}
            <br />
            <div className="flex gap-1">
              <p>Customers and partners in over</p>
              <span className="font-semibold text-[#5046e6]">50 countries</span>
            </div>
            <div className="flex gap-1 whitespace-nowrap">
              <p>Marking the standard for</p>
              <span className="font-semibold text-[#5046e6]">
                industry changing
              </span>
              <p>device refurbishing.</p>
            </div>
            <div className="flex gap-1 whitespace-nowrap">
              <p>Providing effective and innovative</p>
              <span className="font-semibold text-[#5046e6]">Hardware</span>
              <p>and</p>
              <span className="font-semibold text-[#5046e6]">Software</span>
              <p>solutions.</p>
            </div>
          </div>
        </div>
      </BoxReveal>

      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <Button className="mt-[1.6rem] bg-[#5046e6]">Contact us</Button>
      </BoxReveal>
    </div>
  );
}

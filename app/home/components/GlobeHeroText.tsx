import ContactUsDialog from "@/app/components/miscomponents/ContactUsDialog";
import { AuroraText } from "@/components/magicui/aurora-text";
import { BoxReveal } from "@/components/magicui/box-reveal";
export function GlobeHeroText() {
  const colors = ["#98FB98", "#a3ff1a", "#90EE90", "#00b3ff", "#87CEFA"];

  return (
    <div className="max-w-3xl items-center space-y-6 justify-start overflow-hidden px-4 sm:px-6 lg:px-0">
      <BoxReveal boxColor={"hsl(var(--primary))"} duration={0.5}>
        <p className="text-2xl h-20  sm:text-3xl md:text-5xl lg:text-[3.8rem] font-bold whitespace-normal sm:whitespace-nowrap mt-0 pt-0 leading-tight">
          <AuroraText colors={colors}>Connecting</AuroraText> our world
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
        <div className=" rounded-2xl  ">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam
          nemo, incidunt veritatis, sunt tenetur nihil exercitationem, fuga quo
          esse doloremque temporibus mollitia voluptates molestiae quidem. Rem
          officiis quas delectus pariatur nulla minima consequatur? In et cumque
          fuga non illo quaerat reiciendis veniam repudiandae similique ab!
          Officiis non blanditiis modi, reiciendis corporis at numquam deleniti
          tenetur temporibus, voluptate voluptatibus qui libero?
        </div>
      </BoxReveal>
      <BoxReveal boxColor={"hsl(var(--primary))"} duration={0.5}>
        <ContactUsDialog />
      </BoxReveal>
    </div>
  );
}

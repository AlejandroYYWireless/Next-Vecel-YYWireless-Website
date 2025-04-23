import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BoxReveal } from "@/components/magicui/box-reveal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DownloadIcon } from "lucide-react";
import Link from "next/link";

const HomeCertificates = () => {
  return (
    <section className="py-6">
      <div className="flex flex-col items-start justify-start gap-4">
        <BoxReveal boxColor={"hsl(var(--primary))"} duration={0.5}>
          <p className="text-6xl font-mokoto font-semibold">
            Fully Certified<span className="text-primary">.</span>
          </p>
        </BoxReveal>

        <BoxReveal boxColor={"hsl(var(--primary))"} duration={0.5}>
          <div className="mt-6 bg-black/5 dark:bg-black/80 p-4 rounded-xl">
            <p>
              All of our certifications are up to date, and are as follows{" "}
              <span className="font-semibold text-primary">x</span>,{" "}
              <span className="font-semibold text-primary">y</span>,{" "}
              <span className="font-semibold text-primary">a</span> , and{" "}
              <span className="font-semibold text-primary">b</span>
              . <br />
            </p>
          </div>
        </BoxReveal>
        <BoxReveal boxColor={"hsl(var(--primary))"} duration={0.5}>
          <p className="mt-[.5rem] text-[1rem] bg-black/5 dark:bg-black/80 p-4 rounded-xl">
            Rest easy knowing you&apos;re in{" "}
            <span className="text-primary">good care</span> with YYWireless.
          </p>
        </BoxReveal>

        <BoxReveal boxColor={"hsl(var(--primary))"} duration={0.5}>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mt-6 bg-primary">
                View our certifications
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-4xl max-h-[90vh] rounded-xl">
              <DialogHeader>
                <DialogTitle className="text-3xl font-mokoto font-bold text-center mb-4">
                  Our Certifications
                </DialogTitle>
                <DialogDescription>
                  All certifications are up to date and verified.
                </DialogDescription>
              </DialogHeader>
              <ScrollArea className="h-[70vh] pr-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* R2 Certificate */}
                  <div className="rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl bg-white dark:bg-gray-800">
                    <div className="relative w-full h-56 ">
                      <Image
                        src="/images/R2.webp"
                        alt="R2 Certificate"
                        fill
                        className="object-contain p-4"
                      />
                    </div>
                    <div className="p-5 border-t border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-semibold mb-2">
                        R2 Certification
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Electronics recycling standard certification for
                        responsible recycling practices and environmental
                        stewardship.
                      </p>
                    </div>
                  </div>

                  {/* Adisa Certificate */}
                  <div className="rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl bg-white dark:bg-gray-800">
                    <div className="flex items-center justify-center p-4">
                      <div className="w-32 h-32 relative rounded-full shadow-lg overflow-hidden border-4 border-primary/20">
                        <Image
                          src="/images/adisa.jpg"
                          alt="ADISA Certification"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="p-5 border-t border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-semibold mb-2">
                        ADISA Certification
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Asset Disposal and Information Security Alliance
                        certification for secure data destruction and IT asset
                        disposal.
                      </p>
                    </div>
                  </div>

                  {/* Perry Johnson Certificate 1 */}
                  <div className="rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl bg-white dark:bg-gray-800">
                    <div className="relative w-full h-48">
                      <Image
                        src="/images/cert1.webp"
                        alt="Perry Johnson Certificate 1"
                        fill
                        className="object-contain p-4"
                      />
                    </div>
                    <div className="p-5 border-t border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-semibold mb-2">
                        Perry Johnson ISO 9001
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Quality Management System certification ensuring
                        consistent service quality and customer satisfaction.
                      </p>
                      <Link
                        href="/downloads/pjc-cert1.pdf"
                        className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
                      >
                        <DownloadIcon className="mr-2 h-4 w-4" />
                        Download Certificate
                      </Link>
                    </div>
                  </div>

                  {/* Perry Johnson Certificate 2 */}
                  <div className="rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl bg-white dark:bg-gray-800">
                    <div className="relative w-full h-48">
                      <Image
                        src="/images/cert2.webp"
                        alt="Perry Johnson Certificate 2"
                        fill
                        className="object-contain p-4"
                      />
                    </div>
                    <div className="p-5 border-t border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-semibold mb-2">
                        Perry Johnson ISO 14001
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Environmental Management System certification
                        demonstrating our commitment to environmental
                        responsibility.
                      </p>
                      <Link
                        href="/downloads/pjc-cert2.pdf"
                        className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
                      >
                        <DownloadIcon className="mr-2 h-4 w-4" />
                        Download Certificate
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </BoxReveal>
      </div>
    </section>
  );
};

export default HomeCertificates;

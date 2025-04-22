import React from "react";
import Image from "next/image";
import Link from "next/link";
import { DownloadIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Certificate data
const certificates = [
  {
    id: 1,
    name: "R2 Certification",
    image: "/images/R2.webp",
    description:
      "Electronics recycling standard certification for responsible recycling practices and environmental stewardship.",
    downloadLink: null,
  },
  {
    id: 2,
    name: "ADISA Certification",
    image: "/images/adisa.jpg",
    description:
      "Asset Disposal and Information Security Alliance certification for secure data destruction and IT asset disposal.",
    downloadLink: null,
    isRounded: true,
  },
  {
    id: 3,
    name: "Perry Johnson ISO 9001",
    image: "/images/cert1.webp",
    description:
      "Quality Management System certification ensuring consistent service quality and customer satisfaction.",
    downloadLink: "/downloads/pjc-cert1.pdf",
  },
  {
    id: 4,
    name: "Perry Johnson ISO 14001",
    image: "/images/cert2.webp",
    description:
      "Environmental Management System certification demonstrating our commitment to environmental responsibility.",
    downloadLink: "/downloads/pjc-cert2.pdf",
  },
];

const HomeCertificatesCarousel = () => {
  return (
    <section className="py-2">
      <div className="container mx-auto px-4">
        <Carousel className="mx-auto max-w-[400px]">
          <CarouselContent>
            {certificates.map((cert) => (
              <CarouselItem key={cert.id} className="">
                <div className="p-2">
                  <Card className="border border-gray-200 dark:border-gray-800 shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center">
                        <div
                          className={`relative ${
                            cert.isRounded
                              ? "w-36 h-36 rounded-full border-4 border-primary/20 overflow-hidden"
                              : "w-full h-48"
                          } mb-4`}
                        >
                          <Image
                            src={cert.image}
                            alt={cert.name}
                            fill
                            className={
                              cert.isRounded ? "object-cover" : "object-contain"
                            }
                          />
                        </div>

                        <h3 className="text-xl font-semibold text-center mb-3">
                          {cert.name}
                        </h3>

                        <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
                          {cert.description}
                        </p>

                        {cert.downloadLink && (
                          <Link
                            href={cert.downloadLink}
                            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
                          >
                            <DownloadIcon className="mr-2 h-4 w-4" />
                            Download Certificate
                          </Link>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-6">
            <CarouselPrevious className="static transform-none mx-2 bg-primary hover:bg-primary/90 text-white" />
            <CarouselNext className="static transform-none mx-2 bg-primary hover:bg-primary/90 text-white" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default HomeCertificatesCarousel;

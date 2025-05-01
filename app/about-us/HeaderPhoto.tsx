import React, { useEffect, useRef, useState, useCallback } from "react";
import { ThemeProvider } from "@/components/ui/theme-provider";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

type ImageType = string | { src: string; alt: string };

interface HeaderPhotoProps {
  images?: ImageType[];
}
const HeaderPhoto: React.FC<HeaderPhotoProps> = ({
  images = [
    "https://plus.unsplash.com/premium_photo-1681493194291-efa74c529223?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1690191927885-5a4b0d734741?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1661277666101-01fb123f2a4c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1661767467261-4a4bed92a507?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ],
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const userInteractedRef = useRef(false);

  // Function to reset and start the timer
  const resetTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      if (api) {
        const isLastSlide = current === images.length - 1;

        if (isLastSlide) {
          // Reset to first slide if we're at the last one
          api.scrollTo(0);
        } else {
          // Otherwise just go to next slide
          api.scrollNext();
        }
      }
    }, 3000);
  }, [api, current, images.length]);

  // Initialize and handle cleanup
  useEffect(() => {
    if (!api) return;

    // Update current index when carousel changes
    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());

      // If user interaction caused this change, reset the timer
      if (userInteractedRef.current) {
        resetTimer();
        userInteractedRef.current = false;
      }
    };

    // Start the initial timer
    resetTimer();

    // Set up listeners
    api.on("select", onSelect);

    // Detect user interactions with next/prev buttons
    const handleUserInteraction = () => {
      userInteractedRef.current = true;
    };

    const prevButton = document.querySelector("[data-carousel-prev]");
    const nextButton = document.querySelector("[data-carousel-next]");

    if (prevButton) prevButton.addEventListener("click", handleUserInteraction);
    if (nextButton) nextButton.addEventListener("click", handleUserInteraction);

    // Clean up everything on unmount
    return () => {
      api.off("select", onSelect);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      if (prevButton)
        prevButton.removeEventListener("click", handleUserInteraction);
      if (nextButton)
        nextButton.removeEventListener("click", handleUserInteraction);
    };
  }, [api, resetTimer]);

  return (
    <ThemeProvider>
      <div className="w-full max-w-3xl mx-auto">
        <Carousel className="w-full" setApi={setApi}>
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <Card className="rounded-lg border-primary/20">
                  <CardContent className="p-1">
                    <img
                      src={typeof image === "string" ? image : image.src}
                      alt={
                        typeof image === "string"
                          ? `Slide ${index + 1}`
                          : image.alt
                      }
                      className="object-cover w-full select-none aspect-video rounded-lg shadow-lg"
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            data-carousel-prev
            className="text-primary border-primary/30 hover:bg-primary/10"
          />
          <CarouselNext
            data-carousel-next
            className="text-primary border-primary/30 hover:bg-primary/10"
          />
        </Carousel>
      </div>
    </ThemeProvider>
  );
};

export default HeaderPhoto;

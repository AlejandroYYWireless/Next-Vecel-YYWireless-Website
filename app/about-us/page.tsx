"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function Home() {
  const container = useRef(null);

  useLayoutEffect(() => {
    // Need to register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Only run after component mounts and DOM is available
    if (!container.current) return;

    // Function to create animation for each section
    const createSectionAnimation = (
      section: any,
      textContent: any,
      image: any,
      imageWrapper: any
    ) => {
      // Create a timeline with ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=400%", // Extend scroll distance to 4x viewport height for more animation steps
          scrub: 1, // Smooth scrubbing effect
          pin: true, // Pin the section during animation
          anticipatePin: 1, // For better performance
          markers: true, // For debugging - remove in production
        },
      });

      // Set initial states
      gsap.set(textContent, { opacity: 0, x: -50 });
      gsap.set(imageWrapper, { width: "100%" }); // Start with full width wrapper
      gsap.set(image, {
        opacity: 0,
        scale: 1.2,
        x: 0,
        position: "relative",
        left: "0%",
        transform: "translateX(0%)",
      });

      // Add animations to timeline
      tl
        // 1. Fade in image centered and larger
        .to(image, {
          opacity: 1,
          scale: 2,
          x: "-50%", // Centered
          duration: 1,
          ease: "power2.out",
        })
        // 2. Pause briefly to showcase centered image
        .to({}, { duration: 0.5 })

        // 3. Move image to right side and resize
        .to(
          image,
          {
            scale: 1,
            x: "25%", // Move to the right
            duration: 1,
            ease: "power3.inOut",
          },
          "moveImage"
        )
        .to(
          imageWrapper,
          {
            width: "50%", // Resize to half the container
            duration: 1,
            ease: "power3.inOut",
          },
          "moveImage"
        )

        // 4. Pause briefly
        .to({}, { duration: 0.3 })

        // 5. Fade in text content
        .to(textContent, {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
        })

        // 6. Pause to display both elements
        .to({}, { duration: 1 })

        // 7. Disappear everything together along curved path
        .to([textContent, imageWrapper], {
          scale: 0,
          opacity: 0,
          duration: 1.5,
          ease: "power3.inOut",
          motionPath: {
            path: [
              { x: "30%", y: "-20%" }, // First control point
              { x: "60%", y: "-80%" }, // Second control point
            ],
            curviness: 2,
          },
        })

        // 8. Pause before next section
        .to({}, { duration: 0.5 });

      return tl;
    };

    // Get all sections, text content, and images
    const sections = container.current.querySelectorAll(".content-section");
    const textContents = container.current.querySelectorAll(".text-content");
    const images = container.current.querySelectorAll(".brand-image");
    const imageWrappers = container.current.querySelectorAll(".image-wrapper");

    // Create animation for each section
    let animations = [];
    sections.forEach((section, index) => {
      animations.push(
        createSectionAnimation(
          section,
          textContents[index],
          images[index],
          imageWrappers[index]
        )
      );
    });

    // Cleanup function to kill all ScrollTriggers when component unmounts
    return () => {
      animations.forEach((tl) => {
        if (tl.scrollTrigger) {
          tl.scrollTrigger.kill();
        }
      });
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []); // Empty dependency array means this runs once after mount

  return (
    <main className="relative">
      {/* Intro Section */}
      <section className="h-screen flex items-center justify-center bg-green-500 text-white">
        <h1 className="text-4xl font-bold">Scroll Down</h1>
      </section>

      {/* Animation Container */}
      <div ref={container}>
        {/* Section 1 - Walmart */}
        <section className="content-section h-screen flex items-center justify-center relative">
          <div className="flex items-center justify-between w-full max-w-6xl px-12">
            <div className="text-content w-1/2 pr-8">
              <h2 className="text-3xl font-bold mb-4 text-blue-600">Walmart</h2>
              <p className="text-lg mb-4">
                Founded in 1962, Walmart has grown to become the world's largest
                retailer, operating thousands of stores worldwide. The company
                is known for its commitment to everyday low prices and a wide
                selection of products.
              </p>
              <p className="text-lg">
                Walmart serves millions of customers each week and continues to
                expand its online presence to complement its physical stores.
              </p>
            </div>
            <div className="image-wrapper w-1/2 flex justify-center">
              <div className="brand-image bg-blue-100 w-[400px] h-[300px] rounded-lg flex items-center justify-center p-8">
                <img
                  src="/images/brands/Walmart.png"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 - Amazon */}
        <section className="content-section h-screen flex items-center justify-center relative">
          <div className="flex items-center justify-between w-full max-w-6xl px-12">
            <div className="text-content w-1/2 pr-8">
              <h2 className="text-3xl font-bold mb-4 text-purple-600">
                Amazon
              </h2>
              <p className="text-lg mb-4">
                Founded by Jeff Bezos in 1994, Amazon began as an online
                bookstore and has evolved into one of the world's largest
                e-commerce platforms. Today, Amazon offers millions of products
                and services globally.
              </p>
              <p className="text-lg">
                Beyond retail, Amazon has expanded into cloud computing, digital
                streaming, artificial intelligence, and more, becoming a
                technology powerhouse.
              </p>
            </div>
            <div className="image-wrapper w-1/2 flex justify-center">
              <div className="brand-image bg-purple-100 w-[400px] h-[300px] rounded-lg flex items-center justify-center p-8">
                <img
                  src="/images/brands/Amazon.png"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 - Samsung */}
        <section className="content-section h-screen flex items-center justify-center relative">
          <div className="flex items-center justify-between w-full max-w-6xl px-12">
            <div className="text-content w-1/2 pr-8">
              <h2 className="text-3xl font-bold mb-4 text-red-600">Samsung</h2>
              <p className="text-lg mb-4">
                Founded in 1938, Samsung has grown from a small trading company
                to one of the world's leading electronics manufacturers. The
                company is known for its innovative smartphones, TVs, and home
                appliances.
              </p>
              <p className="text-lg">
                Samsung continues to push the boundaries of technology,
                investing heavily in research and development to create
                cutting-edge products.
              </p>
            </div>
            <div className="image-wrapper w-1/2 flex justify-center">
              <div className="brand-image bg-red-100 w-[400px] h-[300px] rounded-lg flex items-center justify-center p-8">
                <img
                  src="/images/brands/Samsung.png"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Outro Section */}
      <section className="h-screen flex items-center justify-center bg-orange-500 text-white">
        <h1 className="text-4xl font-bold">The Future Awaits</h1>
      </section>
    </main>
  );
}

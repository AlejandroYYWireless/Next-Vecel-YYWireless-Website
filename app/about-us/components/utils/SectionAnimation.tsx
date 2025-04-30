import gsap from "gsap";

/**
 * Creates an animation for a single section
 */
export function createSectionAnimation(
  section: HTMLElement,
  textContent: HTMLElement,
  image: HTMLElement,
  imageWrapper: HTMLElement,
  isEven: boolean
): gsap.core.Timeline {
  // Create a timeline with ScrollTrigger
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "+=300%", // Extend scroll distance to 4x viewport height for more animation steps
      scrub: 1, // Smooth scrubbing effect
      pin: true, // Pin the section during animation
      anticipatePin: 1, // For better performance
      markers: true, // For debugging - remove in production
    },
  });

  const finalImageX = isEven ? "25%" : "-25%"; // Right for even, Left for odd

  // Different starting positions based on device width
  const isMobile = window.innerWidth < 768;

  // Set up responsiveness
  configureResponsiveLayout(
    section,
    textContent,
    imageWrapper,
    image,
    isEven,
    isMobile
  );

  // Add animations to timeline
  addAnimationsToTimeline(
    tl,
    textContent,
    image,
    imageWrapper,
    isEven,
    isMobile,
    finalImageX
  );

  return tl;
}

/**
 * Configure the responsive layout based on device size
 */
function configureResponsiveLayout(
  section: HTMLElement,
  textContent: HTMLElement,
  imageWrapper: HTMLElement,
  image: HTMLElement,
  isEven: boolean,
  isMobile: boolean
): void {
  // Initial states for text
  gsap.set(textContent, { opacity: 0, x: isEven ? -50 : 50 });

  if (isMobile) {
    // Mobile: Stack elements vertically
    gsap.set(section, { display: "flex", flexDirection: "column" });
    gsap.set(imageWrapper, { width: "100%" });
    gsap.set(textContent, { order: 2 }); // Text always below image on mobile
    gsap.set(imageWrapper, { order: 1 }); // Image always on top on mobile
  } else {
    // Desktop: Side by side with alternating positions
    gsap.set(section, { display: "flex", flexDirection: "row" });
    gsap.set(imageWrapper, { width: "100%" }); // Start with full width wrapper

    // Set order based on even/odd
    gsap.set(textContent, { order: isEven ? 1 : 2 }); // Left for even, Right for odd
    gsap.set(imageWrapper, { order: isEven ? 2 : 1 }); // Right for even, Left for odd
  }

  // Initial settings for image
  gsap.set(image, {
    opacity: 0,
    scale: 1.2,
    x: 0,
    position: "relative",
    left: "0%",
    transform: "translateX(0%)",
  });
}

/**
 * Add animation steps to the timeline
 */
function addAnimationsToTimeline(
  tl: gsap.core.Timeline,
  textContent: HTMLElement,
  image: HTMLElement,
  imageWrapper: HTMLElement,
  isEven: boolean,
  isMobile: boolean,
  finalImageX: string
): void {
  tl
    // 1. Fade in image centered and larger
    .to(image, {
      opacity: 1,
      scale: 2,
      x: "0%", // Centered for mobile, adjusted for desktop
      duration: 1,
      ease: "power2.out",
    })
    // 2. Pause briefly to showcase centered image
    .to({}, { duration: 0.5 })

    // 3. Move image to side and resize
    .to(
      image,
      {
        scale: 1,
        x: isMobile ? "0%" : finalImageX, // No horizontal movement on mobile
        duration: 1,
        ease: "power3.inOut",
      },
      "moveImage"
    )
    .to(
      imageWrapper,
      {
        width: isMobile ? "100%" : "50%", // Full width on mobile, half on desktop
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
          { x: isEven ? "30%" : "-30%", y: "-20%" }, // First control point
          { x: isEven ? "60%" : "-60%", y: "-80%" }, // Second control point
        ],
        curviness: 2,
      },
    })

    // 8. Pause before next section
    .to({}, { duration: 0.5 });
}

/**
 * Creates animations for all sections in the container
 */
export function createSectionAnimations(
  container: HTMLDivElement
): gsap.core.Timeline[] {
  // Get all content sections, text content, and images
  const sections = container.querySelectorAll<HTMLElement>(".content-section");
  const textContents = container.querySelectorAll<HTMLElement>(".text-content");
  const images = container.querySelectorAll<HTMLElement>(".brand-image");
  const imageWrappers =
    container.querySelectorAll<HTMLElement>(".image-wrapper");

  // Create animation for each section
  const animations: gsap.core.Timeline[] = [];
  sections.forEach((section, index) => {
    // Determine if section is even or odd
    const isEven = index % 2 === 0;

    if (textContents[index] && images[index] && imageWrappers[index]) {
      animations.push(
        createSectionAnimation(
          section,
          textContents[index],
          images[index],
          imageWrappers[index],
          isEven
        )
      );
    }
  });

  return animations;
}

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

// Register plugins
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

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
      end: "+=300%",
      scrub: 1,
      pin: true,
      anticipatePin: 1,
    },
  });

  const finalImageX = isEven ? "25%" : "-25%";

  // Set up layout
  configureLayout(section, textContent, imageWrapper, image, isEven);

  // Add animations to timeline
  addAnimationsToTimeline(
    tl,
    textContent,
    image,
    imageWrapper,
    isEven,
    finalImageX
  );

  return tl;
}

/**
 * Configure the layout for desktop view
 */
function configureLayout(
  section: HTMLElement,
  textContent: HTMLElement,
  imageWrapper: HTMLElement,
  image: HTMLElement,
  isEven: boolean
): void {
  // Initial states for text
  gsap.set(textContent, { opacity: 0, x: isEven ? -50 : 50 });

  // Desktop: Side by side with alternating positions
  gsap.set(section, { display: "flex", flexDirection: "row" });
  gsap.set(imageWrapper, { width: "100%" }); // Start with full width wrapper

  // Set order based on even/odd
  gsap.set(textContent, { order: isEven ? 1 : 2 }); // Left for even, Right for odd
  gsap.set(imageWrapper, { order: isEven ? 2 : 1 }); // Right for even, Left for odd

  // Initial settings for image
  gsap.set(image, {
    opacity: 0,
    scale: 1,
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
  finalImageX: string
): void {
  tl
    // 1. Fade in image centered and larger
    .to(image, {
      opacity: 1,
      scale: 2,
      x: "0%",
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
        x: finalImageX,
        duration: 1,
        ease: "power3.inOut",
      },
      "moveImage"
    )
    .to(
      imageWrapper,
      {
        width: "50%",
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

import {
  useLayoutEffect,
  useRef,
  useCallback,
  MutableRefObject,
  Dispatch,
  SetStateAction,
} from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { createSectionAnimations } from "./SectionAnimation";

interface ScrollAnimationControllerProps {
  container: MutableRefObject<HTMLDivElement | null>;
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
}

export function useScrollAnimationController({
  container,
  isPlaying,
  setIsPlaying,
}: ScrollAnimationControllerProps) {
  const animationsRef = useRef<gsap.core.Timeline[]>([]);
  const scrollAnimationRef = useRef<number | null>(null);

  // Stop auto-scrolling
  const stopAutoScroll = useCallback(() => {
    if (scrollAnimationRef.current) {
      cancelAnimationFrame(scrollAnimationRef.current);
      scrollAnimationRef.current = null;
    }
  }, []);

  // Start auto-scrolling
  const startAutoScroll = useCallback(() => {
    if (scrollAnimationRef.current) {
      // Cancel any existing animation
      cancelAnimationFrame(scrollAnimationRef.current);
    }

    const scrollSpeed = 10; // pixels per frame
    const scrollStep = () => {
      // Calculate the maximum scroll position
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      const windowHeight = window.innerHeight;
      const maxScrollPosition = docHeight - windowHeight - 500; // Offset by 200px from bottom

      // Only scroll if we haven't reached the maximum position
      if (window.scrollY < maxScrollPosition) {
        window.scrollBy(0, scrollSpeed);
        scrollAnimationRef.current = requestAnimationFrame(scrollStep);
      } else {
        // Stop scrolling when we reach the bottom
        setIsPlaying(false);
        scrollAnimationRef.current = null;
      }
    };

    // Start the scrolling animation
    scrollAnimationRef.current = requestAnimationFrame(scrollStep);
  }, [setIsPlaying]);

  // Toggle auto-scrolling
  const togglePlay = useCallback(() => {
    const newPlayState = !isPlaying;
    setIsPlaying(newPlayState);

    if (newPlayState) {
      // Start auto-scrolling
      startAutoScroll();
    } else {
      // Stop auto-scrolling
      stopAutoScroll();
    }
  }, [isPlaying, setIsPlaying, startAutoScroll, stopAutoScroll]);

  // Set up scroll handler to pause when user scrolls
  useLayoutEffect(() => {
    const handleManualScroll = () => {
      // If user manually scrolls, pause the autoplay
      if (isPlaying) {
        setIsPlaying(false);
        stopAutoScroll();
      }
    };

    window.addEventListener("wheel", handleManualScroll);
    window.addEventListener("touchmove", handleManualScroll);

    return () => {
      window.removeEventListener("wheel", handleManualScroll);
      window.removeEventListener("touchmove", handleManualScroll);
    };
  }, [isPlaying, stopAutoScroll, setIsPlaying]);

  // Set up GSAP animations
  useLayoutEffect(() => {
    // Need to register ScrollTrigger and required plugins
    gsap.registerPlugin(ScrollTrigger);

    // Only run after component mounts and DOM is available
    if (!container.current) return;

    // Add resize handler for responsive adjustments
    const handleResize = () => {
      // Kill all ScrollTriggers
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      // Recreate animations
      createAnimations();
    };

    // Debounce function to prevent too many resize events
    const debounce = <T extends (...args: unknown[]) => void>(
      func: T,
      delay: number
    ) => {
      let timeoutId: ReturnType<typeof setTimeout>;
      return function (...args: Parameters<T>): void {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func(...args);
        }, delay);
      };
    };

    // Create animations for all sections
    const createAnimations = () => {
      if (!container.current) return [];

      // Create section animations
      const animations = createSectionAnimations(container.current);

      // Store animations in the ref for access
      animationsRef.current = animations;
      return animations;
    };

    // Create initial animations
    const animations = createAnimations();

    // Add event listener for window resize
    const debouncedResize = debounce(handleResize, 250);
    window.addEventListener("resize", debouncedResize);

    // Cleanup function
    return () => {
      animations.forEach((tl) => {
        if (tl.scrollTrigger) {
          tl.scrollTrigger.kill();
        }
      });
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      window.removeEventListener("resize", debouncedResize);

      // Clean up scroll animation
      if (scrollAnimationRef.current) {
        cancelAnimationFrame(scrollAnimationRef.current);
      }
    };
  }, [container]);

  return {
    togglePlay,
    startAutoScroll,
    stopAutoScroll,
  };
}

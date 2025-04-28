"use client";

import createGlobe, { COBEOptions } from "cobe";
import { useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

const MOVEMENT_DAMPING = 1400;

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [20 / 255, 240 / 255, 100 / 255],
  glowColor: [1, 1, 1],
  markers: [
    // Original markers
    { location: [14.5995, 120.9842], size: 0.03 }, // Manila, Philippines
    { location: [19.076, 72.8777], size: 0.1 }, // Mumbai, India
    { location: [23.8103, 90.4125], size: 0.05 }, // Dhaka, Bangladesh
    { location: [30.0444, 31.2357], size: 0.07 }, // Cairo, Egypt
    { location: [39.9042, 116.4074], size: 0.08 }, // Beijing, China
    { location: [-23.5505, -46.6333], size: 0.1 }, // São Paulo, Brazil
    { location: [19.4326, -99.1332], size: 0.1 }, // Mexico City, Mexico
    { location: [40.7128, -74.006], size: 0.1 }, // New York City, USA
    { location: [34.6937, 135.5022], size: 0.05 }, // Osaka, Japan
    { location: [41.0082, 28.9784], size: 0.06 }, // Istanbul, Turkey

    // Added Des Moines, Iowa
    { location: [37.5868, -93.625], size: 0.2 }, // Des Moines, Iowa, USA

    // Added Texas and Florida (using their major cities)
    { location: [29.7604, -95.3698], size: 0.1 }, // Houston, Texas, USA
    { location: [25.7617, -80.1918], size: 0.1 }, // Miami, Florida, USA

    // Additional locations in Asia
    { location: [13.7563, 100.5018], size: 0.07 }, // Bangkok, Thailand
    { location: [1.3521, 103.8198], size: 0.06 }, // Singapore
    { location: [37.5665, 126.978], size: 0.08 }, // Seoul, South Korea
    { location: [3.139, 101.6869], size: 0.06 }, // Kuala Lumpur, Malaysia

    // Additional locations in Africa
    { location: [-1.2921, 36.8219], size: 0.07 }, // Nairobi, Kenya
    { location: [6.5244, 3.3792], size: 0.09 }, // Lagos, Nigeria
    { location: [-33.9249, 18.4241], size: 0.07 }, // Cape Town, South Africa
    { location: [36.8065, 10.1815], size: 0.05 }, // Tunis, Tunisia
  ],
};

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string;
  config?: COBEOptions;
}) {
  let phi = 0;
  let width = 0;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);

  const r = useMotionValue(0);
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  });

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      r.set(r.get() + delta / MOVEMENT_DAMPING);
    }
  };

  useEffect(() => {
    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };

    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width: width * 2,
      height: width * 2,
      onRender: (state) => {
        if (!pointerInteracting.current) phi += 0.005;
        state.phi = phi + rs.get();
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    // Fix: Replace both setTimeout blocks with a single one that has proper null checking
    setTimeout(() => {
      if (canvasRef.current && canvasRef.current.style) {
        canvasRef.current.style.opacity = "1";
      }
    }, 0);

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [rs, config]);

  return (
    <div
      className={cn(
        "absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]",
        className
      )}
    >
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
        )}
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX;
          updatePointerInteraction(e.clientX);
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  );
}

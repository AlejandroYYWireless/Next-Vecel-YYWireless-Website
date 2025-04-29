/* eslint-disable  @typescript-eslint/no-explicit-any */

"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  worldCities as defaultLocations,
  GlobeLocation,
} from "./utils/globeLocations";
import * as THREE from "three";
import {
  setupCamera,
  setupRenderer,
  setupLighting,
  createResizeHandler,
} from "./utils/globeUtils";
import {
  addLocationMarkers,
  createGlobe,
  loadGeoJSONData,
} from "./utils/globeGeometry";
import {
  setupControls,
  createAnimationLoop,
  setupLocationInteraction,
} from "./utils/globeControls";
import LocationHoverCard from "./LocationHoverCard";

interface YYGlobeProps {
  radius?: number;
  color?: string;
  wireframe?: boolean;
  lineColor?: string;
  rotationSpeed?: number;
  stippleEnabled?: boolean;
  markerColor?: string;
  locations?: GlobeLocation[];
  showDebugInfo?: boolean;
}

const YYGlobe: React.FC<YYGlobeProps> = ({
  radius = 1,
  color = "#0099ff",
  wireframe = false,
  lineColor = "#ffffff",
  rotationSpeed = 0.005,
  stippleEnabled = true,
  markerColor = "#ffcc00",
  locations = defaultLocations,
  showDebugInfo = false,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  // IMPORTANT: Create rotating state as a state value so component re-renders when changed
  const [isRotating, setIsRotating] = useState(true);

  // Use a ref to hold the current rotation state that can be accessed in animation loop
  const isRotatingRef = useRef<boolean>(true);

  // Update the ref whenever state changes
  useEffect(() => {
    isRotatingRef.current = isRotating;
    console.log("Rotation state updated in ref:", isRotatingRef.current);
  }, [isRotating]);

  // State for hover information
  const [hoverInfo, setHoverInfo] = useState<{
    locationData: any | null;
    position: { x: number; y: number } | null;
  }>({
    locationData: null,
    position: null,
  });

  // Handle location hover
  const handleLocationHover = (
    locationData: any | null,
    position: { x: number; y: number } | null
  ) => {
    console.log("Location hover update:", locationData?.name || "none");
    setHoverInfo({ locationData, position });
  };

  useEffect(() => {
    if (!mountRef.current) return;
    console.log("Initializing globe with nearest marker hover detection");

    // Initialize scene
    const scene = new THREE.Scene();

    // Setup camera and renderer
    const camera = setupCamera();
    const renderer = setupRenderer();
    mountRef.current.appendChild(renderer.domElement);

    // Setup controls
    const controls = setupControls(camera, renderer);

    // Create a group to hold both the globe and country lines
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Create the globe and add it to the group
    const globe = createGlobe(radius, color, wireframe);
    globeGroup.add(globe);

    // Load and process GeoJSON data with stippling if enabled
    loadGeoJSONData(globeGroup, radius, lineColor);

    console.log("Adding location markers...");
    // Add location markers - IMPORTANT: Do this AFTER loading GeoJSON
    if (locations.length > 0) {
      addLocationMarkers(globeGroup, radius, locations, markerColor);
    }

    console.log(
      "Setting up hover interaction with nearest marker detection..."
    );
    // Setup hover interaction for locations
    setupLocationInteraction(
      camera,
      renderer,
      globeGroup,
      handleLocationHover,
      (rotating) => setIsRotating(rotating)
    );

    // Setup lighting
    setupLighting(scene);

    // Handle window resize
    const handleResize = createResizeHandler(camera, renderer, mountRef);
    window.addEventListener("resize", handleResize);

    // Setup animation loop with rotation control
    console.log(
      "Starting animation loop with initial rotation:",
      isRotatingRef.current
    );
    const animate = createAnimationLoop(
      globeGroup,
      controls,
      renderer,
      scene,
      camera,
      rotationSpeed,
      isRotatingRef
    );
    animate();

    // Cleanup
    return () => {
      console.log("Cleaning up globe component");
      window.removeEventListener("resize", handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }

      globe.geometry.dispose();
      (globe.material as THREE.Material).dispose();
    };
  }, [
    radius,
    color,
    wireframe,
    lineColor,
    rotationSpeed,
    stippleEnabled,
    markerColor,
    locations,
  ]); // Don't include isRotating in dependencies to avoid recreation of the scene

  return (
    <div ref={mountRef} style={{ width: "100%", height: "100vh" }}>
      {/* Optional debug indicator for rotation state */}
      {showDebugInfo && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            background: "rgba(0,0,0,0.7)",
            color: "white",
            padding: "5px",
            fontFamily: "monospace",
            fontSize: "12px",
            zIndex: 1000,
          }}
        >
          Rotation: {isRotating ? "Active" : "Paused"}
        </div>
      )}

      {/* Render the hover card when a location is hovered */}
      <LocationHoverCard
        locationData={hoverInfo.locationData}
        position={hoverInfo.position}
      />
    </div>
  );
};

export default YYGlobe;

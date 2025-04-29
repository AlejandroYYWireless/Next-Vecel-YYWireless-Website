/* eslint-disable  @typescript-eslint/no-explicit-any */

"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

interface YYGlobeProps {
  radius?: number;
  color?: string;
  wireframe?: boolean;
  background?: string;
  lineColor?: string;
}

interface Feature {
  type: string;
  properties: any;
  bbox?: number[];
  geometry: {
    type: string;
    coordinates: any[];
  };
}

interface GeoJSON {
  type: string;
  features: Feature[];
}

const YYGlobe: React.FC<YYGlobeProps> = ({
  radius = 1,
  color = "#0099ff",
  wireframe = false,
  background = "#000000",
  lineColor = "#ffffff",
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Initialize scene, camera and renderer
    const scene = new THREE.Scene();
    scene.background = null; // Making background transparent

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true, // Enable transparency
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Add controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.enablePan = false;

    // Enable full rotation
    controls.minPolarAngle = 0;
    controls.maxPolarAngle = Math.PI;
    controls.minAzimuthAngle = -Infinity;
    controls.maxAzimuthAngle = Infinity;

    // Load Earth texture
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load("/images/globe.jpg");

    // Create a group to hold both the globe and country lines
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Create the globe geometry and material with texture
    const geometry = new THREE.SphereGeometry(radius, 64, 64);
    const material = new THREE.MeshStandardMaterial({
      map: earthTexture,
      color: wireframe ? new THREE.Color(color) : 0xffffff, // Only apply color in wireframe mode
      wireframe: wireframe,
    });

    // Create the globe mesh and add it to the group
    const globe = new THREE.Mesh(geometry, material);
    globeGroup.add(globe);

    // Function to convert from latitude/longitude to 3D coordinates
    const latLongToVector3 = (lat: number, lon: number, radius: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);

      const x = -radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);

      return new THREE.Vector3(x, y, z);
    };

    // Load and parse GeoJSON data
    const loadGeoJSON = async () => {
      try {
        const response = await fetch("/data/globe-data.json");
        const geoJSON: GeoJSON = await response.json();

        // Create lines for country boundaries
        const lineMaterial = new THREE.LineBasicMaterial({
          color: new THREE.Color(lineColor),
          linewidth: 1,
        });

        // Process each feature (country)
        geoJSON.features.forEach((feature) => {
          if (feature.geometry.type === "Polygon") {
            feature.geometry.coordinates.forEach((ring: number[][]) => {
              const points: THREE.Vector3[] = [];

              // Convert each coordinate to a 3D point
              ring.forEach((coord: number[]) => {
                const lon = coord[0];
                const lat = coord[1];
                const point = latLongToVector3(lat, lon, radius * 1.001); // Slightly larger than globe to avoid z-fighting
                points.push(point);
              });

              // Create a line geometry from the points
              const lineGeometry = new THREE.BufferGeometry().setFromPoints(
                points
              );
              const line = new THREE.Line(lineGeometry, lineMaterial);
              // Add the line to the globe group instead of directly to the scene
              globeGroup.add(line);
            });
          } else if (feature.geometry.type === "MultiPolygon") {
            feature.geometry.coordinates.forEach((polygon: number[][][]) => {
              polygon.forEach((ring: number[][]) => {
                const points: THREE.Vector3[] = [];

                ring.forEach((coord: number[]) => {
                  const lon = coord[0];
                  const lat = coord[1];
                  const point = latLongToVector3(lat, lon, radius * 1.001);
                  points.push(point);
                });

                const lineGeometry = new THREE.BufferGeometry().setFromPoints(
                  points
                );
                const line = new THREE.Line(lineGeometry, lineMaterial);
                // Add the line to the globe group instead of directly to the scene
                globeGroup.add(line);
              });
            });
          }
        });

        console.log("GeoJSON data loaded and processed");
      } catch (error) {
        console.error("Error loading or parsing GeoJSON:", error);
      }
    };

    // Call the function to load and process GeoJSON
    loadGeoJSON();

    // Add ambient and directional light
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(2, 2, 5);
    scene.add(directionalLight);

    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current) return;

      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate the globe group (contains both the sphere and country lines)
      globeGroup.rotation.y += 0.005;

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
    };
  }, [radius, color, wireframe, background, lineColor]);

  return <div ref={mountRef} style={{ width: "100%", height: "100vh" }} />;
};

export default YYGlobe;

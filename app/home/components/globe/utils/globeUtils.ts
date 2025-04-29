/* eslint-disable  @typescript-eslint/no-explicit-any */

import * as THREE from "three";

/**
 * Converts latitude and longitude to 3D vector coordinates
 */
export const latLongToVector3 = (
  lat: number,
  lon: number,
  radius: number
): THREE.Vector3 => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);

  return new THREE.Vector3(x, y, z);
};

/**
 * Creates a resize handler for the Three.js scene
 */
export const createResizeHandler = (
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer,
  mountRef: React.RefObject<HTMLDivElement>
) => {
  return () => {
    if (!mountRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  };
};

/**
 * Sets up the camera for the globe scene
 */
export const setupCamera = (): THREE.PerspectiveCamera => {
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 3;
  return camera;
};

/**
 * Sets up the renderer for the globe scene
 */
export const setupRenderer = (): THREE.WebGLRenderer => {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true, // Enable transparency
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  return renderer;
};

/**
 * Sets up the basic lighting for the globe scene
 */
export const setupLighting = (scene: THREE.Scene): void => {
  // Add ambient light
  const ambientLight = new THREE.AmbientLight(0x404040, 1);
  scene.add(ambientLight);

  // Add directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(2, 2, 5);
  scene.add(directionalLight);
};

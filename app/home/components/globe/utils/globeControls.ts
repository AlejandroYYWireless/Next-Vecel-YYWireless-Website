/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

/**
 * Sets up orbit controls for the globe
 */
export const setupControls = (
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer
): OrbitControls => {
  const controls = new OrbitControls(camera, renderer.domElement);

  // Configure controls
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enableZoom = false;
  controls.enablePan = false;

  // Enable full rotation
  controls.minPolarAngle = 0;
  controls.maxPolarAngle = Math.PI;
  controls.minAzimuthAngle = -Infinity;
  controls.maxAzimuthAngle = Infinity;

  return controls;
};

/**
 * Creates an animation loop for the globe scene with rotation control
 */
export const createAnimationLoop = (
  globeGroup: THREE.Group,
  controls: OrbitControls,
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  rotationSpeed: number = 0.005,
  isRotatingRef: React.MutableRefObject<boolean>
): (() => void) => {
  const animate = () => {
    requestAnimationFrame(animate);

    // Only rotate if rotation is enabled
    if (isRotatingRef.current) {
      globeGroup.rotation.y += rotationSpeed;
    }

    controls.update();
    renderer.render(scene, camera);
  };

  return animate;
};

/**
 * Sets up interaction with location markers using nearest visible marker detection
 */
export const setupLocationInteraction = (
  camera: THREE.Camera,
  renderer: THREE.WebGLRenderer,
  globeGroup: THREE.Group,
  onLocationHover: (
    location: any | null,
    position: { x: number; y: number } | null
  ) => void,
  setIsRotating: (isRotating: boolean) => void
): void => {
  const raycaster = new THREE.Raycaster();
  raycaster.params.Points.threshold = 0.01;
  raycaster.params.Line.threshold = 0.01;

  const mouse = new THREE.Vector2();
  let hoveredObject: THREE.Object3D | null = null;
  let lastMouseEvent: MouseEvent | null = null;

  // Access materials from global scope (set in addLocationMarkers)
  const materials = globalThis.markerMaterials || {
    normal: null,
    hovered: null,
  };

  // Helper to convert mouse coordinates to normalized device coordinates
  const updateMouseCoordinates = (event: MouseEvent) => {
    const rect = renderer.domElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    mouse.x = (x / rect.width) * 2 - 1;
    mouse.y = -(y / rect.height) * 2 + 1;

    lastMouseEvent = event;
  };

  // Function to check if a point is on the visible side of the globe
  const isPointVisible = (
    position: THREE.Vector3,
    cameraPosition: THREE.Vector3
  ): boolean => {
    // Get the globe's world position (should be at the center)
    const globeWorldPosition = new THREE.Vector3();
    globeGroup.getWorldPosition(globeWorldPosition);

    // Vector from globe center to marker
    const globeToMarker = new THREE.Vector3().subVectors(
      position,
      globeWorldPosition
    );

    // Vector from globe center to camera
    const globeToCamera = new THREE.Vector3().subVectors(
      cameraPosition,
      globeWorldPosition
    );

    // Dot product is positive if they point in similar directions (marker is on visible side)
    // Negative if they point in opposite directions (marker is on back side)
    const dotProduct = globeToMarker.dot(globeToCamera);

    return dotProduct > 0;
  };

  // Handle mouse movement
  renderer.domElement.addEventListener("mousemove", (event) => {
    updateMouseCoordinates(event);

    // Update the raycaster
    raycaster.setFromCamera(mouse, camera);

    // Find markers group
    const markersGroup = globeGroup.children.find(
      (child) => child.userData?.isMarkerGroup
    );

    if (markersGroup) {
      // Find all markers
      const markers = markersGroup.children.filter(
        (child) => child.userData?.isLocationMarker
      );

      // Calculate distances to all VISIBLE markers
      const markersWithDistances = markers
        .filter((marker) => {
          // Get marker's world position
          const worldPosition = new THREE.Vector3();
          marker.getWorldPosition(worldPosition);

          // Only include markers on the visible side of the globe
          return isPointVisible(worldPosition, camera.position);
        })
        .map((marker) => {
          // Project marker position to screen space
          const vector = new THREE.Vector3();
          vector.setFromMatrixPosition(marker.matrixWorld);
          vector.project(camera);

          // Convert to screen coordinates
          const x = (vector.x * 0.5 + 0.5) * renderer.domElement.width;
          const y = (vector.y * -0.5 + 0.5) * renderer.domElement.height;

          // Calculate distance to mouse in screen space
          const rect = renderer.domElement.getBoundingClientRect();
          const mouseX = event.clientX - rect.left;
          const mouseY = event.clientY - rect.top;

          const dx = x - mouseX;
          const dy = y - mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          return {
            marker,
            distance,
            screenX: x + rect.left,
            screenY: y + rect.top,
          };
        });

      // Sort by distance
      markersWithDistances.sort((a, b) => a.distance - b.distance);

      // Find nearest marker if any exist
      const nearest =
        markersWithDistances.length > 0 ? markersWithDistances[0] : null;

      // Small threshold for precise hover detection
      const HOVER_THRESHOLD_PX = 20; // pixels

      if (nearest && nearest.distance < HOVER_THRESHOLD_PX) {
        // We have a visible marker close enough to consider it hovered
        if (hoveredObject !== nearest.marker) {
          // Reset old hovered object if exists
          if (hoveredObject && materials.normal) {
            (hoveredObject as THREE.Mesh).material = materials.normal;
          }

          // Set new hovered object
          hoveredObject = nearest.marker;

          // Change material to hovered state
          if (materials.hovered) {
            (hoveredObject as THREE.Mesh).material = materials.normal;
          }

          // Pause globe rotation
          setIsRotating(false);

          // Call the hover callback with the marker's screen position
          onLocationHover(nearest.marker.userData, {
            x: nearest.screenX,
            y: nearest.screenY,
          });
        }
      } else if (hoveredObject) {
        // No marker close enough, reset hover state
        if (materials.normal) {
          (hoveredObject as THREE.Mesh).material = materials.normal;
        }

        hoveredObject = null;

        // Resume globe rotation
        setIsRotating(true);
        onLocationHover(null, null);
      }
    }
  });

  // Clear hover state when mouse leaves the canvas
  renderer.domElement.addEventListener("mouseleave", () => {
    if (hoveredObject) {
      // Reset material
      if (materials.normal) {
        (hoveredObject as THREE.Mesh).material = materials.normal;
      }

      hoveredObject = null;
      setIsRotating(true);
      onLocationHover(null, null);
    }
  });
};

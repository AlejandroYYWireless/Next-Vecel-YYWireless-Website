"use client";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { useEffect, useRef } from "react";

export const ModelViewer = ({
  modelPath = "/models/iphone.glb",
  height = "400px",
  width = "100%",
}) => {
  // Add HTMLDivElement type to the ref to fix the type errors
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Core Three.js setup
    const scene = new THREE.Scene();

    // Get parent container dimensions
    const container = mountRef.current;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(
      55,
      containerWidth / containerHeight,
      0.1,
      1000
    );
    // Increased initial camera distance for reduced zoom
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerWidth, containerHeight);
    // Enable shadows in the renderer
    // renderer.shadowMap.enabled = true;
    // renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);

    // Enhanced lighting setup with multiple lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Main key light from front-right with shadow casting
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.0);
    keyLight.position.set(5, 5, 5);
    keyLight.castShadow = true;
    // Configure shadow properties for better quality
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 50;
    keyLight.shadow.camera.left = -10;
    keyLight.shadow.camera.right = 10;
    keyLight.shadow.camera.top = 10;
    keyLight.shadow.camera.bottom = -10;
    scene.add(keyLight);

    // Fill light from opposite side
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
    fillLight.position.set(-5, 2, -2);
    scene.add(fillLight);

    // Top light for better overall illumination
    const topLight = new THREE.DirectionalLight(0xffffff, 0.4);
    topLight.position.set(0, 8, 0);
    scene.add(topLight);

    // Add a ground plane to receive shadows
    const planeGeometry = new THREE.PlaneGeometry(20, 20);
    const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.3 });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2; // Rotate to horizontal
    plane.position.y = -0.8; // Position closer to the model
    plane.receiveShadow = true;
    scene.add(plane);

    // Add orbit controls with custom settings
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.minDistance = 1.9; // Limit how close you can zoom
    controls.maxDistance = 2; // Limit how far you can zoom
    controls.target.set(0, 0.1, 0); // Adjust target height to match new model position

    // Load the model
    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        const model = gltf.scene;

        // Calculate model bounds
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        // Create a group to hold the model
        const modelGroup = new THREE.Group();

        // Add the model to the group
        modelGroup.add(model);

        // Position the model within the group so its center is at the group's origin
        model.position.set(-center.x, -center.y, -center.z);

        // Enable shadows for all objects in the model
        model.traverse((object) => {
          // Add type guard to fix the isMesh error
          if (object instanceof THREE.Mesh) {
            object.castShadow = true;
            object.receiveShadow = true;
          }
        });

        // Add the group to the scene
        scene.add(modelGroup);

        // Set controls target to the center of the model
        controls.target.copy(modelGroup.position);

        // Auto-scale if needed, but with reduced scale for "zoomed out" effect
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 1.5 / maxDim; // Smaller scale factor for reduced zoom
        modelGroup.scale.set(scale, scale, scale);

        // Position the model closer to the floor
        modelGroup.position.y = 0.1;
      },
      undefined,
      (error) => console.error("Error loading model:", error)
    );

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle container resize
    const handleResize = () => {
      if (!mountRef.current) return;

      const newWidth = mountRef.current.clientWidth;
      const newHeight = mountRef.current.clientHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    // Use ResizeObserver to detect parent container size changes
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      resizeObserver.disconnect();
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [modelPath]);

  return (
    <div
      className="w-full relative rounded-lg"
      ref={mountRef}
      style={{ height, width }}
    />
  );
};

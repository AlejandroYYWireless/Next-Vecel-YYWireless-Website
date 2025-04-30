import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { useEffect, useRef } from "react";

export const ModelViewer = ({
  modelPath = "/models/iphone.glb",
  height = "400px",
}) => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Core Three.js setup
    const scene = new THREE.Scene();

    // Get parent container dimensions
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 1000);
    camera.position.z = 2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    // Enhanced lighting setup with multiple lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    // Main key light from front-right
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(1, 2, 3);
    scene.add(keyLight);

    // Fill light from opposite side
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.8);
    fillLight.position.set(-2, 1, -1);
    scene.add(fillLight);

    // Top light for better overall illumination
    const topLight = new THREE.DirectionalLight(0xffffff, 0.6);
    topLight.position.set(0, 5, 0);
    scene.add(topLight);

    // Add orbit controls with target set to scene center
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    // Setting the target to the origin ensures rotation around center
    controls.target.set(0, 0, 0);

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

        // Add the group to the scene
        scene.add(modelGroup);

        // Set controls target to the center of the model
        controls.target.copy(modelGroup.position);

        // Auto-scale if needed
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2 / maxDim; // Increased scale factor for closer view
        modelGroup.scale.set(scale, scale, scale);
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

  return <div className="w-full" ref={mountRef} style={{ height: height }} />;
};

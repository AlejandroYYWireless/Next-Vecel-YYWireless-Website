/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import * as THREE from "three";
import { latLongToVector3 } from "./globeUtils";
import { GlobeLocation } from "./globeLocations";
/**
 * Creates the basic globe geometry and material
 */
export const createGlobe = (
  radius: number,
  color: string,
  wireframe: boolean
): THREE.Mesh => {
  // Load Earth texture
  const textureLoader = new THREE.TextureLoader();
  const earthTexture = textureLoader.load("/images/globe.jpg");

  // Create the globe geometry and material with texture
  const geometry = new THREE.SphereGeometry(radius, 64, 64);
  const material = new THREE.MeshStandardMaterial({
    map: earthTexture,
    color: wireframe ? new THREE.Color(color) : new THREE.Color(color),
    wireframe: wireframe,
    transparent: true,
    opacity: 0.9,
  });

  // Create the globe mesh
  return new THREE.Mesh(geometry, material);
};

/**
 * Interface definitions for GeoJSON data
 */
export interface Feature {
  type: string;
  properties: any;
  bbox?: number[];
  geometry: {
    type: string;
    coordinates: any[];
  };
}

export interface GeoJSON {
  type: string;
  features: Feature[];
}

/**
 * Loads and processes GeoJSON data to create country boundary lines
 */
export const loadGeoJSONData = async (
  globeGroup: THREE.Group,
  radius: number,
  lineColor: string
): Promise<void> => {
  try {
    const response = await fetch("/data/globe-data.json");
    const geoJSON: GeoJSON = await response.json();

    // Create lines for country boundaries
    const lineMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color(lineColor),
      linewidth: 1,
    });

    // Create stipple points group
    const pointsGroup = new THREE.Group();
    globeGroup.add(pointsGroup);

    // Process each feature (country)
    geoJSON.features.forEach((feature) => {
      if (feature.geometry.type === "Polygon") {
        processPolygon(
          feature.geometry.coordinates,
          radius,
          lineMaterial,
          globeGroup
        );
        addStipplingToPolygon(
          feature.geometry.coordinates,
          radius,
          pointsGroup
        );
      } else if (feature.geometry.type === "MultiPolygon") {
        processMultiPolygon(
          feature.geometry.coordinates,
          radius,
          lineMaterial,
          globeGroup
        );
        addStipplingToMultiPolygon(
          feature.geometry.coordinates,
          radius,
          pointsGroup
        );
      }
    });

    console.log("GeoJSON data loaded and processed");
  } catch (error) {
    console.error("Error loading or parsing GeoJSON:", error);
  }
};

/**
 * Processes a polygon feature and adds it to the globe group
 */
const processPolygon = (
  coordinates: number[][][],
  radius: number,
  material: THREE.LineBasicMaterial,
  globeGroup: THREE.Group
): void => {
  coordinates.forEach((ring: number[][]) => {
    const points: THREE.Vector3[] = [];

    // Convert each coordinate to a 3D point
    ring.forEach((coord: number[]) => {
      const lon = coord[0];
      const lat = coord[1];
      const point = latLongToVector3(lat, lon, radius * 1.001); // Slightly larger than globe to avoid z-fighting
      points.push(point);
    });

    // Create a line geometry from the points
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(lineGeometry, material);
    globeGroup.add(line);
  });
};

/**
 * Processes a multi-polygon feature and adds it to the globe group
 */
const processMultiPolygon = (
  coordinates: number[][][][],
  radius: number,
  material: THREE.LineBasicMaterial,
  globeGroup: THREE.Group
): void => {
  coordinates.forEach((polygon: number[][][]) => {
    polygon.forEach((ring: number[][]) => {
      const points: THREE.Vector3[] = [];

      ring.forEach((coord: number[]) => {
        const lon = coord[0];
        const lat = coord[1];
        const point = latLongToVector3(lat, lon, radius * 1.001);
        points.push(point);
      });

      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(lineGeometry, material);
      globeGroup.add(line);
    });
  });
};

/**
 * Calculates the approximate area of a polygon on a sphere
 * Using spherical geometry approximation for simplicity
 */
const calculateSphericalPolygonArea = (
  ring: number[][],
  radius: number
): number => {
  if (ring.length < 3) return 0;

  // Convert to radians for spherical calculations
  const vertices = ring.map((coord) => {
    return {
      lon: (coord[0] * Math.PI) / 180,
      lat: (coord[1] * Math.PI) / 180,
    };
  });

  // Calculate area using spherical excess formula
  let sum = 0;
  for (let i = 0; i < vertices.length; i++) {
    const j = (i + 1) % vertices.length;
    const k = (i + 2) % vertices.length;

    // Calculate angles between vectors
    const a = Math.acos(
      Math.sin(vertices[i].lat) * Math.sin(vertices[j].lat) +
        Math.cos(vertices[i].lat) *
          Math.cos(vertices[j].lat) *
          Math.cos(vertices[i].lon - vertices[j].lon)
    );

    const b = Math.acos(
      Math.sin(vertices[j].lat) * Math.sin(vertices[k].lat) +
        Math.cos(vertices[j].lat) *
          Math.cos(vertices[k].lat) *
          Math.cos(vertices[j].lon - vertices[k].lon)
    );

    const c = Math.acos(
      Math.sin(vertices[k].lat) * Math.sin(vertices[i].lat) +
        Math.cos(vertices[k].lat) *
          Math.cos(vertices[i].lat) *
          Math.cos(vertices[k].lon - vertices[i].lon)
    );

    // Calculate spherical excess
    const s = (a + b + c) / 2;
    const excess =
      4 *
      Math.atan(
        Math.sqrt(
          Math.max(
            0,
            Math.tan(s / 2) *
              Math.tan((s - a) / 2) *
              Math.tan((s - b) / 2) *
              Math.tan((s - c) / 2)
          )
        )
      );

    sum += excess;
  }

  // Calculate area based on spherical excess and radius
  return Math.abs(sum) * radius * radius;
};

/**
 * Adds stippling (dots) to a polygon area with density based on area
 */
const addStipplingToPolygon = (
  coordinates: number[][][],
  radius: number,
  pointsGroup: THREE.Group
): void => {
  // Only process the first ring (outer boundary) for simplicity
  if (coordinates.length === 0) return;

  const ring = coordinates[0];
  if (ring.length < 3) return; // Need at least 3 points to form an area

  // Calculate the area of the polygon to determine stipple density
  const polygonArea = calculateSphericalPolygonArea(ring, radius);

  // Determine stipple density - base number of points on the area
  // For reference, the area of a hemisphere is 2π*r², full sphere is 4π*r²
  // We use a density constant to control points per unit area
  const densityFactor = 500; // Adjust this to change overall stipple density
  const stippleCount = Math.max(10, Math.floor(polygonArea * densityFactor));

  // Compute the centroid of the polygon
  let centroidLat = 0;
  let centroidLon = 0;
  ring.forEach((coord) => {
    centroidLon += coord[0];
    centroidLat += coord[1];
  });
  centroidLon /= ring.length;
  centroidLat /= ring.length;

  // Create stippling points
  const stippleGeometry = new THREE.BufferGeometry();
  const stipplePositions = new Float32Array(stippleCount * 3);
  const stippleColors = new Float32Array(stippleCount * 3);

  // Determine polygon extents
  let minLat = Infinity,
    maxLat = -Infinity,
    minLon = Infinity,
    maxLon = -Infinity;
  ring.forEach((coord) => {
    minLon = Math.min(minLon, coord[0]);
    maxLon = Math.max(maxLon, coord[0]);
    minLat = Math.min(minLat, coord[1]);
    maxLat = Math.max(maxLat, coord[1]);
  });

  // Add some padding to ensure we cover the area
  const latRange = maxLat - minLat;
  const lonRange = maxLon - minLon;
  minLat -= latRange * 0.1;
  maxLat += latRange * 0.1;
  minLon -= lonRange * 0.1;
  maxLon += lonRange * 0.1;

  // Create a grid-like distribution of points for more even coverage
  const gridSize = Math.ceil(Math.sqrt(stippleCount));
  const latStep = (maxLat - minLat) / gridSize;
  const lonStep = (maxLon - minLon) / gridSize;

  // Function to check if a point is inside a polygon (ray casting algorithm)
  const isPointInPolygon = (
    lon: number,
    lat: number,
    poly: number[][]
  ): boolean => {
    let inside = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const xi = poly[i][0],
        yi = poly[i][1];
      const xj = poly[j][0],
        yj = poly[j][1];

      const intersect =
        yi > lat !== yj > lat &&
        lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }
    return inside;
  };

  // Generate points in a grid pattern, with small random offsets
  let pointCount = 0;

  // Try to place up to stippleCount points
  const maxAttempts = stippleCount * 3; // Limit attempts to avoid infinite loops
  let attempts = 0;

  while (pointCount < stippleCount && attempts < maxAttempts) {
    attempts++;

    // Determine grid position with small random offset for natural look
    const gridX = Math.floor(attempts % gridSize);
    const gridY = Math.floor(attempts / gridSize);

    const lon =
      minLon + gridX * lonStep + (Math.random() - 0.5) * lonStep * 0.8;
    const lat =
      minLat + gridY * latStep + (Math.random() - 0.5) * latStep * 0.8;

    // Check if this point is inside the polygon
    if (isPointInPolygon(lon, lat, ring)) {
      // Convert to 3D coordinates
      const point = latLongToVector3(lat, lon, radius * 1.002);

      const idx = pointCount * 3;
      stipplePositions[idx] = point.x;
      stipplePositions[idx + 1] = point.y;
      stipplePositions[idx + 2] = point.z;

      // Set color (white with slight variations for natural look)
      const brightness = 0.8 + Math.random() * 0.2; // 0.8-1.0 range for slight variation
      stippleColors[idx] = brightness;
      stippleColors[idx + 1] = brightness;
      stippleColors[idx + 2] = brightness;

      pointCount++;
    }
  }

  // Trim arrays to actual number of points found
  const trimmedPositions = new Float32Array(pointCount * 3);
  const trimmedColors = new Float32Array(pointCount * 3);

  for (let i = 0; i < pointCount * 3; i++) {
    trimmedPositions[i] = stipplePositions[i];
    trimmedColors[i] = stippleColors[i];
  }

  // Set attributes to geometry
  stippleGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(trimmedPositions, 3)
  );
  stippleGeometry.setAttribute(
    "color",
    new THREE.BufferAttribute(trimmedColors, 3)
  );

  // Create points material - smaller size for denser coverage
  const stippleMaterial = new THREE.PointsMaterial({
    size: 0.005, // Smaller points for more of a shading effect
    vertexColors: true,
    transparent: true,
    opacity: 0.7,
  });

  // Create points and add to parent group
  const stipplePoints = new THREE.Points(stippleGeometry, stippleMaterial);
  pointsGroup.add(stipplePoints);
};

/**
 * Adds stippling to a multi-polygon feature
 */
const addStipplingToMultiPolygon = (
  coordinates: number[][][][],
  radius: number,
  pointsGroup: THREE.Group
): void => {
  coordinates.forEach((polygon: number[][][]) => {
    addStipplingToPolygon(polygon, radius, pointsGroup);
  });
};
/**
 * Adds location markers (dots) to the globe with improved precision for hover detection
 */
export const addLocationMarkers = (
  globeGroup: THREE.Group,
  radius: number,
  locations: GlobeLocation[],
  markerColor: string = "#ffcc00"
): void => {
  console.log(
    "Creating markers for",
    locations.length,
    "locations with improved precision"
  );

  // Create a group for location markers
  const markersGroup = new THREE.Group();
  // Set userData flag to easily identify this group later
  markersGroup.userData = { isMarkerGroup: true };

  // Create material for the normal markers
  const normalMarkerMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color(markerColor),
    transparent: false, // Solid for better visibility
    opacity: 1.0,
  });

  // Create material for hovered markers (green)
  const hoveredMarkerMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color("#00ff00"), // Bright green
    transparent: false,
    opacity: 1.0,
  });

  // Better balanced size for markers
  const DEFAULT_MARKER_SIZE = 0.02;

  // Store reference to materials for access by hover function
  globalThis.markerMaterials = {
    normal: normalMarkerMaterial,
    hovered: hoveredMarkerMaterial,
  };

  // Add each location marker
  locations.forEach((location) => {
    // Convert lat/long to vector using more precise calculation
    const position = latLongToVector3(
      location.lat,
      location.long,
      radius * 1.003
    );

    // Create marker geometry with more segments for better precision
    const markerSize = location.size
      ? location.size * 0.02
      : DEFAULT_MARKER_SIZE;

    // Use SphereGeometry with more segments for better precision
    const markerGeometry = new THREE.SphereGeometry(markerSize, 16, 16);

    // Create marker mesh with normal material
    const marker = new THREE.Mesh(markerGeometry, normalMarkerMaterial);
    marker.position.copy(position);

    // Add custom flag to userData
    marker.userData = {
      isLocationMarker: true,
      ...location,
    };

    // Add to markers group
    markersGroup.add(marker);

    // DEBUG: Add coordinate axes to check alignment (only for the first few markers)
    if (locations.indexOf(location) < 3) {
      const axesHelper = new THREE.AxesHelper(markerSize * 2);
      axesHelper.position.copy(position);
      markersGroup.add(axesHelper);
    }
  });

  console.log("Added", markersGroup.children.length, "markers to the group");

  // Add the markers group to the globe group
  globeGroup.add(markersGroup);
};

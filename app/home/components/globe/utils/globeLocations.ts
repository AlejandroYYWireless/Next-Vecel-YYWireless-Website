/* eslint-disable  @typescript-eslint/no-explicit-any */

/**
 * Interface for globe location points
 */
export interface GlobeLocation {
  name: string;
  lat: number;
  long: number;
  size?: number;
}

/**
 * Example set of major world locations
 */
export const worldCities: GlobeLocation[] = [
  { name: "New York", lat: 40.7128, long: -74.006, size: 1.0 },
  { name: "YYWireless", lat: 41.6122, long: -93.747, size: 1.5 },
  { name: "London", lat: 51.5074, long: -0.1278, size: 0.9 },
  { name: "Tokyo", lat: 35.6762, long: 139.6503, size: 1.0 },
  { name: "Paris", lat: 48.8566, long: 2.3522, size: 0.8 },
  { name: "Beijing", lat: 39.9042, long: 116.4074, size: 0.95 },
  { name: "Moscow", lat: 55.7558, long: 37.6173, size: 0.85 },
  { name: "Sydney", lat: -33.8688, long: 151.2093, size: 0.8 },
  { name: "Rio de Janeiro", lat: -22.9068, long: -43.1729, size: 0.75 },
  { name: "Cairo", lat: 30.0444, long: 31.2357, size: 0.7 },
  { name: "Cape Town", lat: -33.9249, long: 18.4241, size: 0.7 },
  { name: "Los Angeles", lat: 34.0522, long: -118.2437, size: 0.85 },
  { name: "Mumbai", lat: 19.076, long: 72.8777, size: 0.9 },
  { name: "Singapore", lat: 1.3521, long: 103.8198, size: 0.7 },
  { name: "Berlin", lat: 52.52, long: 13.405, size: 0.75 },
  { name: "Toronto", lat: 43.6532, long: -79.3832, size: 0.7 },
  { name: "Dubai", lat: 25.2048, long: 55.2708, size: 0.8 },
  { name: "Mexico City", lat: 19.4326, long: -99.1332, size: 0.85 },
  { name: "Bangkok", lat: 13.7563, long: 100.5018, size: 0.8 },
  { name: "Seoul", lat: 37.5665, long: 126.978, size: 0.85 },
  { name: "Santiago", lat: -33.4489, long: -70.6693, size: 0.7 },
];

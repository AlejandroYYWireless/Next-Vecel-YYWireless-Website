// globals.d.ts
export {};

declare global {
  interface MarkerMaterials {
    normal: THREE.Material | null;
    hovered: THREE.Material | null;
  }

  interface Global {
    markerMaterials?: MarkerMaterials;
  }

  // Extend globalThis with markerMaterials
  var markerMaterials: MarkerMaterials;
}

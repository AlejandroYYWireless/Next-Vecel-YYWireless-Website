/* eslint-disable  @typescript-eslint/no-explicit-any */

import React from "react";

interface LocationHoverCardProps {
  locationData: any | null;
  position: { x: number; y: number } | null;
}

const LocationHoverCard: React.FC<LocationHoverCardProps> = ({
  locationData,
  position,
}) => {
  if (!locationData || !position) return null;

  // Determine position to avoid going off-screen
  const isNearRight = position.x > window.innerWidth - 150;
  const isNearBottom = position.y > window.innerHeight - 100;

  // Position card to avoid going off-screen and to not cover the marker
  const style: React.CSSProperties = {
    position: "fixed",
    left: isNearRight ? `${position.x - 150}px` : `${position.x + 15}px`,
    top: isNearBottom ? `${position.y - 100}px` : `${position.y + 15}px`,
    zIndex: 1000,
    pointerEvents: "none",
    transition: "opacity 0.2s ease-in-out", // Smooth appearance
    opacity: 1,
  };

  return (
    <div style={style}>
      <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 min-w-48">
        <div className="flex flex-col space-y-1">
          <h4 className="text-lg font-semibold">{locationData.name}</h4>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {locationData.lat.toFixed(2)}°, {locationData.long.toFixed(2)}°
          </p>
          {locationData.description && (
            <p className="text-sm mt-1">{locationData.description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationHoverCard;

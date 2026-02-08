"use client";

import { useEffect, useState } from "react";

export default function TrackRidePage() {
  // Fixed user location
  const userLocation = "Connaught Place, Delhi";

  // Simulated driver locations (looping path)
  const driverPath = [
    "Karol Bagh, Delhi",
    "Rajiv Chowk, Delhi",
    "Paharganj, Delhi",
  ];

  const [driverIndex, setDriverIndex] = useState(0);

  // Looping real-time movement (text only)
  useEffect(() => {
    const interval = setInterval(() => {
      setDriverIndex((prev) => (prev + 1) % driverPath.length);
    }, 3000); // every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // FIXED map route (prevents iframe refresh)
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    driverPath[0]
  )}+to+${encodeURIComponent(userLocation)}&output=embed`;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Real-Time Ride Tracking</h1>

      <div className="bg-white p-4 rounded-xl shadow space-y-2">
        <p>
          <b>User Location:</b> {userLocation}
        </p>
        <p>
          <b>Driver Location:</b> {driverPath[driverIndex]}
        </p>
        <p className="text-sm text-gray-500">
          Driver location updates in real time
        </p>
        <p className="text-xs text-gray-400">
          Map remains fixed while live location updates are simulated
        </p>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <iframe
          title="live-tracking-map"
          src={mapUrl}
          className="w-full h-[400px]"
          loading="lazy"
        />
      </div>
    </div>
  );
}


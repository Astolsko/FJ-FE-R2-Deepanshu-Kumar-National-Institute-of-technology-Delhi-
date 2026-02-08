"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function TrackRidePage() {
  // ---- ALL HOOKS FIRST (NO CONDITIONS ABOVE) ----
  const [hasActiveRide, setHasActiveRide] = useState(false);
  const [driverIndex, setDriverIndex] = useState(0);

  const userLocation = "Connaught Place, Delhi";
  const driverPath = [
    "Karol Bagh, Delhi",
    "Rajiv Chowk, Delhi",
    "Paharganj, Delhi",
  ];

  // Check active ride
  useEffect(() => {
    const activeRide = localStorage.getItem("activeRide");
    setHasActiveRide(activeRide === "true");
  }, []);

  // Simulate driver movement ONLY if ride is active
  useEffect(() => {
    if (!hasActiveRide) return;

    const interval = setInterval(() => {
      setDriverIndex((prev) => (prev + 1) % driverPath.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [hasActiveRide]);

  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    driverPath[0]
  )}+to+${encodeURIComponent(userLocation)}&output=embed`;

  // ---- UI RENDERING ONLY BELOW ----
  if (!hasActiveRide) {
    return (
      <div className="max-w-xl mx-auto text-center space-y-6 mt-20">
        <h1 className="text-2xl font-bold">No Active Ride</h1>
        <p className="text-gray-500">
          You haven’t booked any ride yet.
        </p>

        <Link
          href="/book-ride"
          className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:opacity-90"
        >
          Book a Ride
        </Link>
      </div>
    );
  }

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
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <iframe
          title="tracking-map"
          src={mapUrl}
          className="w-full h-[400px]"
          loading="lazy"
        />
      </div>
    </div>
  );
}


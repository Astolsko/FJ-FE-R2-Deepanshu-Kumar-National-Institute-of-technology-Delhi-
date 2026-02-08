"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type RideDetails = {
  pickup: string;
  destination: string;
  rideType: string;
  shared: boolean;
  passengers: number;
};

export default function TrackRidePage() {
  const router = useRouter();

  const [ride, setRide] = useState<RideDetails | null>(null);
  const [driverIndex, setDriverIndex] = useState(0);

  // Simulated driver movement path
  const driverPath = [
    "Connaught Place, Delhi",
    "Rajiv Chowk, Delhi",
    "Karol Bagh, Delhi",
    "Patel Nagar, Delhi",
    "Connaught Place, Delhi",
  ];

  // Load active ride
  useEffect(() => {
    const activeRide = localStorage.getItem("activeRide");
    const paymentDone = localStorage.getItem("paymentDone");
    const rideDetails = localStorage.getItem("activeRideDetails");

    if (!activeRide || !paymentDone || !rideDetails) {
      setRide(null);
      return;
    }

    setRide(JSON.parse(rideDetails));
  }, []);

  // Driver movement simulation
  useEffect(() => {
    if (!ride) return;

    const interval = setInterval(() => {
      setDriverIndex((prev) => (prev + 1) % driverPath.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [ride]);

  // End ride → go to feedback
  const endRide = () => {
    router.push("/feedback");
  };

  // 🚫 No active ride
  if (!ride) {
    return (
      <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow text-center">
        <h1 className="text-xl font-bold">Track Ride</h1>
        <p className="text-gray-600 mt-2">
          You don’t have any active ride right now.
        </p>
      </div>
    );
  }

  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    driverPath[driverIndex]
  )}&output=embed`;

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6">
      <h1 className="text-3xl font-semibold">
        Ride in Progress 🚕
      </h1>

      {/* Ride Details */}
      <div className="bg-white p-6 rounded-2xl shadow space-y-2">
        <p>
          <strong>Pickup:</strong> {ride.pickup}
        </p>
        <p>
          <strong>Destination:</strong> {ride.destination}
        </p>
        <p>
          <strong>Ride Type:</strong> {ride.rideType}
        </p>
        <p>
          <strong>Passengers:</strong> {ride.passengers}
        </p>
        <p className="text-green-600 font-medium">
          Driver Location: {driverPath[driverIndex]}
        </p>
      </div>

      {/* Map */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <iframe
          title="driver-map"
          src={mapUrl}
          className="w-full h-[420px]"
          loading="lazy"
        />
      </div>

      {/* End Ride */}
      <button
        onClick={endRide}
        className="w-full bg-red-600 text-white py-3 rounded-xl text-lg hover:opacity-90 transition"
      >
        End Ride & Give Feedback
      </button>
    </div>
  );
}


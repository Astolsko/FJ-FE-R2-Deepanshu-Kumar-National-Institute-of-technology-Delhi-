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

  // Fake driver movement path (looping)
  const driverPath = [
    "Connaught Place, Delhi",
    "Rajiv Chowk, Delhi",
    "Karol Bagh, Delhi",
    "Patel Nagar, Delhi",
    "Connaught Place, Delhi",
  ];

  // Load ride details
  useEffect(() => {
    const activeRide = localStorage.getItem("activeRide");
    const rideDetails = localStorage.getItem("activeRideDetails");

    if (!activeRide || !rideDetails) {
      setRide(null);
      return;
    }

    setRide(JSON.parse(rideDetails));
  }, []);

  // Driver movement (runs only when ride exists)
  useEffect(() => {
    if (!ride) return;

    const interval = setInterval(() => {
      setDriverIndex((prev) => (prev + 1) % driverPath.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [ride]);

  const endRide = () => {
    alert("Ride completed!");

    // Clear all ride-related data
    localStorage.removeItem("activeRide");
    localStorage.removeItem("paymentDone");
    localStorage.removeItem("ridePayment");
    localStorage.removeItem("activeRideDetails");

    router.push("/dashboard");
  };

  // No active ride
  if (!ride) {
    return (
      <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-xl font-bold">Track Ride</h1>
        <p className="text-gray-600 mt-2">
          You haven’t booked any ride yet.
        </p>
      </div>
    );
  }

  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    driverPath[driverIndex]
  )}&output=embed`;

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Real-Time Ride Tracking</h1>

      <div className="bg-white p-4 rounded-xl shadow space-y-2">
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
        <p>
          <strong>Driver Location:</strong>{" "}
          {driverPath[driverIndex]}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <iframe
          title="driver-map"
          src={mapUrl}
          className="w-full h-[400px]"
          loading="lazy"
        />
      </div>

      <button
        onClick={endRide}
        className="w-full bg-red-600 text-white py-3 rounded-lg hover:opacity-90"
      >
        End Ride
      </button>
    </div>
  );
}


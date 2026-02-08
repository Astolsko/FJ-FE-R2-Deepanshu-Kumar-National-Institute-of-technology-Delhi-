"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "../components/ToastProvider";

type RideDetails = {
  pickup: string;
  destination: string;
  rideType: string;
  shared: boolean;
  passengers: number;
};

type RideStage =
  | "assigned"
  | "approaching"
  | "in_progress"
  | "near_destination";

export default function TrackRidePage() {
  const router = useRouter();
  const { showToast } = useToast();

  const [ride, setRide] = useState<RideDetails | null>(null);
  const [stage, setStage] = useState<RideStage>("assigned");
  const [progress, setProgress] = useState(0);

  // Logical driver path
  const driverPath = [
    "Driver assigned",
    "Approaching pickup location",
    "Ride in progress",
    "Near destination",
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
    showToast("Driver assigned 🚕", "info");
  }, []);

  // Smooth ride progression
  useEffect(() => {
    if (!ride) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1;

        // Stage transitions
        if (next === 2) {
          setStage("approaching");
          showToast("Driver is arriving at pickup 📍", "info");
        }

        if (next === 5) {
          setStage("in_progress");
        }

        if (next === 8) {
          setStage("near_destination");
          showToast("You’re near your destination 🏁", "info");
        }

        return next;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [ride]);

  const endRide = () => {
    showToast("Ride completed 🏁", "success");
    setTimeout(() => router.push("/feedback"), 900);
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
          Status: {driverPath[Math.min(progress, driverPath.length - 1)]}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="bg-white p-4 rounded-2xl shadow">
        <p className="text-sm text-gray-500 mb-2">
          Trip Progress
        </p>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-black h-3 rounded-full transition-all"
            style={{ width: `${Math.min(progress * 10, 100)}%` }}
          />
        </div>
      </div>

      {/* End Ride */}
      {stage === "near_destination" && (
        <button
          onClick={endRide}
          className="w-full bg-red-600 text-white py-3 rounded-xl text-lg hover:opacity-90 transition"
        >
          End Ride & Give Feedback
        </button>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "../components/ToastProvider";

type RideDetails = {
  pickup: string;
  destination: string;
  rideType: string;
  passengers: number;
};

type Stage =
  | "assigned"
  | "approaching"
  | "in_progress"
  | "near_destination";

export default function TrackRidePage() {
  const router = useRouter();
  const { showToast } = useToast();

  const [ride, setRide] = useState<RideDetails | null>(null);
  const [stage, setStage] = useState<Stage>("assigned");

  const stageIndex = {
    assigned: 0,
    approaching: 1,
    in_progress: 2,
    near_destination: 3,
  };

  const driverLocations = [
    "Connaught Place, Delhi",
    "Rajiv Chowk, Delhi",
    "Karol Bagh, Delhi",
    "Patel Nagar, Delhi",
  ];

  // Load ride
  useEffect(() => {
    const details = localStorage.getItem("activeRideDetails");
    const activeRide = localStorage.getItem("activeRide");
    const paymentDone = localStorage.getItem("paymentDone");

    if (!details || !activeRide || !paymentDone) return;

    setRide(JSON.parse(details));
    showToast("Driver assigned 🚕", "info");
  }, []);

  // Stage progression (EVENT BASED)
  useEffect(() => {
    if (!ride) return;

    const timeline = [
      () => {
        setStage("approaching");
        showToast("Driver arriving at pickup 📍", "info");
      },
      () => {
        setStage("in_progress");
      },
      () => {
        setStage("near_destination");
        showToast("Near destination 🏁", "info");
      },
    ];

    let step = 0;

    const interval = setInterval(() => {
      if (step < timeline.length) {
        timeline[step]();
        step++;
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [ride]);

  const endRide = () => {
    showToast("Ride completed 🏁", "success");
    setTimeout(() => router.push("/feedback"), 900);
  };

  if (!ride) {
    return (
      <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow text-center">
        <h1 className="text-xl font-bold">Track Ride</h1>
        <p className="text-gray-600 mt-2">
          No active ride found.
        </p>
      </div>
    );
  }

  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    driverLocations[stageIndex[stage]]
  )}&output=embed`;

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6">
      <h1 className="text-3xl font-semibold">
        Ride in Progress 🚕
      </h1>

      <div className="bg-white p-6 rounded-2xl shadow">
        <p><strong>Pickup:</strong> {ride.pickup}</p>
        <p><strong>Destination:</strong> {ride.destination}</p>
        <p><strong>Status:</strong> {stage.replace("_", " ")}</p>
      </div>

      {/* MAP (RESTORED) */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <iframe
          title="driver-map"
          src={mapUrl}
          className="w-full h-[420px]"
          loading="lazy"
        />
      </div>

      {stage === "near_destination" && (
        <button
          onClick={endRide}
          className="w-full bg-red-600 text-white py-3 rounded-xl text-lg hover:opacity-90"
        >
          End Ride & Give Feedback
        </button>
      )}
    </div>
  );
}

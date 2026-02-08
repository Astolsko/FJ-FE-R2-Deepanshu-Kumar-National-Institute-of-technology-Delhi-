"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "../components/ToastProvider";

type RideDetails = {
  pickup: string;
  destination: string;
};

type Stage = "assigned" | "approaching" | "in_progress" | "near_destination";

export default function TrackRidePage() {
  const router = useRouter();
  const { showToast } = useToast();

  const [ride, setRide] = useState<RideDetails | null>(null);
  const [stage, setStage] = useState<Stage>("assigned");
  const [eta, setEta] = useState(8); // minutes

  // Load ride
  useEffect(() => {
    const details = localStorage.getItem("activeRideDetails");
    const activeRide = localStorage.getItem("activeRide");
    const paymentDone = localStorage.getItem("paymentDone");

    if (!details || !activeRide || !paymentDone) return;

    setRide(JSON.parse(details));
    showToast("Driver assigned 🚕", "info");
  }, []);

  // ETA countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setEta((prev) => (prev > 0 ? prev - 1 : 0));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Ride stages
  useEffect(() => {
    if (!ride) return;

    const timeline = [
      () => {
        setStage("approaching");
        setEta(5);
        showToast("Driver arriving 📍", "info");
      },
      () => {
        setStage("in_progress");
        setEta(3);
      },
      () => {
        setStage("near_destination");
        setEta(1);
        showToast("Near destination 🏁", "info");
      },
    ];

    let step = 0;
    const interval = setInterval(() => {
      if (step < timeline.length) {
        timeline[step]();
        step++;
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [ride]);

  const endRide = () => {
    localStorage.setItem("chatClosed", "true");
    showToast("Ride completed 🏁", "success");
    setTimeout(() => router.push("/feedback"), 900);
  };

  if (!ride) {
    return (
      <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow text-center">
        <p>No active ride</p>
      </div>
    );
  }

  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    ride.pickup
  )}+to+${encodeURIComponent(ride.destination)}&output=embed`;

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6">
      <h1 className="text-3xl font-semibold">Ride in Progress 🚕</h1>

      {/* DRIVER CARD */}
      <div className="bg-white p-5 rounded-2xl shadow flex items-center gap-4">
        <img
          src="https://i.pravatar.cc/100?img=12"
          className="w-16 h-16 rounded-full"
        />
        <div>
          <p className="font-semibold">Rohit Sharma ⭐ 4.8</p>
          <p className="text-sm text-gray-500">
            White Swift • DL 01 AB 2345
          </p>
          <p className="text-green-600 text-sm">
            ETA: {eta} min
          </p>
        </div>
      </div>

      {/* MAP */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <iframe src={mapUrl} className="w-full h-[420px]" />
      </div>

      {/* CHAT */}
      <button
        onClick={() => router.push("/chat")}
        className="w-full bg-blue-600 text-white py-3 rounded-xl"
      >
        Chat with Driver 💬
      </button>

      {stage === "near_destination" && (
        <button
          onClick={endRide}
          className="w-full bg-red-600 text-white py-3 rounded-xl"
        >
          End Ride
        </button>
      )}
    </div>
  );
}

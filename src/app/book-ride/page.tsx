"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "../components/ToastProvider";
import { chargePayment } from "@/app/lib/mockStripe";

export default function BookRidePage() {
  const router = useRouter();
  const { showToast } = useToast();
  const hasRedirected = useRef(false);

  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [rideType, setRideType] =
    useState<"economy" | "premium">("economy");

  const [isShared, setIsShared] = useState(false);
  const [passengers, setPassengers] = useState(2);
  const [fare, setFare] = useState<number | null>(null);
  const [paying, setPaying] = useState(false);

  /* --------------------------------
     PREVENT MULTIPLE ACTIVE RIDES
  --------------------------------- */
  useEffect(() => {
    if (hasRedirected.current) return;

    const activeRide = localStorage.getItem("activeRide");
    const paymentDone = localStorage.getItem("paymentDone");

    if (activeRide && paymentDone) {
      hasRedirected.current = true;
      showToast("You already have an active ride 🚕", "info");
      router.push("/track-ride");
    }
  }, [router, showToast]);

  /* --------------------------------
     FARE CALCULATION
  --------------------------------- */
  const calculateFare = () => {
    if (!pickup || !destination) {
      showToast("Please enter pickup and destination", "error");
      return;
    }

    const baseFare = rideType === "premium" ? 300 : 150;
    const finalPassengers = isShared ? passengers : 1;
    const totalFare = baseFare;

    setFare(totalFare);

    localStorage.setItem(
      "activeRideDetails",
      JSON.stringify({
        pickup,
        destination,
        rideType,
        passengers: finalPassengers,
      })
    );

    localStorage.setItem(
      "ridePayment",
      JSON.stringify({
        totalFare,
        passengers: finalPassengers,
      })
    );

    showToast("Fare calculated successfully 💰", "success");
  };

  /* --------------------------------
     MOCK STRIPE PAYMENT
  --------------------------------- */
  const payAndConfirmRide = async () => {
    if (!fare) return;

    setPaying(true);

    try {
      const result = await chargePayment(fare);

      if (result.success) {
        localStorage.setItem("activeRide", "true");
        localStorage.setItem("paymentDone", "true");

        showToast("Payment successful & ride booked 🚗", "success");

        setTimeout(() => {
          router.push("/track-ride");
        }, 800);
      } else {
        showToast("Payment failed ❌", "error");
      }
    } catch {
      showToast("Payment error ❌", "error");
    } finally {
      setPaying(false);
    }
  };

  const mapUrl =
    pickup && destination
      ? `https://www.google.com/maps?q=${encodeURIComponent(
          pickup
        )}+to+${encodeURIComponent(destination)}&output=embed`
      : `https://www.google.com/maps?q=Delhi&output=embed`;

  return (
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 p-6">
      {/* LEFT PANEL */}
      <div className="bg-white p-6 rounded-2xl shadow space-y-4">
        <h1 className="text-2xl font-semibold">
          Book a Ride 🚗
        </h1>

        <input
          className="w-full border p-3 rounded-lg"
          placeholder="Pickup location"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
        />

        <input
          className="w-full border p-3 rounded-lg"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />

        <select
          className="w-full border p-3 rounded-lg"
          value={rideType}
          onChange={(e) =>
            setRideType(e.target.value as "economy" | "premium")
          }
        >
          <option value="economy">Economy</option>
          <option value="premium">Premium</option>
        </select>

        {/* RIDE SHARING */}
        <div className="border rounded-lg p-4 space-y-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isShared}
              onChange={() => setIsShared(!isShared)}
            />
            Enable Ride Sharing
          </label>

          {isShared && (
            <input
              type="number"
              min={2}
              max={5}
              value={passengers}
              onChange={(e) =>
                setPassengers(Number(e.target.value))
              }
              className="w-full border p-2 rounded-lg"
            />
          )}
        </div>

        <button
          onClick={calculateFare}
          className="w-full bg-black text-white py-3 rounded-lg hover:opacity-90"
        >
          Calculate Fare
        </button>

        {/* PAYMENT SECTION */}
        {fare && (
          <div className="mt-6 space-y-4 border-t pt-4">
            <h2 className="text-xl font-semibold">
              Payment Details 💳
            </h2>

            <p>
              <strong>Total Fare:</strong> ₹{fare}
            </p>

            <p>
              <strong>Passengers:</strong>{" "}
              {isShared ? passengers : 1}
            </p>

            <p>
              <strong>Per Person:</strong> ₹
              {Math.ceil(
                fare / (isShared ? passengers : 1)
              )}
            </p>

            <button
              onClick={payAndConfirmRide}
              disabled={paying}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:opacity-90 disabled:opacity-60"
            >
              {paying
                ? "Processing Payment..."
                : "Pay & Confirm Ride"}
            </button>
          </div>
        )}
      </div>

      {/* MAP PANEL */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <iframe
          title="route-map"
          src={mapUrl}
          className="w-full h-[420px]"
          loading="lazy"
        />
      </div>
    </div>
  );
}

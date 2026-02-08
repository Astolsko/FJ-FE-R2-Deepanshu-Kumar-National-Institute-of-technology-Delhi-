"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BookRidePage() {
  const router = useRouter();

  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [rideType, setRideType] = useState<"economy" | "premium">("economy");

  const [isShared, setIsShared] = useState(false);
  const [passengers, setPassengers] = useState(2);

  const [fare, setFare] = useState<number | null>(null);

  const calculateFare = () => {
    if (!pickup || !destination) {
      alert("Please enter pickup and destination");
      return;
    }

    // Base pricing
    const baseFare = rideType === "premium" ? 300 : 150;
    const totalFare = baseFare;

    // Sharing logic
    const finalPassengers = isShared ? passengers : 1;
    const perPersonFare = Math.ceil(totalFare / finalPassengers);

    setFare(totalFare);

    // Store payment info
    localStorage.setItem(
      "ridePayment",
      JSON.stringify({
        totalFare,
        perPersonFare,
        passengers: finalPassengers,
      })
    );

    // Store ride details for tracking
    localStorage.setItem(
      "activeRideDetails",
      JSON.stringify({
        pickup,
        destination,
        rideType,
        shared: isShared,
        passengers: finalPassengers,
      })
    );

    // Mark ride active
    localStorage.setItem("activeRide", "true");
  };

  const proceedToPayment = () => {
    router.push("/payments");
  };

  const mapUrl =
    pickup && destination
      ? `https://www.google.com/maps?q=${encodeURIComponent(
          pickup
        )}+to+${encodeURIComponent(destination)}&output=embed`
      : `https://www.google.com/maps?q=Delhi&output=embed`;

  return (
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
      {/* LEFT PANEL */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <h1 className="text-2xl font-bold">Book a Ride</h1>

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

        {/* Ride Sharing */}
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
              placeholder="Number of riders"
            />
          )}
        </div>

        <button
          onClick={calculateFare}
          className="w-full bg-black text-white py-3 rounded-lg hover:opacity-90"
        >
          Calculate Fare
        </button>

        {/* Fare Details */}
        {fare && (
          <div className="space-y-2">
            <p className="text-lg font-semibold">
              Total Fare: ₹{fare}
            </p>

            {isShared && (
              <p className="text-sm text-gray-600">
                Split Fare ({passengers} riders): ₹
                {Math.ceil(fare / passengers)} per person
              </p>
            )}

            <button
              onClick={proceedToPayment}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:opacity-90"
            >
              Proceed to Payment
            </button>
          </div>
        )}
      </div>

      {/* MAP PANEL */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
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

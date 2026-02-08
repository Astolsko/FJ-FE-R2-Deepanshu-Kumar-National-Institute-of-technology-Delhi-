"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BookRidePage() {
  const router = useRouter();

  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [rideType, setRideType] =
    useState<"economy" | "premium">("economy");

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

    const finalPassengers = isShared ? passengers : 1;

    setFare(totalFare);

    // Store ride details
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

    localStorage.setItem(
      "ridePayment",
      JSON.stringify({
        totalFare,
        passengers: finalPassengers,
      })
    );
  };

  const payAndConfirmRide = () => {
    localStorage.setItem("activeRide", "true");
    localStorage.setItem("paymentDone", "true");

    router.push("/track-ride");
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

            <div className="border rounded-lg p-4 text-sm">
              <p className="font-semibold mb-1">
                Test Card Details
              </p>
              <p>4242 4242 4242 4242</p>
              <p>Any future expiry</p>
              <p>Any 3-digit CVC</p>
            </div>

            <button
              onClick={payAndConfirmRide}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:opacity-90"
            >
              Pay & Confirm Ride
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

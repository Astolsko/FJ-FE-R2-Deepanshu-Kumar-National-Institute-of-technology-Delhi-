"use client";

import { useState } from "react";

export default function BookRidePage() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [rideType, setRideType] = useState("economy");
  const [fare, setFare] = useState<number | null>(null);

  const calculateFare = () => {
    if (!pickup || !destination) {
      alert("Please enter pickup and destination");
      return;
    }
    setFare(rideType === "premium" ? 200 : 100);
  };

  return (
    <div className="max-w-lg bg-white p-8 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6">Book a Ride</h1>

      <div className="space-y-4">
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
          onChange={(e) => setRideType(e.target.value)}
        >
          <option value="economy">Economy</option>
          <option value="premium">Premium</option>
        </select>

        <button
          onClick={calculateFare}
          className="w-full bg-black text-white py-3 rounded-lg hover:opacity-90"
        >
          Calculate Fare
        </button>

        {fare && (
          <div className="text-center text-lg font-semibold">
            Estimated Fare: ₹{fare}
          </div>
        )}
      </div>
    </div>
  );
}


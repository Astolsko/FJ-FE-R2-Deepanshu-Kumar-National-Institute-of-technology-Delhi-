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
    <div className="p-6 max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Book a Ride</h1>

      <input
        className="w-full border p-2 rounded"
        placeholder="Pickup location"
        value={pickup}
        onChange={(e) => setPickup(e.target.value)}
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />

      <select
        className="w-full border p-2 rounded"
        value={rideType}
        onChange={(e) => setRideType(e.target.value)}
      >
        <option value="economy">Economy</option>
        <option value="premium">Premium</option>
      </select>

      <button
        className="w-full bg-black text-white py-2 rounded"
        onClick={calculateFare}
      >
        Calculate Fare
      </button>

      {fare && <p className="font-semibold">Estimated Fare: ₹{fare}</p>}
    </div>
  );
}

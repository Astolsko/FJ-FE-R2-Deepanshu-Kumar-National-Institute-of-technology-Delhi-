"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BookRidePage() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [rideType, setRideType] = useState("economy");
  const [fare, setFare] = useState<number | null>(null);

  const router = useRouter();

  const calculateFare = () => {
    if (!pickup || !destination) {
      alert("Please enter pickup and destination");
      return;
    }

    const baseFare = rideType === "premium" ? 250 : 120;
    setFare(baseFare);

    // Mark ride as active (for tracking)
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
      {/* LEFT: BOOKING FORM */}
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

        {/* FARE + PAY BUTTON */}
        {fare && (
          <div className="space-y-3">
            <div className="text-lg font-semibold">
              Estimated Fare: ₹{fare}
            </div>

            <button
              onClick={proceedToPayment}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:opacity-90"
            >
              Proceed to Payment
            </button>
          </div>
        )}
      </div>

      {/* RIGHT: MAP */}
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



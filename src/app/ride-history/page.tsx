"use client";

import { useEffect, useState } from "react";

type RideHistoryItem = {
  pickup: string;
  destination: string;
  rideType: string;
  passengers: number;
  totalFare: number;
  rating: number;
  comment: string;
  date: string;
};

export default function RideHistoryPage() {
  const [rides, setRides] = useState<RideHistoryItem[]>([]);

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("rideHistory") || "[]");

    // Show latest ride first
    setRides(stored.reverse());
  }, []);

  if (rides.length === 0) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center text-gray-500">
        <h1 className="text-2xl font-semibold mb-2">
          Ride History
        </h1>
        <p>You haven’t completed any rides yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6">
      <h1 className="text-3xl font-semibold">
        Ride History
      </h1>

      {rides.map((ride, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-2xl shadow space-y-2"
        >
          {/* Route */}
          <p className="font-semibold text-lg">
            {ride.pickup} → {ride.destination}
          </p>

          {/* Meta */}
          <div className="text-sm text-gray-500 space-y-1">
            <p>Date: {ride.date}</p>
            <p>Ride Type: {ride.rideType}</p>
            <p>Passengers: {ride.passengers}</p>
          </div>

          {/* Fare */}
          <p className="text-lg font-semibold">
            Fare: ₹{ride.totalFare}
          </p>

          {/* Rating */}
          <p className="text-yellow-500 text-lg">
            {"★".repeat(ride.rating)}
            {"☆".repeat(5 - ride.rating)}
          </p>

          {/* Comment */}
          {ride.comment && (
            <p className="italic text-gray-600">
              “{ride.comment}”
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

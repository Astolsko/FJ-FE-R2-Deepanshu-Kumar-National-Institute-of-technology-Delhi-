"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FeedbackPage() {
  const router = useRouter();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const submitFeedback = () => {
    const rideDetails = JSON.parse(
      localStorage.getItem("activeRideDetails") || "{}"
    );

    const ridePayment = JSON.parse(
      localStorage.getItem("ridePayment") || "{}"
    );

    const feedback = {
      pickup: rideDetails.pickup,
      destination: rideDetails.destination,
      rideType: rideDetails.rideType,
      passengers: rideDetails.passengers,
      totalFare: ridePayment.totalFare || 0,
      rating,
      comment,
      date: new Date().toLocaleString(),
    };

    const existing = JSON.parse(
      localStorage.getItem("rideHistory") || "[]"
    );

    localStorage.setItem(
      "rideHistory",
      JSON.stringify([...existing, feedback])
    );

    // Cleanup after ride completion
    localStorage.removeItem("activeRide");
    localStorage.removeItem("paymentDone");
    localStorage.removeItem("activeRideDetails");
    localStorage.removeItem("ridePayment");

    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white p-8 rounded-2xl shadow w-full max-w-md space-y-6">
        <h1 className="text-2xl font-semibold text-center">
          Rate Your Ride ⭐
        </h1>

        {/* Rating */}
        <div className="flex justify-center gap-2">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              onClick={() => setRating(num)}
              className={`text-3xl ${
                num <= rating ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              ★
            </button>
          ))}
        </div>

        {/* Comment */}
        <textarea
          className="w-full border rounded-lg p-3"
          rows={4}
          placeholder="Leave a comment for the driver..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button
          onClick={submitFeedback}
          className="w-full bg-black text-white py-3 rounded-lg hover:opacity-90"
        >
          Submit Feedback
        </button>
      </div>
    </div>
  );
}

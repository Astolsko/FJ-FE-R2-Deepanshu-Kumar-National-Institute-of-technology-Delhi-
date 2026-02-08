"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "../components/ToastProvider";

export default function FeedbackPage() {
  const router = useRouter();
  const { showToast } = useToast();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submitFeedback = () => {
    if (submitting) return;

    setSubmitting(true);

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

    showToast("Thanks for your feedback ⭐", "success");

    // Let toast appear before redirect
    setTimeout(() => {
      router.push("/dashboard");
    }, 900);
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
              className={`text-3xl transition ${
                num <= rating
                  ? "text-yellow-400"
                  : "text-gray-300"
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
          disabled={submitting}
          className={`w-full py-3 rounded-lg transition text-white ${
            submitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-black hover:opacity-90"
          }`}
        >
          {submitting ? "Submitting..." : "Submit Feedback"}
        </button>
      </div>
    </div>
  );
}

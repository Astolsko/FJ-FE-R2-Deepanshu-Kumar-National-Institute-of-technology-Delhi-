"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51NxxxxxxREPLACE_WITH_YOUR_TEST_KEY"
);

export default function PaymentsPage() {
  const [payment, setPayment] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("ridePayment");
    if (stored) {
      setPayment(JSON.parse(stored));
    }
  }, []);

  const payNow = async () => {
    // Simulate successful Stripe payment
    alert(
      "Stripe Test Payment Successful!\nCard: 4242 4242 4242 4242"
    );

    localStorage.setItem("paymentDone", "true");
    window.location.href = "/track-ride";
  };

  if (!payment) {
    return <p className="text-center">No payment details found</p>;
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow space-y-4">
      <h1 className="text-2xl font-bold">Stripe Payment</h1>

      <p>Total Fare: ₹{payment.totalFare}</p>
      <p>Passengers: {payment.passengers}</p>
      <p className="font-semibold">
        Per Person Fare: ₹{payment.perPersonFare}
      </p>

      <div className="border p-4 rounded-lg space-y-2">
        <p className="font-semibold">Test Card Details</p>
        <p>Card Number: 4242 4242 4242 4242</p>
        <p>Expiry: Any future date</p>
        <p>CVC: Any 3 digits</p>
      </div>

      <button
        onClick={payNow}
        className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:opacity-90"
      >
        Pay with Stripe
      </button>
    </div>
  );
}

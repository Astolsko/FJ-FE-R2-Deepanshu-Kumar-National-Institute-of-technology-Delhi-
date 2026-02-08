"use client";

import { useState } from "react";

export default function PaymentsPage() {
  const [cards, setCards] = useState<string[]>([
    "**** **** **** 4242",
  ]);
  const [cardNumber, setCardNumber] = useState("");

  const addCard = () => {
    if (cardNumber.length < 4) {
      alert("Enter a valid card number");
      return;
    }

    const masked =
      "**** **** **** " + cardNumber.slice(-4);
    setCards([...cards, masked]);
    setCardNumber("");
  };

  const removeCard = (index: number) => {
    setCards(cards.filter((_, i) => i !== index));
  };

  const payNow = () => {
    alert("Payment successful using Stripe test sandbox (simulated)");

    // Mark ride as completed
    localStorage.removeItem("activeRide");
  };


  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold">Payment Methods</h1>

      {/* SAVED CARDS */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="text-xl font-semibold">
          Saved Payment Methods
        </h2>

        {cards.length === 0 && (
          <p className="text-gray-500">
            No saved cards
          </p>
        )}

        {cards.map((card, index) => (
          <div
            key={index}
            className="flex justify-between items-center border p-3 rounded-lg"
          >
            <span>{card}</span>
            <button
              onClick={() => removeCard(index)}
              className="text-red-500 text-sm"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* ADD CARD */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="text-xl font-semibold">
          Add New Card
        </h2>

        <input
          className="w-full border p-3 rounded-lg"
          placeholder="Card Number (Stripe test: 4242 4242 4242 4242)"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />

        <button
          onClick={addCard}
          className="bg-black text-white px-6 py-2 rounded-lg hover:opacity-90"
        >
          Add Card
        </button>
      </div>

      {/* PAY NOW */}
      <div className="bg-white p-6 rounded-xl shadow">
        <button
          onClick={payNow}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:opacity-90"
        >
          Pay ₹250 (Test Payment)
        </button>

        <p className="text-xs text-gray-500 mt-2 text-center">
          Payments are simulated using Stripe’s test sandbox
        </p>
      </div>
    </div>
  );
}

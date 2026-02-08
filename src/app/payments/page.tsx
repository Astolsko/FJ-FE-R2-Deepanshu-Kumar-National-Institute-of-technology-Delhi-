"use client";

import { useState } from "react";
import {
  getPaymentMethods,
  addPaymentMethod,
  removePaymentMethod,
  chargePayment,
} from "@/app/lib/mockStripe";

import { PaymentMethod } from "@/types/payment";
import { useToast } from "@/app/components/ToastProvider";

export default function PaymentsPage() {
  const { showToast } = useToast();
  const [methods, setMethods] = useState<PaymentMethod[]>(
    getPaymentMethods()
  );
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);
    const success = await chargePayment(250);
    setLoading(false);

    showToast(
      success
        ? "Payment successful 🎉"
        : "Payment failed ❌"
    );
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-4 rounded-xl shadow space-y-4">
      <h2 className="text-lg font-semibold">Payment Methods</h2>

      {methods.map((pm) => (
        <div
          key={pm.id}
          className="flex justify-between items-center border p-3 rounded-lg"
        >
          <p>
            {pm.brand} •••• {pm.last4}
          </p>
          <button
            onClick={() => {
              removePaymentMethod(pm.id);
              setMethods(getPaymentMethods());
              showToast("Card removed");
            }}
            className="text-red-500 text-sm"
          >
            Remove
          </button>
        </div>
      ))}

      <button
        onClick={() => {
          addPaymentMethod();
          setMethods(getPaymentMethods());
          showToast("New card added");
        }}
        className="w-full bg-gray-200 p-2 rounded-lg"
      >
        + Add Card
      </button>

      <button
        onClick={handlePay}
        disabled={loading}
        className="w-full bg-black text-white p-3 rounded-lg"
      >
        {loading ? "Processing..." : "Pay ₹250"}
      </button>
    </div>
  );
}

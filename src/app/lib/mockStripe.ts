import { PaymentMethod } from "@/types/payment";

/* -------------------------------
   MOCK STRIPE IN-MEMORY STORE
-------------------------------- */
let methods: PaymentMethod[] = [
  {
    id: "pm_visa_4242",
    brand: "Visa",
    last4: "4242",
    expMonth: 12,
    expYear: 2028,
  },
];

/* -------------------------------
   GET PAYMENT METHODS
-------------------------------- */
export function getPaymentMethods(): PaymentMethod[] {
  // Return a copy to avoid mutation bugs
  return [...methods];
}

/* -------------------------------
   ADD PAYMENT METHOD
-------------------------------- */
export function addPaymentMethod(): PaymentMethod {
  const newMethod: PaymentMethod = {
    id: `pm_${Date.now()}`,
    brand: "Mastercard",
    last4: Math.floor(1000 + Math.random() * 9000).toString(),
    expMonth: 10,
    expYear: 2029,
  };

  methods.push(newMethod);
  return newMethod;
}

/* -------------------------------
   REMOVE PAYMENT METHOD
-------------------------------- */
export function removePaymentMethod(id: string): void {
  methods = methods.filter((m) => m.id !== id);
}

/* -------------------------------
   CHARGE PAYMENT (ASYNC MOCK)
-------------------------------- */
export function chargePayment(
  amount: number
): Promise<{ success: boolean }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1500);
  });
}

export type PaymentMethod = {
  id: string;
  brand: "Visa" | "Mastercard" | "UPI";
  last4: string;
  expMonth: number;
  expYear: number;
};

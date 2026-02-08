"use client";

export default function RideHistoryPage() {
  const rides = [
    {
      id: 1,
      date: "8 Feb 2026",
      from: "NIT Delhi",
      to: "Connaught Place",
      fare: 120,
      driver: "Rohit",
    },
    {
      id: 2,
      date: "6 Feb 2026",
      from: "Hostel",
      to: "Airport",
      fare: 350,
      driver: "Amit",
    },
  ];

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Ride History</h1>

      {rides.map((ride) => (
        <div
          key={ride.id}
          className="border p-4 rounded mb-3 space-y-1"
        >
          <p><b>Date:</b> {ride.date}</p>
          <p><b>Route:</b> {ride.from} → {ride.to}</p>
          <p><b>Driver:</b> {ride.driver}</p>
          <p><b>Fare:</b> ₹{ride.fare}</p>
        </div>
      ))}
    </div>
  );
}

export default function RideHistoryPage() {
  const rides = [
    {
      date: "8 Feb 2026",
      route: "NIT Delhi → Connaught Place",
      driver: "Rohit",
      fare: 120,
    },
    {
      date: "6 Feb 2026",
      route: "Hostel → Airport",
      driver: "Amit",
      fare: 350,
    },
    {
      date: "2 Feb 2026",
      route: "Campus → Karol Bagh",
      driver: "Suresh",
      fare: 180,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Ride History</h1>

      {rides.map((ride, index) => (
        <div
          key={index}
          className="bg-white p-5 rounded-xl shadow flex justify-between items-center"
        >
          <div>
            <p className="font-semibold">{ride.route}</p>
            <p className="text-sm text-gray-500">
              Date: {ride.date}
            </p>
            <p className="text-sm text-gray-500">
              Driver: {ride.driver}
            </p>
          </div>

          <div className="text-lg font-bold">
            ₹{ride.fare}
          </div>
        </div>
      ))}
    </div>
  );
}

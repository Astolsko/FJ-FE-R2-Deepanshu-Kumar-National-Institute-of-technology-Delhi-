import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Book Ride */}
        <Link
          href="/book-ride"
          className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold">🚗 Book Ride</h2>
          <p className="text-gray-500 mt-2">
            Choose pickup, destination & ride type
          </p>
        </Link>

        {/* Ride History */}
        <Link
          href="/ride-history"
          className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold">📜 Ride History</h2>
          <p className="text-gray-500 mt-2">
            View your past rides
          </p>
        </Link>

        {/* Profile */}
        <Link
          href="/profile"
          className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold">👤 Profile</h2>
          <p className="text-gray-500 mt-2">
            Manage your account details
          </p>
        </Link>

        {/* Track Ride */}
        <Link
          href="/track-ride"
          className="p-6 bg-black text-white rounded-xl shadow hover:opacity-90 transition"
        >
          <h2 className="text-xl font-semibold">📍 Track Ride</h2>
          <p className="text-gray-300 mt-2">
            View real-time driver movement
          </p>
        </Link>
      </div>
    </div>
  );
}

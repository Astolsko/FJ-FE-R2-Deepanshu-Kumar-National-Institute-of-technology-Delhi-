import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/book-ride"
          className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold">🚕 Book a Ride</h2>
          <p className="text-gray-500 mt-2">
            Choose pickup, destination and ride type
          </p>
        </Link>

        <Link
          href="/ride-history"
          className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold">📜 Ride History</h2>
          <p className="text-gray-500 mt-2">
            View your previous rides
          </p>
        </Link>

        <Link
          href="/profile"
          className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold">👤 Profile</h2>
          <p className="text-gray-500 mt-2">
            Manage your account details
          </p>
        </Link>
      </div>
    </div>
  );
}

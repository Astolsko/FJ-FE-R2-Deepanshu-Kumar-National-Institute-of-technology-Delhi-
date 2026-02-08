import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="p-6 max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-center">Dashboard</h1>

      <div className="space-y-3">
        <Link
          href="/book-ride"
          className="block border p-3 rounded text-center hover:bg-gray-100"
        >
          🚕 Book a Ride
        </Link>

        <Link
          href="/ride-history"
          className="block border p-3 rounded text-center hover:bg-gray-100"
        >
          📜 Ride History
        </Link>

        <Link
          href="/profile"
          className="block border p-3 rounded text-center hover:bg-gray-100"
        >
          👤 Profile
        </Link>
      </div>
    </div>
  );
}

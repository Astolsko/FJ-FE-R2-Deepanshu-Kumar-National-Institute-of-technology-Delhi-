"use client";

import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-gray-500">
        Manage your rides, payments, and profile
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <Link
          href="/book-ride"
          className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold">🚗 Book Ride</h2>
          <p className="text-gray-500 mt-2">
            Set pickup & destination, view route and fare
          </p>
        </Link>

        <Link
          href="/track-ride"
          className="p-6 bg-black text-white rounded-xl shadow hover:opacity-90 transition"
        >
          <h2 className="text-xl font-semibold">📍 Track Ride</h2>
          <p className="text-gray-300 mt-2">
            Track your current ride
          </p>
        </Link>

        <Link
          href="/ride-history"
          className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold">📜 Ride History</h2>
          <p className="text-gray-500 mt-2">
            View past rides
          </p>
        </Link>

        <Link
          href="/payments"
          className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold">💳 Payments</h2>
          <p className="text-gray-500 mt-2">
            Manage payment methods
          </p>
        </Link>

        <Link
          href="/profile"
          className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition md:col-span-2"
        >
          <h2 className="text-xl font-semibold">👤 Profile</h2>
          <p className="text-gray-500 mt-2">
            Update info and view stats
          </p>
        </Link>
      </div>
    </div>
  );
}


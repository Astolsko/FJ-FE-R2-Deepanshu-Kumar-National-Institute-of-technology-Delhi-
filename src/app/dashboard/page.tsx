"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [hasActiveRide, setHasActiveRide] = useState(false);

  useEffect(() => {
    const activeRide = localStorage.getItem("activeRide");
    const paymentDone = localStorage.getItem("paymentDone");
    setHasActiveRide(!!activeRide);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-semibold tracking-tight">
          Dashboard
        </h1>
        <p className="text-gray-500 text-lg">
          Quick actions for your rides
        </p>
      </div>

      {/* Primary Action */}
      <div className="bg-gradient-to-r from-black to-gray-800 text-white rounded-3xl p-8 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold">
              {hasActiveRide
                ? "Your ride is in progress"
                : "Ready to book a ride?"}
            </h2>
            <p className="text-gray-300 mt-1">
              {hasActiveRide
                ? "Track your current ride or complete payment."
                : "Book a ride and start your journey."}
            </p>
          </div>

          <Link
            href={hasActiveRide ? "/track-ride" : "/book-ride"}
            className="bg-white text-black px-6 py-3 rounded-xl font-medium hover:bg-gray-100 transition"
          >
            {hasActiveRide ? "Track Ride" : "Book a Ride"}
          </Link>
        </div>
      </div>

      {/* Navigation Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <NavCard
          href="/book-ride"
          title="Book Ride"
          desc="Choose pickup, destination, and ride type"
          icon="🚗"
        />

        <NavCard
          href="/track-ride"
          title="Track Ride"
          desc="Live tracking of your current ride"
          icon="📍"
          highlight
        />

        <NavCard
          href="/ride-history"
          title="Ride History"
          desc="View completed rides"
          icon="📜"
        />

        {/* ✅ PAYMENTS CARD (NEW) */}
        <NavCard
          href="/payments"
          title="Payments"
          desc="Manage payment methods and complete ride payments"
          icon="💳"
        />

        <NavCard
          href="/profile"
          title="Profile"
          desc="View and edit your profile"
          icon="👤"
          full
        />
      </div>
    </div>
  );
}

/* ---------- Card Component ---------- */

function NavCard({
  href,
  title,
  desc,
  icon,
  highlight = false,
  full = false,
}: {
  href: string;
  title: string;
  desc: string;
  icon: string;
  highlight?: boolean;
  full?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`p-6 rounded-2xl transition-all
        ${full ? "md:col-span-2" : ""}
        ${
          highlight
            ? "bg-black text-white shadow-lg hover:opacity-90"
            : "bg-white shadow hover:shadow-lg hover:-translate-y-0.5"
        }
      `}
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl
            ${
              highlight
                ? "bg-white/10"
                : "bg-gray-100"
            }`}
        >
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <p
            className={`mt-1 ${
              highlight ? "text-gray-300" : "text-gray-500"
            }`}
          >
            {desc}
          </p>
        </div>
      </div>
    </Link>
  );
}

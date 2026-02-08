"use client";

import { useEffect, useState } from "react";

type User = {
  name: string;
  email: string;
  loggedInAt?: string;
};

type RideHistoryItem = {
  rating: number;
  totalFare: number;
  comment: string;
};

export default function ProfilePage() {
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
  });

  const [totalRides, setTotalRides] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [avgRating, setAvgRating] = useState<number | null>(null);

  /* LOAD USER + STATS */
  useEffect(() => {
    // Load user info
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Load ride history
    const history: RideHistoryItem[] = JSON.parse(
      localStorage.getItem("rideHistory") || "[]"
    );

    setTotalRides(history.length);

    if (history.length > 0) {
      const spent = history.reduce(
        (sum, ride) => sum + (ride.totalFare || 0),
        0
      );

      const ratingSum = history.reduce(
        (sum, ride) => sum + (ride.rating || 0),
        0
      );

      setTotalSpent(spent);
      setAvgRating(
        Number((ratingSum / history.length).toFixed(1))
      );
    }
  }, []);

  /* SAVE PROFILE */
  const saveProfile = () => {
    localStorage.setItem("user", JSON.stringify(user));
    alert("Profile updated successfully");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-6">
      <h1 className="text-3xl font-semibold">Profile</h1>

      {/* PROFILE INFO */}
      <div className="bg-white p-6 rounded-2xl shadow space-y-4">
        <h2 className="text-xl font-semibold">
          👤 Personal Information
        </h2>

        <input
          className="w-full border p-3 rounded-lg"
          value={user.name}
          onChange={(e) =>
            setUser({ ...user, name: e.target.value })
          }
          placeholder="Full Name"
        />

        <input
          className="w-full border p-3 rounded-lg"
          value={user.email}
          onChange={(e) =>
            setUser({ ...user, email: e.target.value })
          }
          placeholder="Email Address"
        />

        {user.loggedInAt && (
          <p className="text-sm text-gray-500">
            Logged in at: {user.loggedInAt}
          </p>
        )}

        <button
          onClick={saveProfile}
          className="bg-black text-white px-6 py-2 rounded-lg hover:opacity-90"
        >
          Save Changes
        </button>
      </div>

      {/* RIDE STATISTICS */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">
          📊 Ride Statistics
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          <StatCard
            label="Total Rides"
            value={totalRides}
          />
          <StatCard
            label="Total Spent"
            value={`₹${totalSpent}`}
          />
          <StatCard
            label="Average Rating"
            value={avgRating ? `${avgRating} ⭐` : "—"}
          />
        </div>
      </div>
    </div>
  );
}

/* ---------- COMPONENT ---------- */

function StatCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="p-4 bg-gray-50 rounded-xl text-center">
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
}

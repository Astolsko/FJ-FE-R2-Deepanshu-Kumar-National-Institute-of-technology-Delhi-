"use client";

import { useState } from "react";

export default function ProfilePage() {
  const [name, setName] = useState("Deepanshu Kumar");
  const [email, setEmail] = useState("deepanshu@example.com");

  // Mock ride statistics
  const totalRides = 12;
  const totalSpent = 2150;
  const averageFare = Math.round(totalSpent / totalRides);

  const saveProfile = () => {
    alert("Profile updated successfully");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold">Profile</h1>

      {/* PROFILE INFO */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="text-xl font-semibold">Personal Information</h2>

        <input
          className="w-full border p-3 rounded-lg"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />

        <input
          className="w-full border p-3 rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
        />

        <button
          onClick={saveProfile}
          className="bg-black text-white px-6 py-2 rounded-lg hover:opacity-90"
        >
          Save Changes
        </button>
      </div>

      {/* RIDE STATISTICS */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Ride Statistics</h2>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg text-center">
            <p className="text-2xl font-bold">{totalRides}</p>
            <p className="text-sm text-gray-500">Total Rides</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg text-center">
            <p className="text-2xl font-bold">₹{totalSpent}</p>
            <p className="text-sm text-gray-500">Total Spent</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg text-center">
            <p className="text-2xl font-bold">₹{averageFare}</p>
            <p className="text-sm text-gray-500">Avg. Fare</p>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";


export default function ProfilePage() {
  const user = {
    name: "Deepanshu Kumar",
    email: "deepanshu@example.com",
    totalRides: 12,
    totalSpent: 1540,
  };

  return (
    <div className="p-6 max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Profile</h1>

      <div className="border p-4 rounded space-y-2">
        <p><b>Name:</b> {user.name}</p>
        <p><b>Email:</b> {user.email}</p>
        <p><b>Total Rides:</b> {user.totalRides}</p>
        <p><b>Total Spent:</b> ₹{user.totalSpent}</p>
      </div>
    </div>
  );
}

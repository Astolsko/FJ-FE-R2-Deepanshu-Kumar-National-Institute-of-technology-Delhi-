import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="max-w-4xl w-full px-6 text-center">
        <div className="bg-white rounded-2xl shadow-xl p-10 space-y-6">
          <h1 className="text-5xl font-extrabold">
            Ride Booking App 🚗
          </h1>

          <p className="text-lg text-gray-600">
            Book rides, track drivers in real time,
            and manage your trips effortlessly.
          </p>

          <div className="flex justify-center gap-4">
            <Link
              href="/auth/login"
              className="bg-black text-white px-8 py-3 rounded-lg text-lg"
            >
              Get Started
            </Link>

            <Link
              href="/auth/login"
              className="border px-8 py-3 rounded-lg text-lg"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

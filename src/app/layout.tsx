import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <nav className="bg-white border-b shadow-sm">
          <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between">
            <Link href="/" className="font-bold text-lg">
              🚕 RideShare
            </Link>

            <div className="space-x-4">
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/book-ride">Book Ride</Link>
              <Link href="/ride-history">History</Link>
              <Link href="/profile">Profile</Link>
            </div>
          </div>
        </nav>

        <main className="max-w-5xl mx-auto px-6 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}

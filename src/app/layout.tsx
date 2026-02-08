import "./globals.css";
import { ToastProvider } from "./components/ToastProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 overflow-x-hidden">
        <ToastProvider>
          {/* Global responsive container */}
          <main className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4">
            {children}
          </main>
        </ToastProvider>
      </body>
    </html>
  );
}

import "./globals.css";
import { ToastProvider } from "./components/ToastProvider";
import DarkModeToggle from "./components/DarkModeToggle";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Dark mode class is applied on <html> */}
      <body className="min-h-screen overflow-x-hidden transition-colors duration-300">
        <ToastProvider>
          {/* Top Bar (Dark Mode Toggle) */}
          <div className="flex justify-end p-4">
            <DarkModeToggle />
          </div>

          {/* Global responsive container */}
          <main className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4">
            {children}
          </main>
        </ToastProvider>
      </body>
    </html>
  );
}


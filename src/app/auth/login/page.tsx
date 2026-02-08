"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    // Save logged-in user
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: email.split("@")[0], // simple name fallback
        email,
        loggedInAt: new Date().toLocaleString(),
      })
    );

    router.push("/dashboard");
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm space-y-6">
      <h1 className="text-3xl font-bold text-center">Login</h1>

      <input
        type="email"
        placeholder="Email"
        className="w-full border p-3 rounded-lg"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full border p-3 rounded-lg"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="w-full bg-black text-white py-3 rounded-lg hover:opacity-90"
      >
        Login
      </button>

      <p className="text-center text-sm text-gray-500">
        Don’t have an account?{" "}
        <Link
          href="/auth/signup"
          className="text-black font-medium underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}

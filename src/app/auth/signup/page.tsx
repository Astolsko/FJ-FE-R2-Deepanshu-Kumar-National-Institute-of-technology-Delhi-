"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    // Save user on signup
    localStorage.setItem(
      "user",
      JSON.stringify({
        name,
        email,
        loggedInAt: new Date().toLocaleString(),
      })
    );

    router.push("/dashboard");
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm space-y-6">
      <h1 className="text-3xl font-bold text-center">
        Create Account
      </h1>

      <input
        type="text"
        placeholder="Full Name"
        className="w-full border p-3 rounded-lg"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

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
        onClick={handleSignup}
        className="w-full bg-black text-white py-3 rounded-lg hover:opacity-90"
      >
        Sign Up
      </button>

      <p className="text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="text-black font-medium underline"
        >
          Login
        </Link>
      </p>
    </div>
  );
}

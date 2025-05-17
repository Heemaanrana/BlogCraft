'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setSuccess("🎉 User registered! Redirecting...");
      setTimeout(() => router.push("/signin"), 1500);
    } else {
      const data = await res.json();
      setError(data.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="w-full max-w-md p-8 rounded-2xl bg-gray-900/70 backdrop-blur-md shadow-lg border border-gray-800">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Create Account</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            required
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            required
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition duration-300 font-semibold"
          >
            Sign Up
          </button>
        </form>

        {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
        {success && <p className="text-green-400 mt-4 text-sm">{success}</p>}

        <p className="text-gray-400 text-sm mt-6 text-center">
          Already have an account?{" "}
          <span className="text-purple-500 hover:underline cursor-pointer" onClick={() => router.push("/signin")}>
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}

"use client"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function RegisterForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email || !password) {
            setError("All fields are necessary.");
            return;
        }

        try {          

            const res = await fetch("/api/userExists", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email}),
            });

            if (res.ok) {
                setEmail("");
                setPassword("");
                setError("");
                router.push("/");
            } else {
                setError("User registration failed.");
            }
        } catch (error) {
            console.log("Error during registration:", error);
            setError("Something went wrong.");
        }
    };

    return (
        <div className="grid place-items-center h-screen bg-gray-800">
            <div className="shadow-lg p-5 rounded-lg border-t-4 bg-black border-gray-400 w-full max-w-md">
                <h1 className="text-xl text-white font-bold my-4">Signin</h1>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border border-white bg-black text-white placeholder-white rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                        type="email"
                        placeholder="Email"
                    />
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border border-white bg-black text-white placeholder-white rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                        type="password"
                        placeholder="Password"
                    />
                    <button
                        type="submit"
                        className="bg-gray-600 rounded-lg text-white font-bold cursor-pointer px-6 py-2"
                    >
                        Signin
                    </button>
                    {error && (
                        <div className="bg-red-500 text-white text-sm py-1 px-3 rounded-md mt-2">
                            {error}
                        </div>
                    )}
                    <Link
                        className="text-white text-sm mt-3 text-right"
                        href="/pages/register"
                    >
                        Do not have an account? <span className="underline">Register</span>
                    </Link>
                </form>
            </div>
        </div>
    );
}

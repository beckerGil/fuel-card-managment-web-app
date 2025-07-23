import React from "react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow text-center">
        <h1 className="text-2xl font-bold mb-6">Fuel Card Management</h1>
        <div className="space-y-4">
          <Link href="/cards" className="block w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold">
            Cards
          </Link>
          <Link href="/drivers" className="block w-full py-3 bg-green-600 text-white rounded hover:bg-green-700 font-semibold">
            Drivers
          </Link>
        </div>
      </div>
    </div>
  );
}

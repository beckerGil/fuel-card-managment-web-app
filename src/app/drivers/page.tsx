"use client";
import React, { useState, useEffect } from "react";

interface Driver {
  id: number;
  name: string;
  license: string;
}

export default function DriversPage() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [name, setName] = useState("");
  const [license, setLicense] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDrivers();
  }, []);

  async function fetchDrivers() {
    setLoading(true);
    const res = await fetch("/api/drivers");
    const data = await res.json();
    setDrivers(data);
    setLoading(false);
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (editId !== null) {
      await fetch("/api/drivers", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editId, name, license }),
      });
    } else {
      await fetch("/api/drivers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, license }),
      });
    }
    setName("");
    setLicense("");
    setEditId(null);
    fetchDrivers();
  }

  function handleEdit(driver: Driver) {
    setName(driver.name);
    setLicense(driver.license);
    setEditId(driver.id);
  }

  async function handleDelete(id: number) {
    await fetch("/api/drivers", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (editId === id) {
      setEditId(null);
      setName("");
      setLicense("");
    }
    fetchDrivers();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow text-center">
        <h1 className="text-2xl font-bold mb-6">Drivers</h1>
        <form className="mb-6 space-y-4" onSubmit={handleAdd}>
          <input
            type="text"
            placeholder="Driver Name"
            className="w-full px-4 py-2 border rounded"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="License Number"
            className="w-full px-4 py-2 border rounded"
            value={license}
            onChange={e => setLicense(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
            disabled={loading}
          >
            {editId !== null ? "Update Driver" : "Add Driver"}
          </button>
        </form>
        {loading ? <div>Loading...</div> : null}
        <ul className="space-y-2">
          {drivers.map(driver => (
            <li key={driver.id} className="flex justify-between items-center bg-gray-50 p-2 rounded">
              <span>{driver.name} ({driver.license})</span>
              <div className="space-x-2">
                <button className="text-blue-600" onClick={() => handleEdit(driver)}>Edit</button>
                <button className="text-red-600" onClick={() => handleDelete(driver.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

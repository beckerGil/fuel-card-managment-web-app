"use client";
import React, { useState, useEffect } from "react";

interface Card {
  id: number;
  name: string;
  number: string;
}

export default function CardsPage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCards();
  }, []);

  async function fetchCards() {
    setLoading(true);
    const res = await fetch("/api/cards");
    const data = await res.json();
    setCards(data);
    setLoading(false);
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (editId !== null) {
      await fetch("/api/cards", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editId, name, number }),
      });
    } else {
      await fetch("/api/cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, number }),
      });
    }
    setName("");
    setNumber("");
    setEditId(null);
    fetchCards();
  }

  function handleEdit(card: Card) {
    setName(card.name);
    setNumber(card.number);
    setEditId(card.id);
  }

  async function handleDelete(id: number) {
    await fetch("/api/cards", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (editId === id) {
      setEditId(null);
      setName("");
      setNumber("");
    }
    fetchCards();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow text-center">
        <h1 className="text-2xl font-bold mb-6">Cards</h1>
        <form className="mb-6 space-y-4" onSubmit={handleAdd}>
          <input
            type="text"
            placeholder="Card Name"
            className="w-full px-4 py-2 border rounded"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Card Number"
            className="w-full px-4 py-2 border rounded"
            value={number}
            onChange={e => setNumber(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            disabled={loading}
          >
            {editId !== null ? "Update Card" : "Add Card"}
          </button>
        </form>
        {loading ? <div>Loading...</div> : null}
        <ul className="space-y-2">
          {cards.map(card => (
            <li key={card.id} className="flex justify-between items-center bg-gray-50 p-2 rounded">
              <span>{card.name} ({card.number})</span>
              <div className="space-x-2">
                <button className="text-blue-600" onClick={() => handleEdit(card)}>Edit</button>
                <button className="text-red-600" onClick={() => handleDelete(card.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";

export default function TransactionList({ reload }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, [reload]);

  const fetchTransactions = async () => {
    const res = await fetch("/api/transactions");
    const data = await res.json();
    setTransactions(data);
  };

  const handleDelete = async (id) => {
    await fetch("/api/transactions", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    fetchTransactions();
  };

  return (
    <div className="mt-6 p-6 bg-white/10 backdrop-blur-md rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">📜 Transaction History</h2>
      <ul className="space-y-3">
        {transactions.map((txn) => (
          <li
            key={txn._id}
            className="flex justify-between items-center bg-gray-800/80 p-3 rounded-md shadow"
          >
            <span>
              {txn.date.substring(0, 10)} - {txn.description} -{" "}
              <span className="font-bold">${txn.amount}</span>
            </span>
            <button
              onClick={() => handleDelete(txn._id)}
              className="text-red-500 hover:text-red-700 transition"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

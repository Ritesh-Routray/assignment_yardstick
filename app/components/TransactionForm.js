"use client";

import { useState } from "react";
import { FiDollarSign, FiCalendar, FiEdit, FiPlus } from "react-icons/fi"; // Icons

const categories = [
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Entertainment",
  "Other",
];

const TransactionForm = ({ onTransactionAdded }) => {
  const [form, setForm] = useState({
    amount: "",
    date: "",
    description: "",
    category: "Food",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      onTransactionAdded();
      setForm({ amount: "", date: "", description: "", category: "Food" });
    }
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg border border-gray-700">
      <h2 className="text-xl font-semibold text-center mb-4">
        📝 Add Transaction
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Amount Field */}
        <div className="relative">
          <FiDollarSign className="absolute left-3 top-3 text-gray-400" />
          <input
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            required
            className="w-full px-10 py-2 border border-gray-600 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Date Field */}
        <div className="relative">
          <FiCalendar className="absolute left-3 top-3 text-gray-400" />
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
            className="w-full px-10 py-2 border border-gray-600 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description Field */}
        <div className="relative">
          <FiEdit className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
            className="w-full px-10 py-2 border border-gray-600 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category Selection */}
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
          className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat} className="bg-gray-900 text-white">
              {cat}
            </option>
          ))}
        </select>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md flex justify-center items-center gap-2 transition duration-300"
        >
          <FiPlus /> Add Transaction
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;

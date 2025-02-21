"use client";
import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ExpenseChart({ reload }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, [reload]);

  const fetchExpenses = async () => {
    const res = await fetch("/api/transactions");
    const transactions = await res.json();

    const groupedData = transactions.reduce((acc, txn) => {
      const month = txn.date.substring(0, 7);
      acc[month] = (acc[month] || 0) + txn.amount;
      return acc;
    }, {});

    setData(
      Object.entries(groupedData).map(([month, amount]) => ({ month, amount }))
    );
  };

  return (
    <div className="mt-6 p-6 bg-white/10 backdrop-blur-md rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">📊 Monthly Expense Chart</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="month" stroke="white" />
          <YAxis stroke="white" />
          <Tooltip wrapperStyle={{ backgroundColor: "#fff", color: "#000" }} />
          <Bar dataKey="amount" fill="#60a5fa" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

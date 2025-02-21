"use client";
import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("/api/transactions");
        const data = await response.json();
        setTransactions(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // Group transactions by category for pie chart
  const categoryData = transactions.reduce((acc, transaction) => {
    const { category, amount } = transaction;
    acc[category] = (acc[category] || 0) + amount;
    return acc;
  }, {});

  const pieData = Object.entries(categoryData).map(([category, value]) => ({
    category,
    value,
  }));

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#FF6384",
    "#36A2EB",
  ];

  // Prepare monthly expenses data for bar chart
  const monthlyData = transactions.reduce((acc, transaction) => {
    const month = new Date(transaction.date).toLocaleString("default", {
      month: "short",
    });
    acc[month] = (acc[month] || 0) + transaction.amount;
    return acc;
  }, {});

  const barData = Object.entries(monthlyData).map(([month, total]) => ({
    month,
    total,
  }));

  if (loading) return <p>Loading transactions...</p>;

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-500 text-white p-4 rounded-lg">
          <h3 className="text-lg">Total Expenses</h3>
          <p className="text-2xl font-bold">
            ₹{transactions.reduce((acc, txn) => acc + txn.amount, 0)}
          </p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded-lg">
          <h3 className="text-lg">Total Transactions</h3>
          <p className="text-2xl font-bold">{transactions.length}</p>
        </div>
        <div className="bg-yellow-500 text-white p-4 rounded-lg">
          <h3 className="text-lg">Top Category</h3>
          <p className="text-xl">
            {pieData.length
              ? pieData.reduce((a, b) => (a.value > b.value ? a : b)).category
              : "N/A"}
          </p>
        </div>
      </div>

      {/* Category-wise Pie Chart */}
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 flex justify-center">
          <PieChart width={300} height={300}>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={100}
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        {/* Monthly Expenses Bar Chart */}
        <div className="w-full md:w-1/2">
          <BarChart width={400} height={300} data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#82ca9d" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

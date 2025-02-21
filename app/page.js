"use client"
import TransactionForm from "@/app/components/TransactionForm";
import TransactionList from "@/app/components/TransactionList";
import ExpenseChart from "@/app/components/ExpenceChart";
import { useState } from "react";
import Dashboard from "./components/Dashboard";

export default function Home() {
  const [reload, setReload] = useState(false);

  const handleTransactionAdded = () => {
    setReload(!reload);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 via-indigo-900 to-gray-900 text-white flex justify-center items-center">
      <div className="w-full max-w-3xl p-6 rounded-lg bg-white/10 backdrop-blur-md shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 tracking-wide">
          💰 Personal Finance Visualizer
        </h1>

        <TransactionForm onTransactionAdded={handleTransactionAdded} />
        <TransactionList reload={reload} />
        <ExpenseChart reload={reload} />
        <Dashboard/>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import MonthlyChart from "@/components/MonthlyChart";
import useAllTransactions from "@/hook/useAllTransactions";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

export default function HomePage() {
 
  const { isPending, error, transaction, refetch } = useAllTransactions();

  const handleAdd = async (form) => {
    try {
      await axios.post("https://personal-finance-visualizer-fywo.onrender.com/transactions", form);
      toast.success("Transaction added!");
      refetch();
    } catch {
      toast.error("Failed to add transaction");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://personal-finance-visualizer-fywo.onrender.com/transactions/${id}`);
      toast.success("Transaction deleted!");
      refetch();
    } catch {
      toast.error("Failed to delete transaction");
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      const res = await axios.put(
        `https://personal-finance-visualizer-fywo.onrender.com/transactions/${id}`,
        updatedData // updatedData এর মধ্যে category থাকবে
      );
      if (res) {
        toast.success("Transaction updated!");
        refetch();
      }
    } catch (error) {
      toast.error("Failed to update");
      console.error(error);
    }
  };

  return (
    <main className="container max-w-6xl mx-auto px-4 py-6 space-y-8 min-h-screen flex flex-col">
      {/* Header + Theme Toggle */}

      {/* Form */}
      <section className="w-full rounded-lg shadow-lg bg-white dark:bg-gray-800 p-6 transition-colors duration-300">
        <TransactionForm onAdd={handleAdd} />
      </section>

      {/* Content */}
      <section className="flex flex-col space-y-6">
        {isPending ? (
          <p className="text-center text-gray-700 dark:text-gray-300">
            Loading...
          </p>
        ) : error ? (
          <p className="text-center text-red-500">Error fetching data.</p>
        ) : (
          <>
            <div className="rounded-lg shadow-lg bg-white dark:bg-gray-800 p-6 transition-colors duration-300">
              <TransactionList
                transactions={transaction}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            </div>

            <div className="rounded-lg shadow-lg bg-white dark:bg-gray-800 p-6 transition-colors duration-300">
              <MonthlyChart transactions={transaction} />
            </div>
          </>
        )}
      </section>
    </main>
  );
}

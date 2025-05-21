"use client";

import { useState } from "react";
import { CATEGORIES } from "./categories";

export default function TransactionForm({ onAdd }) {
  const [form, setForm] = useState({ amount: "", date: "", description: "", category: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.amount || !form.date || !form.description || !form.category) {
      alert("All fields are required!");
      return;
    }
    onAdd(form);
    console.log(form)
    setForm({ amount: "", date: "", description: "", category: "" });
  };

  return (
    <div className="container mx-auto p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 rounded-xl p-6 space-y-6 transition-colors duration-300"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 flex flex-col">
            <label
              htmlFor="amount"
              className="mb-1 text-gray-700 dark:text-gray-300 font-semibold"
            >
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              className="rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="flex-1 flex flex-col">
            <label
              htmlFor="date"
              className="mb-1 text-gray-700 dark:text-gray-300 font-semibold"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="category"
            className="mb-1 text-gray-700 dark:text-gray-300 font-semibold"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          >
            <option value="">Select Category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="description"
            className="mb-1 text-gray-700 dark:text-gray-300 font-semibold"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter description"
            rows={4}
            className="resize-none rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-md py-3 shadow-md transition"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
}
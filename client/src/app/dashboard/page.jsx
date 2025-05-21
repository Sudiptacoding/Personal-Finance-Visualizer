"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useMemo, useState } from "react";
import useAllTransactions from "@/hook/useAllTransactions";

const COLORS = ["#6366f1", "#ec4899", "#10b981", "#f59e0b", "#ef4444", "#3b82f6"];

export default function Dashboard() {
  const { isPending, error, transaction: transactions = [], refetch } = useAllTransactions();
  const [yearFilter, setYearFilter] = useState("");

  const availableYears = useMemo(() => {
    const yearsSet = new Set();
    transactions.forEach((tx) => {
      const year = new Date(tx.date).getFullYear();
      yearsSet.add(year);
    });
    return Array.from(yearsSet).sort((a, b) => b - a); 
  }, [transactions]);


  const monthlyData = useMemo(() => {
    return Object.values(
      transactions.reduce((acc, tx) => {
        const date = new Date(tx.date);
        const year = date.getFullYear();
        if (yearFilter && year !== parseInt(yearFilter)) return acc; 
        const month = date.toLocaleString("default", { month: "short" });
        const key = `${month} ${year}`; 

        acc[key] = acc[key] || { monthYear: key, total: 0 };
        acc[key].total += parseFloat(tx.amount);
        return acc;
      }, {})
    );
  }, [transactions, yearFilter]);

  const categoryData = useMemo(() => {
    return Object.values(
      transactions.reduce((acc, tx) => {
        if (yearFilter) {
          const year = new Date(tx.date).getFullYear();
          if (year !== parseInt(yearFilter)) return acc;
        }
        const cat = tx.category || "Uncategorized";
        acc[cat] = acc[cat] || { name: cat, value: 0 };
        acc[cat].value += parseFloat(tx.amount);
        return acc;
      }, {})
    );
  }, [transactions, yearFilter]);

  const totalSpent = transactions.reduce((sum, tx) => {
    if (yearFilter) {
      const year = new Date(tx.date).getFullYear();
      if (year !== parseInt(yearFilter)) return sum;
    }
    return sum + parseFloat(tx.amount);
  }, 0);

  const recentTransactions = transactions
    .filter((tx) => {
      if (!yearFilter) return true;
      return new Date(tx.date).getFullYear() === parseInt(yearFilter);
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 space-y-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">📊 Dashboard Overview</h1>

      {/* Year Filter Dropdown */}
      <div className="mb-6 flex justify-center">
        <select
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          className="border border-gray-300 rounded p-2 dark:bg-gray-800 dark:text-white"
        >
          <option value="">All Years</option>
          {availableYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="bg-indigo-100 dark:bg-indigo-800 p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-100">Total Expenses</h2>
          <p className="text-2xl font-bold text-indigo-700 dark:text-white">৳{totalSpent.toFixed(2)}</p>
        </div>
        <div className="bg-pink-100 dark:bg-pink-800 p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-100">Categories</h2>
          <p className="text-2xl font-bold text-pink-700 dark:text-white">{categoryData.length}</p>
        </div>
        <div className="bg-green-100 dark:bg-green-800 p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-100">Recent Transactions</h2>
          <p className="text-2xl font-bold text-green-700 dark:text-white">{recentTransactions.length}</p>
        </div>
      </div>

      {/* Monthly Bar Chart */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Monthly Expenses {yearFilter ? `(${yearFilter})` : "(All Years)"}</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <XAxis
              dataKey="monthYear"
              stroke="#4f46e5"
              tickLine={false}
              axisLine={{ stroke: "#6366f1" }}
              tick={{ fontWeight: "600", fill: "#4f46e5" }}
            />
            <YAxis
              stroke="#4f46e5"
              tickLine={false}
              axisLine={{ stroke: "#6366f1" }}
              tick={{ fill: "#4f46e5" }}
              tickFormatter={(value) => `৳${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                borderRadius: "8px",
                border: "none",
                color: "#d1d5db",
                fontWeight: "600",
              }}
              cursor={{ fill: "rgba(79, 70, 229, 0.2)" }}
              formatter={(value) => [`৳${value.toFixed(2)}`, "Total"]}
            />
            <Bar dataKey="total" fill="#4f46e5" radius={[8, 8, 0, 0]} barSize={40} animationDuration={800} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Category Pie Chart */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Category-wise Breakdown {yearFilter ? `(${yearFilter})` : ""}</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              outerRadius={100}
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`৳${value.toFixed(2)}`, "Spent"]} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Recent Transactions {yearFilter ? `(${yearFilter})` : ""}</h2>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {recentTransactions.map((tx, i) => (
            <li key={i} className="py-2 flex justify-between text-sm text-gray-700 dark:text-gray-300">
              <span>{tx.description || "No Description"}</span>
              <span>৳{parseFloat(tx.amount).toFixed(2)}</span>
              <span className="italic">{tx.category || "Uncategorized"}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

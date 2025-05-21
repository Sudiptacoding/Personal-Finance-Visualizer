"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function MonthlyChart({ transactions }) {
  const data = Object.values(
    transactions.reduce((acc, tx) => {
      const month = new Date(tx.date).toLocaleString("default", { month: "short" });
      acc[month] = acc[month] || { month, total: 0 };
      acc[month].total += parseFloat(tx.amount);
      return acc;
    }, {})
  );

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100 tracking-wide drop-shadow-sm">
        📊 Monthly Expenses Overview
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Here’s a clear visualization of your expenses throughout the months.
      </p>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <XAxis
            dataKey="month"
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
          <Legend
            verticalAlign="top"
            iconType="circle"
            wrapperStyle={{ color: "#4f46e5", fontWeight: "600", paddingBottom: "1rem" }}
          />
          <Bar
            dataKey="total"
            name="Total Expense"
            fill="#4f46e5"
            radius={[8, 8, 0, 0]}
            barSize={40}
            animationDuration={800}
            style={{ filter: "drop-shadow(0 4px 6px rgba(79, 70, 229, 0.3))" }}
          />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-6 text-center text-gray-500 dark:text-gray-400 italic select-none">
        Keep tracking your spending &amp; take control of your budget 💡
      </div>
    </div>
  );
}

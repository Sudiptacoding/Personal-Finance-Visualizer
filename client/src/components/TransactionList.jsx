// "use client";

// import { useState, useMemo } from "react";

// export default function TransactionList({ transactions, onDelete, onUpdate }) {
//   const [editId, setEditId] = useState(null);
//   const [formData, setFormData] = useState({
//     amount: "",
//     date: "",
//     description: "",
//   });

//   // Search & Filter States
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterDate, setFilterDate] = useState("");

//   const handleEditClick = (tx) => {
//     setEditId(tx._id);
//     setFormData({
//       amount: tx.amount,
//       date: new Date(tx.date).toISOString().split("T")[0],
//       description: tx.description,
//       category: tx.category || "", // ডিফল্ট খালি রাখা, যদি না থাকে
//     });
//   };

//   const handleUpdateSubmit = (e) => {
//     e.preventDefault();
//     onUpdate(editId, formData); // formData এখন category সহ যাবেই
//     setEditId(null);
//   };

//   // Filter & Search Logic
//   const filteredTransactions = useMemo(() => {
//     return transactions
//       .filter(
//         (tx) =>
//           tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           tx.amount.toString().includes(searchTerm)
//       )
//       .filter((tx) => (filterDate ? tx.date.startsWith(filterDate) : true));
//   }, [transactions, searchTerm, filterDate]);


  

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-gray-100 tracking-wide">
//         Transactions
//       </h2>

//       {/* Search & Filter */}
//       <div className="flex flex-col sm:flex-row gap-4 mb-8">
//         <input
//           type="text"
//           placeholder="Search by description or amount..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="flex-1 px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm"
//           aria-label="Search transactions"
//         />
//         <input
//           type="month"
//           value={filterDate}
//           onChange={(e) => setFilterDate(e.target.value)}
//           className="w-48 px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm"
//           aria-label="Filter by month"
//           title="Filter by month"
//         />
//         {(searchTerm || filterDate) && (
//           <button
//             onClick={() => {
//               setSearchTerm("");
//               setFilterDate("");
//             }}
//             className="px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-md font-semibold shadow-md transition"
//             aria-label="Clear filters"
//           >
//             Clear
//           </button>
//         )}
//       </div>

//       {/* Transactions List */}
//       <ul className="space-y-6">
//         {filteredTransactions.length === 0 && (
//           <p className="text-center text-gray-500 dark:text-gray-400 italic">
//             No transactions found.
//           </p>
//         )}
//         {filteredTransactions.map((tx) => (
//           <li
//             key={tx._id}
//             className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300"
//           >
//             {editId === tx._id ? (
//               <form onSubmit={handleUpdateSubmit} className="space-y-5">
//                 <input
//                   type="number"
//                   value={formData.amount}
//                   onChange={(e) =>
//                     setFormData({ ...formData, amount: e.target.value })
//                   }
//                   placeholder="Amount"
//                   className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-5 py-3 text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm"
//                   required
//                   min="0"
//                   step="0.01"
//                 />
//                 <input
//                   type="date"
//                   value={formData.date}
//                   onChange={(e) =>
//                     setFormData({ ...formData, date: e.target.value })
//                   }
//                   className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-5 py-3 text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm"
//                   required
//                 />
//                 <select
//                   value={formData.category}
//                   onChange={(e) =>
//                     setFormData({ ...formData, category: e.target.value })
//                   }
//                   className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-5 py-3 text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm"
//                   required
//                 >
//                   <option value="" disabled>
//                     Select category
//                   </option>
//                   <option value="Food">Food</option>
//                   <option value="Transportation">Transportation</option>
//                   <option value="Shopping">Shopping</option>
//                   <option value="Bills">Bills</option>
//                   <option value="Entertainment">Entertainment</option>
//                   <option value="Other">Other</option>
//                 </select>

//                 <textarea
//                   value={formData.description}
//                   onChange={(e) =>
//                     setFormData({ ...formData, description: e.target.value })
//                   }
//                   placeholder="Description"
//                   rows={4}
//                   className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-5 py-3 text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition shadow-sm"
//                   required
//                 />

//                 <div className="flex justify-end gap-4">
//                   <button
//                     type="submit"
//                     className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-md shadow-md transition flex items-center gap-2"
//                   >
//                     {/* Save Icon */}
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                       strokeWidth={2}
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M5 13l4 4L19 7"
//                       />
//                     </svg>
//                     Save
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => setEditId(null)}
//                     className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-md shadow-md transition flex items-center gap-2"
//                   >
//                     {/* Cancel Icon */}
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                       strokeWidth={2}
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M6 18L18 6M6 6l12 12"
//                       />
//                     </svg>
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             ) : (
//               <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 cursor-pointer border border-gray-200 dark:border-gray-700 rounded-lg p-5 mb-6 shadow-sm hover:shadow-lg transition-shadow bg-white dark:bg-gray-800">
//                 <div className="flex flex-col space-y-3 md:space-y-1 md:flex-row md:items-center md:space-x-8">
//                   <p className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight min-w-[90px] md:min-w-auto">
//                     ৳{tx.amount}
//                   </p>

//                   <div className="flex flex-col">
//                     <p className="text-gray-800 dark:text-gray-200 font-semibold text-lg leading-relaxed whitespace-pre-wrap max-w-xl">
//                       {tx.description}
//                     </p>

//                     <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500 dark:text-gray-400 font-mono tracking-wide select-none">
//                       <time
//                         dateTime={new Date(tx.date).toISOString()}
//                         className="flex items-center gap-1"
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="h-4 w-4 text-gray-400 dark:text-gray-500"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                           strokeWidth={2}
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2v-7H3v7a2 2 0 002 2z"
//                           />
//                         </svg>
//                         {new Date(tx.date).toLocaleDateString(undefined, {
//                           year: "numeric",
//                           month: "short",
//                           day: "numeric",
//                         })}
//                       </time>

//                       {/* Category with gradient pill */}
//                       <span className="inline-flex items-center bg-gradient-to-r from-blue-400 to-indigo-600 text-white rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide shadow-sm">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="h-4 w-4 mr-1"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                           strokeWidth={2}
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             d="M4 6h16M4 12h16M4 18h16"
//                           />
//                         </svg>
//                         {tx.category || "Uncategorized"}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex gap-8 items-center">
//                   <button
//                     onClick={() => handleEditClick(tx)}
//                     className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 dark:hover:text-indigo-400 font-semibold transition transform hover:scale-105"
//                     aria-label={`Edit transaction ${tx._id}`}
//                     title="Edit"
//                     type="button"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-6 w-6"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                       strokeWidth={2}
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M11 5h6m-6 4h6m-6 4h6m-6 4h6M5 19v-2a4 4 0 014-4h2"
//                       />
//                     </svg>
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => onDelete(tx._id)}
//                     className="flex items-center gap-2 text-red-600 hover:text-red-800 dark:hover:text-red-400 font-semibold transition transform hover:scale-105"
//                     aria-label={`Delete transaction ${tx._id}`}
//                     title="Delete"
//                     type="button"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-6 w-6"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                       strokeWidth={2}
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M6 18L18 6M6 6l12 12"
//                       />
//                     </svg>
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }














"use client";

import { useState } from "react";

export default function TransactionList({ transactions, onDelete, onUpdate }) {
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    amount: "",
    date: "",
    description: "",
    category: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [activeCategory, setActiveCategory] = useState("");

  const handleEditClick = (tx) => {
    setEditId(tx._id);
    setFormData({
      amount: tx.amount,
      date: new Date(tx.date).toISOString().split("T")[0],
      description: tx.description,
      category: tx.category || "",
    });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    onUpdate(editId, formData);
    setEditId(null);
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category === activeCategory ? "" : category);
  };

  const filteredTransactions = transactions
    .filter(
      (tx) =>
        tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.amount.toString().includes(searchTerm)
    )
    .filter((tx) => (filterDate ? tx.date.startsWith(filterDate) : true))
    .filter((tx) => (activeCategory ? tx.category === activeCategory : true));

  const uniqueCategories = [...new Set(transactions.map((tx) => tx.category).filter(Boolean))];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-gray-100 tracking-wide">
        Transactions
      </h2>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by description or amount..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm"
        />

        <input
          type="month"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="w-48 px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm"
        />

        {(searchTerm || filterDate || activeCategory) && (
          <button
            onClick={() => {
              setSearchTerm("");
              setFilterDate("");
              setActiveCategory("");
            }}
            className="px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-md font-semibold shadow-md transition"
          >
            Clear
          </button>
        )}
      </div>

      {/* Dynamic Category Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {uniqueCategories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium border ${
              activeCategory === category
                ? "bg-blue-600 text-white border-blue-700"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Transactions List */}
      <ul className="space-y-6">
        {filteredTransactions.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 italic">
            No transactions found.
          </p>
        )}
        {filteredTransactions.map((tx) => (
          <li
            key={tx._id}
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            {editId === tx._id ? (
              <form onSubmit={handleUpdateSubmit} className="space-y-5">
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  placeholder="Amount"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-5 py-3 text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700"
                  required
                />
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-5 py-3 text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700"
                  required
                />
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-5 py-3 text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700"
                  required
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  <option value="Food">Food</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Bills">Bills</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Other">Other</option>
                </select>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Description"
                  rows={4}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-5 py-3 text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700"
                  required
                />
                <div className="flex justify-end gap-4">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditId(null)}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    ৳{tx.amount}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    {tx.description}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(tx.date).toLocaleDateString()}
                  </p>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    {tx.category}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditClick(tx)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(tx._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

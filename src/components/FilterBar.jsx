import { useState, useRef, useEffect } from "react";
export default function FilterBar({
  showAnalytics,
  setShowAnalytics,
  showFilters,
  setShowFilters,
}) {
  
  const filterRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilters(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="border-t border-gray-100 px-8 py-3 flex justify-between items-center">
      <div className="flex gap-4">
        <button
          onClick={() => setShowAnalytics(!showAnalytics)}
          className={`
    px-6 py-3 rounded-full font-medium transition
    ${
      showAnalytics
        ? "border border-indigo-500 bg-indigo-50 text-indigo-600"
        : "border border-gray-200 bg-white"
    }
  `}
        >
          📊 Visual Analytics
        </button>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`
    px-6 py-3 rounded-full font-medium transition
    ${
      showFilters
        ? "border border-indigo-500 bg-indigo-50 text-indigo-600"
        : "border border-gray-200 bg-white"
    }
  `}
        >
          🔍 Advanced Filters
        </button>
      </div>
    </div>
  );
}

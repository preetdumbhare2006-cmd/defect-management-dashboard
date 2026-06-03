export default function FilterBar() {
  return (
    <div className="border-t border-gray-100 px-8 py-5 flex justify-between items-center">
      <div className="flex gap-4">
        <button className="px-6 py-3 rounded-full border border-indigo-400 text-indigo-600 font-medium">
          📊 Visual Analytics
        </button>

        <button className="px-6 py-3 rounded-full border border-gray-200 bg-white">
          🔍 Advanced Filters
        </button>
      </div>

      <div className="px-6 py-3 rounded-full border border-gray-200 text-gray-500 tracking-wider text-sm">
        NO FILTERS APPLIED
      </div>
    </div>
  );
}

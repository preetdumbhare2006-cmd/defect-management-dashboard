import { FiMenu, FiBell, FiMail, FiSearch } from "react-icons/fi";

export default function Navbar({ search, setSearch, darkMode, setDarkMode }) {
  return (
    <div className="h-16 bg-white border-b flex items-center justify-between px-8">
      <div className="flex items-center gap-4">
        <FiMenu size={22} />
        <h2 className="font-semibold text-lg">Report</h2>
      </div>

      <div className="relative">
        <FiSearch className="absolute left-4 top-4 text-gray-400" />

        <input
          type="text"
          placeholder="Search screens..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
          w-[420px]
          pl-11
          pr-4
          py-3
          rounded-full
          border
          outline-none
          "
        />
      </div>

      <div className="flex items-center gap-5">
        <FiMail size={20} />
        <FiBell size={20} />

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="font-medium text-sm">Info QA</div>

            <div className="text-xs text-gray-500">Administrator</div>
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="border rounded-xl px-3 py-2"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          <div
            className="
    w-11
    h-11
    rounded-full
    bg-indigo-600
    text-white
    flex
    items-center
    justify-center
    font-semibold
    "
          >
            SB
          </div>
        </div>
      </div>
    </div>
  );
}

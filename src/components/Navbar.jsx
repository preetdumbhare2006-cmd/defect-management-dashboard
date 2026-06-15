import { FiMenu, FiBell, FiMail, FiSearch } from "react-icons/fi";

export default function Navbar({ search, setSearch, darkMode, setDarkMode }) {
  return (
    <div
      className="
bg-white/90
backdrop-blur-md
border-b
border-slate-200
flex
flex-col
lg:flex-row
gap-4
lg:gap-0
items-center
justify-between
px-4
md:px-8
py-3
sticky
top-0
z-50
"
    >
      <div className="flex items-center gap-4">
        <button
          className="
    w-10
    h-10
    rounded-xl
    hover:bg-slate-100
    flex
    items-center
    justify-center
    transition
  "
        >
          <FiMenu size={22} />
        </button>

        <div>
          <h2 className="font-bold text-lg text-slate-900">Defect Report</h2>

          <p className="text-xs text-slate-400">Analytics Dashboard</p>
        </div>
      </div>
      <div className="relative w-full md:w-auto">
        <FiSearch className="absolute left-4 top-3.5 text-slate-400" />

        <input
          type="text"
          placeholder="Search screens..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
w-full
md:w-[500px]
h-12
pl-11
pr-4
rounded-2xl
border
border-slate-200
bg-slate-50
outline-none
focus:ring-4
focus:ring-indigo-100
focus:border-indigo-400
transition
"
        />
      </div>

      <div
        className="
flex
items-center
gap-3
md:gap-5
w-full
lg:w-auto
justify-center
"
      >
        <div
          className="
  w-10
  h-10
  rounded-xl
  border
  border-slate-200
  bg-slate-50
  flex
  items-center
  justify-center
  hover:bg-indigo-50
  transition
"
        >
          <FiMail size={18} />
        </div>

        <div
          className="
  w-10
  h-10
  rounded-xl
  border
  border-slate-200
  bg-slate-50
  flex
  items-center
  justify-center
  hover:bg-indigo-50
  transition
"
        >
          <FiBell size={18} />
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="font-medium text-sm">Info QA</div>

            <div className="text-xs text-gray-500">Administrator</div>
          </div>

          <div
            className="
    w-11
    h-11
    rounded-2xl
bg-gradient-to-r
from-indigo-500
to-purple-500
shadow-lg
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

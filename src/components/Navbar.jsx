import { FiMenu, FiBell, FiMail, FiSearch } from "react-icons/fi";
import { LogOut, Moon, Sun } from "lucide-react";

export default function Navbar({
  search,
  setSearch,
  darkMode,
  setDarkMode,
  notifications,
  showNotifications,
  setShowNotifications,
}) {
  return (
    <div
      className={`
backdrop-blur-md
border-b
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
${darkMode ? "bg-black/95 border-neutral-800" : "bg-white/90 border-slate-200"}
`}
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
          <h2
            className={`font-bold text-lg ${
              darkMode ? "text-white" : "text-slate-900"
            }`}
          >
            Defect Report
          </h2>

          <p
            className={`text-xs ${
              darkMode ? "text-slate-400" : "text-slate-400"
            }`}
          >
            Analytics Dashboard
          </p>
        </div>
      </div>
      <div className="relative w-full md:w-auto">
        <FiSearch className="absolute left-4 top-3.5 text-slate-400" />

        <input
          type="text"
          placeholder="Search screens..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`
w-full
md:w-[500px]
h-12
pl-11
pr-4
rounded-2xl
border
outline-none
transition
focus:ring-4
focus:ring-indigo-100
focus:border-indigo-400
${
  darkMode
    ? "bg-neutral-950 border-neutral-800 text-white placeholder:text-neutral-500"
    : "bg-slate-50 border-slate-200"
}
`}
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
          className={`
w-10
h-10
rounded-xl
border
flex
items-center
justify-center
transition
${darkMode ? "bg-neutral-950 border-neutral-800 text-neutral-200" : "bg-slate-50 border-slate-200"}
`}
        >
          <FiMail size={18} />
        </div>

        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className={`
w-10
h-10
rounded-xl
border
flex
items-center
justify-center
transition
relative
${
  darkMode
    ? "bg-neutral-950 border-neutral-800 text-neutral-200"
    : "bg-slate-50 border-slate-200"
}
`}
          >
            <FiBell size={18} />

            {notifications.length > 0 && (
              <span
                className="
absolute
-top-1
-right-1
w-5
h-5
rounded-full
bg-red-500
text-white
text-[10px]
flex
items-center
justify-center
font-bold
"
              >
                {notifications.length}
              </span>
            )}
          </button>

          {showNotifications && (
            <div
              className={`
absolute
right-0
top-14
w-80
rounded-3xl
shadow-2xl
z-50
overflow-hidden
${
  darkMode
    ? "bg-neutral-950 border border-neutral-800"
    : "bg-white border border-slate-200"
}
`}
            >
              <div className="p-4 border-b border-slate-200">
                <h3 className="font-semibold">Notifications</h3>
              </div>

              <div className="max-h-80 overflow-y-auto">
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    className={`
p-4
border-b
cursor-pointer
transition
${
  darkMode
    ? "border-neutral-800 hover:bg-neutral-900"
    : "border-slate-100 hover:bg-slate-50"
}
`}
                  >
                    <p className="font-medium">{item.title}</p>

                    <span className="text-xs text-slate-400">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`
h-10
px-4
rounded-xl
border
flex
items-center
gap-2
transition
${
  darkMode
    ? "bg-neutral-950 border-neutral-800 text-yellow-300"
    : "bg-slate-50 border-slate-200"
}
`}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}

          <span className="text-sm font-medium">
            {darkMode ? "Light" : "Dark"}
          </span>
        </button>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/login";
          }}
          className={`
w-10
h-10
rounded-xl
border
flex
items-center
justify-center
transition
${darkMode ? "bg-neutral-950 border-neutral-800 text-neutral-200" : "bg-slate-50 border-slate-200"}
`}
        >
          <LogOut size={18} />
        </button>
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

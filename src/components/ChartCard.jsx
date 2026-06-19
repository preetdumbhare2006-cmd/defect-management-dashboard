export default function ChartCard({
  title,
  children,
  footerData = [],
  darkMode,
}) {
  return (
    <div
      className={`
      ${darkMode ? "bg-neutral-950 border-neutral-800" : "bg-white border-gray-100"}
      rounded-[28px]
      border
      shadow-[0_10px_30px_rgba(99,102,241,0.08)]
      p-6
      h-[420px]
      flex
      flex-col
    `}
    >
      <h3
        className={`
        text-[13px]
        font-bold
        tracking-[4px]
        uppercase
        ${darkMode ? "text-neutral-200" : "text-slate-700"}
      `}
      >
        {title}
      </h3>

      <div className="flex-1 flex items-center justify-center">{children}</div>

      <div
        className="
flex
items-center
gap-3
overflow-x-auto
hide-scrollbar
overflow-y-hidden
px-2
py-2
mt-auto
min-h-[52px]
whitespace-nowrap
"
      >
        {footerData.length > 0
          ? footerData.map((item, index) => (
              <div
                key={index}
                className={`
        flex
        items-center
        gap-2
        ${darkMode ? "bg-neutral-900" : "bg-slate-100"}
        rounded-full
        px-4
        h-10
        shrink-0
      `}
              >
                <span className="w-2 h-2 rounded-full bg-indigo-300"></span>

                <span
                  className={`text-sm ${
                    darkMode ? "text-neutral-200" : "text-slate-700"
                  }`}
                >
                  {item.subject || item.name || item.tag}
                </span>

                <span
                  className={`font-semibold ${
                    darkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  {item.value}
                </span>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default function ChartCard({ title, children }) {
  return (
    <div
      className="
      bg-white
      rounded-[28px]
      border
      border-gray-100
      shadow-[0_10px_30px_rgba(99,102,241,0.08)]
      p-6
      h-[400px]
    "
    >
      <h3
        className="
        text-[13px]
        font-bold
        tracking-[4px]
        uppercase
        text-slate-700
      "
      >
        {title}
      </h3>

      <div className="h-[220px] flex items-center justify-center">
        {children}
      </div>

      <div className="flex gap-2 mt-2">
        <div className="bg-slate-100 rounded-full px-3 py-2 text-xs">
          Major Problem 27
        </div>

        <div className="bg-slate-100 rounded-full px-3 py-2 text-xs">
          Minor Problem 21
        </div>

        <div className="flex gap-2 mt-3 overflow-x-auto">
          <div className="bg-slate-100 rounded-full px-3 py-2 text-xs">
            Sample 27
          </div>
        </div>
      </div>
    </div>
  );
}

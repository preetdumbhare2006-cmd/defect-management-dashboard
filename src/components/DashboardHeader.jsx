import { Plus, Archive } from "lucide-react";
export default function DashboardHeader({
  defects,
  activeTab,
  setActiveTab,
  onAddDefect,
}) {
  const exportCSV = () => {
    const headers = ["ID", "Title", "Assignee", "Status", "Environment"];

    const rows = defects.map((item) => [
      item.id,
      item.title,
      item.assignee,
      item.status,
      item.environment,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    saveAs(blob, "defects-report.csv");
  };
  return (
    <div
      className="
p-4 md:p-6
flex
flex-col
xl:flex-row
gap-6
justify-between
items-start
xl:items-center
"
    >
      <div>
        <h1
          className="
text-2xl
sm:text-3xl
md:text-4xl
font-bold
text-slate-900
leading-tight
"
        >
          Defect Management Dashboard
        </h1>

        <p className="text-gray-400 mt-2">Smart Defect Control Center</p>
      </div>

      <div
        className="
flex
flex-col
sm:flex-row
flex-wrap
gap-3
w-full
xl:w-auto
"
      >
        <button
          onClick={() => setActiveTab("active")}
          className={`
    w-full
sm:w-auto
px-4
h-auto
min-h-[44px]
    rounded-2xl
    font-semibold
    transition-all
    ${
      activeTab === "active"
        ? "bg-indigo-50 text-indigo-700 border border-indigo-100"
        : "bg-slate-100 text-slate-600 border border-slate-200"
    }
  `}
        >
          ● Active Defects {defects.length}
        </button>

        <button
          onClick={() => setActiveTab("archived")}
          className={`
    w-full
sm:w-auto
px-4
h-auto
min-h-[44px]
    rounded-2xl
    font-semibold
    transition-all
    ${
      activeTab === "archived"
        ? "bg-indigo-50 text-indigo-700 border border-indigo-100"
        : "bg-slate-100 text-slate-600 border border-slate-200"
    }
  `}
        >
          Archived Defects 1129
        </button>

        <button
          onClick={() => {
            console.log("ADD BUTTON CLICKED");
            onAddDefect?.();
          }}
          className="
w-full
sm:w-auto
px-4
h-auto
min-h-[44px]
rounded-2xl
bg-gradient-to-r
from-indigo-600
to-violet-600
text-white
font-semibold
shadow-lg
shadow-indigo-200
hover:-translate-y-0.5
transition-all
duration-200
flex items-center justify-center gap-2
"
        >
          <Plus size={18} />
          Add Defect
        </button>
      </div>
    </div>
  );
}

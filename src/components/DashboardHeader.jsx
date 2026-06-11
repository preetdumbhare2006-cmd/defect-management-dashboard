import { Plus, Download, Archive } from "lucide-react";
export default function DashboardHeader({ defects, activeTab, setActiveTab }) {
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
    <div className="p-6 flex justify-between items-center">
      <div>
        <h1 className="text-4xl font-bold text-slate-900">
          Defect Management Dashboard
        </h1>

        <p className="text-gray-400 mt-2">Smart Defect Control Center</p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => setActiveTab("active")}
          className={`
    px-5
    h-10
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
          ● Active Defects 60
        </button>

        <button
          onClick={() => setActiveTab("archived")}
          className={`
    px-5
    h-10
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
          onClick={exportCSV}
          className="
px-5
h-10
rounded-2xl
bg-emerald-600
text-white
font-semibold
shadow-lg
shadow-emerald-200
hover:-translate-y-0.5
hover:bg-emerald-700
transition-all
duration-200
flex items-center justify-center gap-2
"
        >
          <Download size={18} />
          Export CSV
        </button>

        <button
          className="
px-5
h-10
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

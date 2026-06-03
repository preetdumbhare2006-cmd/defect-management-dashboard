export default function DashboardHeader({ defects }) {
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
    <div className="p-8 flex justify-between items-center">
      <div>
        <h1 className="text-4xl font-bold text-slate-900">
          Defect Management Dashboard
        </h1>

        <p className="text-gray-400 mt-2">Smart Defect Control Center</p>
      </div>

      <div className="flex gap-4">
        <button className="h-14 px-8 rounded-full border-2 border-indigo-300 text-indigo-600 font-medium">
          Active Defects 60
        </button>

        <button className="h-14 px-8 rounded-full bg-slate-100 font-medium">
          Archived Defects 1129
        </button>

        <button
          onClick={exportCSV}
          className="
    h-14
    px-8
    rounded-xl
    bg-green-600
    text-white
    font-semibold
  "
        >
          Export CSV
        </button>

        <button className="h-14 px-8 rounded-xl bg-indigo-600 text-white font-semibold">
          + Add Defect
        </button>
      </div>
    </div>
  );
}

import { Plus, FileSpreadsheet, FileText, ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export default function DashboardHeader({
  defects,
  activeTab,
  setActiveTab,
  onAddDefect,
  user,
  darkMode,
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

  const exportPDF = () => {
    const totalDefects = defects.length;

    const openDefects = defects.filter(
      (d) =>
        d.status?.toLowerCase() === "assigned" ||
        d.status?.toLowerCase() === "open",
    ).length;

    const rejectedDefects = defects.filter(
      (d) => d.status?.toLowerCase() === "rejected",
    ).length;

    const criticalDefects = defects.filter(
      (d) => d.severity === "Crash/Data Loss" || d.severity === "Major Problem",
    ).length;

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Defect Dashboard Report", 14, 15);

    doc.setFontSize(11);
    doc.text(`Generated On: ${new Date().toLocaleString("en-IN")}`, 14, 25);

    doc.setFontSize(12);
    doc.text(`Total Defects: ${totalDefects}`, 14, 35);
    doc.text(`Open Defects: ${openDefects}`, 14, 43);
    doc.text(`Rejected Defects: ${rejectedDefects}`, 14, 51);
    doc.text(`Critical Defects: ${criticalDefects}`, 14, 59);

    autoTable(doc, {
      startY: 70,
      head: [["ID", "Title", "Assignee", "Status", "Severity"]],
      body: defects.map((item) => [
        item.id,
        item.title,
        item.assignee,
        item.status,
        item.severity,
      ]),
    });

    doc.save("Defect_Report.pdf");
  };

  const buttonBase =
    "w-full sm:w-auto min-h-[44px] px-4 rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

  const tabBase = `${buttonBase} border ${
    darkMode
      ? "focus-visible:ring-blue-400 focus-visible:ring-offset-neutral-950"
      : "focus-visible:ring-blue-500 focus-visible:ring-offset-white"
  }`;

  const inactiveTabClass = darkMode
    ? "bg-neutral-950 text-neutral-300 border-neutral-800 hover:bg-neutral-900 hover:text-white"
    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900";

  const selectedTabClass = darkMode
    ? "bg-blue-500/15 text-blue-200 border-blue-400/30 shadow-sm shadow-blue-950/20"
    : "bg-blue-50 text-blue-700 border-blue-200 shadow-sm shadow-blue-100/70";

  const actionBase = `${buttonBase} flex items-center justify-center gap-2 border shadow-sm hover:-translate-y-0.5 ${
    darkMode
      ? "focus-visible:ring-offset-neutral-950"
      : "focus-visible:ring-offset-white"
  }`;

  const primaryAction = darkMode
    ? "bg-blue-500 text-white border-blue-400/40 shadow-blue-950/20 hover:bg-blue-400 focus-visible:ring-blue-300"
    : "bg-blue-600 text-white border-blue-600 shadow-blue-100 hover:bg-blue-700 focus-visible:ring-blue-500";

  const successAction = darkMode
    ? "bg-emerald-500/12 text-emerald-200 border-emerald-400/25 hover:bg-emerald-500/20 focus-visible:ring-emerald-300"
    : "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 focus-visible:ring-emerald-500";

  const dangerAction = darkMode
    ? "bg-rose-500/12 text-rose-200 border-rose-400/25 hover:bg-rose-500/20 focus-visible:ring-rose-300"
    : "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100 focus-visible:ring-rose-500";

  const neutralAction = darkMode
    ? "bg-neutral-950 text-neutral-200 border-neutral-800 hover:bg-neutral-900 focus-visible:ring-neutral-400"
    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 focus-visible:ring-slate-500";

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
          className={`
text-2xl
sm:text-3xl
md:text-4xl
font-bold
leading-tight
${darkMode ? "text-white" : "text-slate-900"}
`}
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
          className={`${tabBase} ${
            activeTab === "active" ? selectedTabClass : inactiveTabClass
          }`}
        >
          <span className="mr-1 inline-block h-2 w-2 rounded-full bg-current align-middle" />
          Active Defects {defects.length}
        </button>

        <button
          onClick={() => setActiveTab("archived")}
          className={`${tabBase} ${
            activeTab === "archived" ? selectedTabClass : inactiveTabClass
          }`}
        >
          Archived Defects 1129
        </button>

        {user?.role === "admin" && (
          <button
            onClick={() => {
              console.log("ADD BUTTON CLICKED");
              onAddDefect?.();
            }}
            className={`${actionBase} ${primaryAction}`}
          >
            <Plus size={18} />
            Add Defect
          </button>
        )}

        <button
          onClick={exportCSV}
          className={`${actionBase} ${successAction}`}
        >
          <FileSpreadsheet size={18} />
          Export Excel
        </button>

        <button onClick={exportPDF} className={`${actionBase} ${dangerAction}`}>
          <FileText size={18} />
          Export PDF
        </button>

        <Link to="/audit" className={`${actionBase} ${neutralAction}`}>
          <ClipboardList size={18} />
          Audit Logs
        </Link>
      </div>
    </div>
  );
}

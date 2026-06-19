import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AuditLogs() {
    const darkMode = false;
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/audit");

      setLogs(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const filteredLogs = logs.filter((log) =>
    (log.userName || "").toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <div
      className={`min-h-screen p-6 ${
        darkMode ? "bg-black text-white" : "bg-slate-100"
      }`}
    >
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1
            className={`text-4xl font-bold ${
              darkMode ? "text-white" : "text-slate-900"
            }`}
          >
            Audit Logs
          </h1>

          <p
            className={`mt-1 ${darkMode ? "text-slate-400" : "text-slate-500"}`}
          >
            Track all activities performed inside the system
          </p>
        </div>
      </div>
      <div className="mb-4">
        <Link
          to="/"
          className="
bg-indigo-600
text-white
px-5
py-3
rounded-xl
shadow-lg
hover:bg-indigo-700
transition
"
        >
          ← Back To Dashboard
        </Link>
      </div>
      <input
        type="text"
        placeholder="Search User..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={`
w-full
max-w-md
px-4
py-3
rounded-xl
border
shadow-sm
mb-6
focus:outline-none
focus:ring-2
focus:ring-indigo-500
${
  darkMode
    ? "bg-neutral-950 border-neutral-800 text-white placeholder:text-neutral-500"
    : "bg-white border-slate-200"
}
`}
      />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div
          className={`p-5 rounded-2xl shadow ${
            darkMode ? "bg-neutral-950 border border-neutral-800" : "bg-white"
          }`}
        >
          <p className={darkMode ? "text-slate-400" : "text-slate-500"}>
            Total Logs
          </p>
          <h2 className="text-3xl font-bold">{logs.length}</h2>
        </div>

        <div
          className={`p-5 rounded-2xl shadow ${
            darkMode ? "bg-green-900/20 border border-green-800" : "bg-green-50"
          }`}
        >
          <p className="text-green-700">ADD</p>
          <h2 className="text-3xl font-bold">
            {logs.filter((x) => x.actionType === "ADD").length}
          </h2>
        </div>

        <div
          className={`p-5 rounded-2xl shadow ${
            darkMode
              ? "bg-yellow-900/20 border border-yellow-800"
              : "bg-yellow-50"
          }`}
        >
          <p className="text-yellow-700">UPDATE</p>
          <h2 className="text-3xl font-bold">
            {logs.filter((x) => x.actionType === "UPDATE").length}
          </h2>
        </div>

        <div
          className={`p-5 rounded-2xl shadow ${
            darkMode ? "bg-red-900/20 border border-red-800" : "bg-red-50"
          }`}
        >
          <p className="text-red-700">DELETE</p>
          <h2 className="text-3xl font-bold">
            {logs.filter((x) => x.actionType === "DELETE").length}
          </h2>
        </div>
      </div>

      <div
        className={`
    rounded-3xl
    shadow-xl
    overflow-hidden
    ${
      darkMode
        ? "bg-neutral-950 border border-neutral-800"
        : "bg-white border border-slate-200"
    }
  `}
      >
        <table className="w-full">
          <thead
            className={
              darkMode ? "bg-black text-white" : "bg-slate-900 text-white"
            }
          >
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Action</th>
              <th className="p-3 text-left">Defect ID</th>
              <th className="p-3 text-left">Created At</th>
            </tr>
          </thead>

          <tbody>
            {filteredLogs.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-16 text-slate-500 text-lg font-semibold"
                >
                  🔍 No Data Found
                </td>
              </tr>
            ) : (
              filteredLogs.map((log, index) => (
                <tr
                  key={log.id}
                  className={`
          border-b
          transition
          ${
            darkMode
              ? "border-neutral-800 hover:bg-neutral-900"
              : "hover:bg-slate-50"
          }
        `}
                >
                  <td
                    className={`p-3 ${
                      darkMode ? "text-slate-200" : "text-slate-900"
                    }`}
                  >
                    {index + 1}
                  </td>

                  <td
                    className={`p-3 ${
                      darkMode ? "text-slate-200" : "text-slate-900"
                    }`}
                  >
                    {log.userName || "Unknown User"}
                  </td>

                  <td
                    className={`p-3 ${
                      darkMode ? "text-slate-200" : "text-slate-900"
                    }`}
                  >
                    <span
                      className={
                        log.actionType === "ADD"
                          ? "bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold text-xs"
                          : log.actionType === "UPDATE"
                            ? "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-semibold text-xs"
                            : "bg-red-100 text-red-700 px-3 py-1 rounded-full font-semibold text-xs"
                      }
                    >
                      {log.actionType}
                    </span>
                  </td>

                  <td
                    className={`p-3 ${
                      darkMode ? "text-slate-200" : "text-slate-900"
                    }`}
                  >
                    {log.defectId}
                  </td>

                  <td
                    className={`p-3 ${
                      darkMode ? "text-slate-200" : "text-slate-900"
                    }`}
                  >
                    {new Date(log.createdAt).toLocaleString("en-IN")}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

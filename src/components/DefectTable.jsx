import { useState } from "react";
import { FiEdit2, FiMoreVertical, FiFilter } from "react-icons/fi";

import { defects } from "../data/defectsData";
export default function DefectTable({ search }) {
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDefect, setSelectedDefect] = useState(null);
  const rowsPerPage = 5;
  const filteredDefects = defects.filter((item) => {
    const searchText = search.toLowerCase();

    return (
      item.title.toLowerCase().includes(searchText) ||
      item.assignee.toLowerCase().includes(searchText) ||
      item.status.toLowerCase().includes(searchText) ||
      item.environment.toLowerCase().includes(searchText) ||
      item.id.toString().includes(searchText)
    );
  });
  const sortedDefects = [...filteredDefects].sort((a, b) =>
    sortAsc ? a.id - b.id : b.id - a.id,
  );
  const lastIndex = currentPage * rowsPerPage;
  const firstIndex = lastIndex - rowsPerPage;

  const currentRows = sortedDefects.slice(firstIndex, lastIndex);
  return (
    <div className="px-8 pb-8">
      <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="h-16 border-b bg-white">
              <th className="w-16">
                <button className="border rounded-xl p-2">
                  <FiFilter />
                </button>
              </th>
              <th
                className="text-left cursor-pointer"
                onClick={() => setSortAsc(!sortAsc)}
              >
                ID {sortAsc ? "↑" : "↓"}
              </th>

              <th className="text-left">ID ↕</th>
              <th className="text-left">DEFECT TITLE</th>
              <th className="text-left">ASSIGNEE</th>
              <th className="text-left">STATUS</th>
              <th className="text-left">STAGE</th>
              <th className="text-left">ENVIRONMENT</th>
              <th className="text-left">SEVERITY</th>
              <th className="text-left">TAGS</th>
            </tr>
          </thead>

          <tbody>
            {currentRows.map((item) => (
              <tr
                key={item.id}
                onClick={() => setSelectedDefect(item)}
                className="
h-20
border-b
hover:bg-indigo-50
cursor-pointer
transition
"
              >
                <td>
                  <div className="flex gap-2 justify-center">
                    <button className="border rounded-xl p-2">
                      <FiEdit2 />
                    </button>

                    <button className="border rounded-xl p-2">
                      <FiMoreVertical />
                    </button>
                  </div>
                </td>

                <td>{item.id}</td>

                <td>{item.title}</td>

                <td>
                  <div className="flex items-center gap-2">
                    <div
                      className="
                      w-8 h-8
                      rounded-full
                      bg-indigo-100
                      flex
                      items-center
                      justify-center
                      text-xs
                      "
                    >
                      {item.assignee
                        .split(" ")
                        .map((word) => word[0])
                        .join("")}
                    </div>

                    {item.assignee}
                  </div>
                </td>

                <td>{item.status}</td>

                <td>{item.stage}</td>

                <td>{item.environment}</td>

                <td>
                  <span
                    className={
                      item.severity === "Crash/Data Loss"
                        ? "bg-red-100 text-red-600 px-3 py-2 rounded-full text-sm"
                        : "bg-gray-100 px-3 py-2 rounded-full text-sm"
                    }
                  >
                    {item.severity}
                  </span>
                </td>

                <td>{item.tag}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end items-center gap-3 p-4 border-t">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            className="
      border
      px-4
      py-2
      rounded-lg
      hover:bg-slate-100
    "
          >
            Previous
          </button>

          <span className="font-medium">Page {currentPage}</span>

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="
      border
      px-4
      py-2
      rounded-lg
      hover:bg-slate-100
    "
          >
            Next
          </button>
        </div>
        {selectedDefect && (
          <div
            className="
    fixed
    top-0
    right-0
    h-screen
    w-[400px]
    bg-white
    shadow-2xl
    p-6
    z-50
    "
          >
            <h2 className="text-2xl font-bold mb-6">Defect Details</h2>

            <div className="space-y-4">
              <p>
                <b>ID:</b> {selectedDefect.id}
              </p>

              <p>
                <b>Title:</b> {selectedDefect.title}
              </p>

              <p>
                <b>Assignee:</b> {selectedDefect.assignee}
              </p>

              <p>
                <b>Status:</b> {selectedDefect.status}
              </p>

              <p>
                <b>Stage:</b> {selectedDefect.stage}
              </p>

              <p>
                <b>Environment:</b> {selectedDefect.environment}
              </p>

              <p>
                <b>Severity:</b> {selectedDefect.severity}
              </p>
            </div>

            <button
              onClick={() => setSelectedDefect(null)}
              className="
      mt-8
      bg-indigo-600
      text-white
      px-5
      py-3
      rounded-xl
      "
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";

import { Clock3, Pencil, Trash2, Funnel } from "lucide-react";
import axios from "axios";

export default function DefectTable({
  data,
  search,
  statusFilter,
  severityFilter,
  assigneeFilter,
  stageFilter,
  environmentFilter,
  tagFilter,
  sourceFilter,

  setStageFilter,
  setEnvironmentFilter,
  setTagFilter,
  defectOwnerFilter,

  onEdit,
  onDelete,
  darkMode,
}) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [sortAsc, setSortAsc] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

  const [selectedDefect, setSelectedDefect] = useState(null);
  const [historyLogs, setHistoryLogs] = useState([]);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showRowsDropdown, setShowRowsDropdown] = useState(false);

  const [idFilter, setIdFilter] = useState("");

  const [titleFilter, setTitleFilter] = useState("");

  const [statusInlineFilter, setStatusInlineFilter] = useState("");

  const [showColumnFilters, setShowColumnFilters] = useState(false);

  const [severityInlineFilter, setSeverityInlineFilter] = useState("");

  const [assigneeInlineFilter, setAssigneeInlineFilter] = useState("");
  const [stageInlineFilter, setStageInlineFilter] = useState("");
  const [environmentInlineFilter, setEnvironmentInlineFilter] = useState("");
  const [tagInlineFilter, setTagInlineFilter] = useState("");
  const [sourceInlineFilter, setSourceInlineFilter] = useState("");
  const [defectOwnerInlineFilter, setDefectOwnerInlineFilter] = useState("");
  const [defectReleaseInlineFilter, setDefectReleaseInlineFilter] =
    useState("");
  const [showEnvironmentDropdownInline, setShowEnvironmentDropdownInline] =
    useState(false);
  const [showStatusDropdownInline, setShowStatusDropdownInline] =
    useState(false);

  const [showStageDropdownInline, setShowStageDropdownInline] = useState(false);

  const [showSeverityDropdownInline, setShowSeverityDropdownInline] =
    useState(false);

  const [showTagDropdownInline, setShowTagDropdownInline] = useState(false);

  const [showSourceDropdownInline, setShowSourceDropdownInline] =
    useState(false);
  const statusOptions = [
    ...new Set(
      data
        .map((item) => item.status?.trim())
        .filter(Boolean)
        .map((x) => x.toLowerCase()),
    ),
  ].map((x) => x.charAt(0).toUpperCase() + x.slice(1));

  const stageOptions = [
    ...new Set(
      data
        .map((item) => item.stage?.trim())
        .filter(Boolean)
        .map((x) => x.toLowerCase()),
    ),
  ].map((x) => x.charAt(0).toUpperCase() + x.slice(1));

  const severityOptions = [
    ...new Set(
      data
        .map((item) => item.severity?.trim())
        .filter(Boolean)
        .map((x) => x.toLowerCase()),
    ),
  ].map((x) =>
    x
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" "),
  );

  const tagOptions = [
    ...new Set(
      data
        .map((item) => item.tag?.trim())
        .filter(Boolean)
        .map((x) => x.toUpperCase()),
    ),
  ];

  const sourceOptions = [
    ...new Set(
      data
        .map((item) => item.source?.trim())
        .filter(Boolean)
        .map((x) => x.toUpperCase()),
    ),
  ];
  const filterInputClass = `
w-full
h-11
px-4
border
rounded-2xl
text-sm
font-medium
shadow-sm
outline-none
transition-all
duration-200
${
  darkMode
    ? "bg-neutral-900 border-neutral-700 text-white placeholder:text-neutral-500"
    : "bg-white border-slate-200 text-slate-700 placeholder:text-slate-400"
}
`;

  const filterDropdownButtonClass = `
w-full
h-11
px-4
border
rounded-2xl
text-sm
font-medium
shadow-sm
flex
items-center
justify-between
transition-all
${
  darkMode
    ? "bg-neutral-900 border-neutral-700 text-white"
    : "bg-white border-slate-200 text-slate-700"
}
`;

  const filterDropdownClass = `
absolute
z-[9999]
mt-2
w-full
rounded-2xl
shadow-xl
overflow-hidden
border
${darkMode ? "bg-neutral-900 border-neutral-700" : "bg-white border-slate-200"}
`;

  const filterOptionClass = `
flex
items-center
justify-between
px-4
py-3
cursor-pointer
transition
${
  darkMode
    ? "hover:bg-neutral-800 text-white"
    : "hover:bg-indigo-50 text-slate-700"
}
`;

  const filterClearClass = `
px-4
py-3
border-t
cursor-pointer
${
  darkMode
    ? "border-neutral-700 text-red-400 hover:bg-red-500/10"
    : "border-slate-100 text-red-500 hover:bg-red-50"
}
`;
  ("w-full h-10 px-4 bg-white border border-slate-200 rounded-2xl text-sm font-medium text-slate-700 shadow-sm hover:border-indigo-300 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all");

  useEffect(() => {
    setCurrentPage(1);

    setRowsPerPage(5);

    setSelectedDefect(null);
  }, [data]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    search,

    statusFilter,

    severityFilter,

    assigneeFilter,

    stageFilter,

    environmentFilter,

    tagFilter,

    sourceFilter,
  ]);

  const filteredDefects = data.filter((item) => {
    const searchText = search.toLowerCase();
    const matchesStageInline =
      !stageInlineFilter || item.stage === stageInlineFilter;

    const matchesEnvironmentInline =
      !environmentInlineFilter || item.environment === environmentInlineFilter;

    const matchesTagInline = !tagInlineFilter || item.tag === tagInlineFilter;

    const matchesSearch =
      item.title.toLowerCase().includes(searchText) ||
      item.assignee.toLowerCase().includes(searchText) ||
      item.status.toLowerCase().includes(searchText) ||
      item.environment.toLowerCase().includes(searchText) ||
      item.id.toString().includes(searchText);

    const matchesStatus =
      statusFilter.length === 0 || statusFilter.includes(item.status);

    const matchesSeverity =
      severityFilter.length === 0 || severityFilter.includes(item.severity);

    const matchesStage =
      stageFilter.length === 0 || stageFilter.includes(item.stage);

    const matchesEnvironment =
      environmentFilter.length === 0 ||
      environmentFilter.includes(item.environment);
    const matchesTag = tagFilter.length === 0 || tagFilter.includes(item.tag);
    const matchesSource =
      sourceFilter.length === 0 || sourceFilter.includes(item.source);
    const matchesDefectOwner =
      defectOwnerFilter.length === 0 ||
      defectOwnerFilter.includes(item.defectOwner);

    const matchesId = !idFilter || item.id.toString().includes(idFilter);

    const matchesTitle =
      !titleFilter ||
      item.title.toLowerCase().includes(titleFilter.toLowerCase());

    const matchesAssignee =
      assigneeFilter.length === 0 || assigneeFilter.includes(item.assignee);

    const matchesInlineAssignee =
      !assigneeInlineFilter ||
      item.assignee.toLowerCase().includes(assigneeInlineFilter.toLowerCase());

    const matchesInlineStatus =
      !statusInlineFilter || item.status === statusInlineFilter;

    const matchesSeverityInline =
      !severityInlineFilter || item.severity === severityInlineFilter;
    const matchesSourceInline =
      !sourceInlineFilter || item.source === sourceInlineFilter;

    const matchesDefectOwnerInline =
      !defectOwnerInlineFilter ||
      item.defectOwner
        .toLowerCase()
        .includes(defectOwnerInlineFilter.toLowerCase());

    const matchesDefectReleaseInline =
      !defectReleaseInlineFilter ||
      item.defectRelease
        .toLowerCase()
        .includes(defectReleaseInlineFilter.toLowerCase());

    return (
      matchesSearch &&
      matchesStatus &&
      matchesSeverity &&
      matchesId &&
      matchesTitle &&
      matchesAssignee &&
      matchesInlineStatus &&
      matchesStage &&
      matchesEnvironment &&
      matchesSeverityInline &&
      matchesTag &&
      matchesInlineAssignee &&
      matchesStageInline &&
      matchesEnvironmentInline &&
      matchesTagInline &&
      matchesSource &&
      matchesSourceInline &&
      matchesDefectOwnerInline &&
      matchesDefectReleaseInline &&
      matchesDefectOwner
    );
  });

  const sortedDefects = [...filteredDefects].sort((a, b) =>
    sortAsc ? a.id - b.id : b.id - a.id,
  );

  const totalPages = Math.max(1, Math.ceil(sortedDefects.length / rowsPerPage));

  const lastIndex = currentPage * rowsPerPage;

  const firstIndex = lastIndex - rowsPerPage;

  const currentRows = sortedDefects.slice(firstIndex, lastIndex);
  const fetchHistory = async (defectId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:5000/api/history/${defectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setHistoryLogs(res.data);
      setShowHistoryModal(true);
    } catch (err) {
      console.log(err);
    }
  };

  const startRecord = filteredDefects.length === 0 ? 0 : firstIndex + 1;

  const endRecord = Math.min(lastIndex, filteredDefects.length);

  return (
    <div className="px-2 md:px-8 pb-8">
      <div
        className={`
    relative
    ${darkMode ? "bg-neutral-950 border-neutral-800" : "bg-white border-slate-200"}
    rounded-[28px]
    border
    overflow-visible
    shadow-sm
  `}
      >
        <div className="overflow-x-auto hide-scrollbar">
          <table className="min-w-[1200px] w-full">
            <colgroup>
              <col style={{ width: "132px" }} /> {/* Actions */}
              <col style={{ width: "80px" }} /> {/* ID */}
              <col style={{ width: "350px" }} /> {/* Title */}
              <col style={{ width: "250px" }} /> {/* Assignee */}
              <col style={{ width: "140px" }} /> {/* Status */}
              <col style={{ width: "120px" }} /> {/* Stage */}
              <col style={{ width: "170px" }} /> {/* Environment */}
              <col style={{ width: "180px" }} /> {/* Severity */}
              <col style={{ width: "100px" }} /> {/* Tags */}
              <col style={{ width: "220px" }} /> {/* Release */}
              <col style={{ width: "240px" }} /> {/* Owner */}
              <col style={{ width: "150px" }} /> {/* Source */}
            </colgroup>
            <thead
              className={`sticky top-0 z-10 ${
                darkMode ? "bg-black" : "bg-slate-50"
              }`}
            >
              <tr
                className={`h-14 border-b ${
                  darkMode
                    ? "bg-black border-neutral-800"
                    : "bg-slate-50 border-slate-200"
                }`}
              >
                <th className="w-16">
                  <button
                    onClick={() => {
                      if (showColumnFilters) {
                        setIdFilter("");
                        setTitleFilter("");
                        setAssigneeInlineFilter("");
                        setStatusInlineFilter("");
                        setStageInlineFilter("");
                        setEnvironmentInlineFilter("");
                        setSeverityInlineFilter("");
                        setTagInlineFilter("");
                        setSourceInlineFilter("");
                        setDefectOwnerInlineFilter("");
                        setDefectReleaseInlineFilter("");

                        // NEW
                        setCurrentPage(1);
                      }

                      setShowColumnFilters(!showColumnFilters);
                    }}
                  >
                    <Funnel size={18} />
                  </button>
                </th>

                <th
                  className="text-left cursor-pointer px-2 py-2"
                  onClick={() => !showColumnFilters && setSortAsc(!sortAsc)}
                >
                  {showColumnFilters ? (
                    <div ttitle="Search ID">
                      <input
                        placeholder="Search ID"
                        value={idFilter}
                        onChange={(e) => setIdFilter(e.target.value)}
                        onMouseEnter={(e) => {
                          e.target.placeholder = "Search ID";
                        }}
                        onMouseLeave={(e) => {
                          e.target.placeholder = "Search...";
                        }}
                        className={filterInputClass}
                      />
                    </div>
                  ) : (
                    <>ID {sortAsc ? "↑" : "↓"}</>
                  )}
                </th>

                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-2 py-2">
                  {showColumnFilters ? (
                    <input
                      placeholder="Search title"
                      value={titleFilter}
                      onChange={(e) => setTitleFilter(e.target.value)}
                      className={filterInputClass}
                    />
                  ) : (
                    "DEFECT TITLE"
                  )}
                </th>

                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-2 py-2">
                  {showColumnFilters ? (
                    <input
                      placeholder="Search assignee"
                      value={assigneeInlineFilter}
                      onChange={(e) => setAssigneeInlineFilter(e.target.value)}
                      className={filterInputClass}
                    />
                  ) : (
                    "ASSIGNEE"
                  )}
                </th>

                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-2 py-2">
                  {showColumnFilters ? (
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() =>
                          setShowStatusDropdownInline(!showStatusDropdownInline)
                        }
                        className={filterDropdownButtonClass}
                      >
                        <span className="flex-1 truncate text-left">
                          {statusInlineFilter || "Status"}
                        </span>

                        <span className="ml-2 text-slate-400 flex-shrink-0">
                          ▼
                        </span>
                      </button>

                      {showStatusDropdownInline && (
                        <div
                          className={`absolute z-50 mt-2 w-full rounded-2xl shadow-xl overflow-visible border
      ${
        darkMode
          ? "bg-neutral-900 border-neutral-700"
          : "bg-white border-slate-200"
      }`}
                        >
                          {statusOptions.map((status) => (
                            <div
                              key={status}
                              onClick={() => {
                                setStatusInlineFilter(status);
                                setShowStatusDropdownInline(false);
                              }}
                              className={`flex items-center justify-between px-4 py-3 cursor-pointer
${
  darkMode
    ? "hover:bg-neutral-800 text-white"
    : "hover:bg-indigo-50 text-slate-700"
}`}
                            >
                              <span>{status}</span>
                              {statusInlineFilter === status && (
                                <span className="text-indigo-600 font-bold">
                                  ✓
                                </span>
                              )}
                            </div>
                          ))}

                          <div
                            onClick={() => {
                              setStatusInlineFilter("");
                              setShowStatusDropdownInline(false);
                            }}
                            className={`px-4 py-3 border-t cursor-pointer
${
  darkMode
    ? "border-neutral-700 text-red-400 hover:bg-red-500/10"
    : "border-slate-100 text-red-500 hover:bg-red-50"
}`}
                          >
                            Clear
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    "STATUS"
                  )}
                </th>

                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-2 py-2">
                  {showColumnFilters ? (
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() =>
                          setShowStageDropdownInline(!showStageDropdownInline)
                        }
                        className={filterDropdownButtonClass}
                      >
                        <span className="flex-1 truncate text-left">
                          {stageInlineFilter || "Stage"}
                        </span>

                        <span className="ml-2 text-slate-400 flex-shrink-0">
                          ▼
                        </span>
                      </button>

                      {showStageDropdownInline && (
                        <div className={filterDropdownClass}>
                          {stageOptions.map((stage) => (
                            <div
                              key={stage}
                              onClick={() => {
                                setStageInlineFilter(stage);
                                setShowStageDropdownInline(false);
                              }}
                              className={filterOptionClass}
                            >
                              <span>{stage}</span>

                              {stageInlineFilter === stage && (
                                <span className="text-indigo-600 font-bold">
                                  ✓
                                </span>
                              )}
                            </div>
                          ))}

                          <div
                            onClick={() => {
                              setStageInlineFilter("");
                              setShowStageDropdownInline(false);
                            }}
                            className={filterClearClass}
                          >
                            Clear
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    "STAGE"
                  )}
                </th>

                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-2 py-2">
                  {showColumnFilters ? (
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() =>
                          setShowEnvironmentDropdownInline(
                            !showEnvironmentDropdownInline,
                          )
                        }
                        className={filterDropdownButtonClass}
                      >
                        <span className="flex-1 truncate text-left">
                          {environmentInlineFilter || "Environment"}
                        </span>

                        <span className="ml-2 text-slate-400 flex-shrink-0">
                          ▼
                        </span>
                      </button>

                      {showEnvironmentDropdownInline && (
                        <div className={filterDropdownClass}>
                          {["QA", "DEV", "BCBSKS PROD"].map((env) => (
                            <div
                              key={env}
                              onClick={() => {
                                setEnvironmentInlineFilter(env);
                                setShowEnvironmentDropdownInline(false);
                              }}
                              className={filterOptionClass}
                            >
                              <span>{env}</span>

                              {environmentInlineFilter === env && (
                                <span className="text-indigo-600 font-bold">
                                  ✓
                                </span>
                              )}
                            </div>
                          ))}

                          <div
                            onClick={() => {
                              setEnvironmentInlineFilter("");
                              setShowEnvironmentDropdownInline(false);
                            }}
                            className={filterClearClass}
                          >
                            Clear
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    "ENVIRONMENT"
                  )}
                </th>

                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-2 py-2">
                  {showColumnFilters ? (
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() =>
                          setShowSeverityDropdownInline(
                            !showSeverityDropdownInline,
                          )
                        }
                        className={filterDropdownButtonClass}
                      >
                        <span className="flex-1 truncate text-left">
                          {severityInlineFilter || "Severity"}
                        </span>

                        <span className="ml-2 text-slate-400 flex-shrink-0">
                          ▼
                        </span>
                      </button>

                      {showSeverityDropdownInline && (
                        <div className={filterDropdownClass}>
                          {severityOptions.map((severity) => (
                            <div
                              key={severity}
                              onClick={() => {
                                setSeverityInlineFilter(severity);
                                setShowSeverityDropdownInline(false);
                              }}
                              className={filterOptionClass}
                            >
                              <span>{severity}</span>
                              {severityInlineFilter === severity && (
                                <span className="text-indigo-600 font-bold">
                                  ✓
                                </span>
                              )}
                            </div>
                          ))}

                          <div
                            onClick={() => {
                              setSeverityInlineFilter("");
                              setShowSeverityDropdownInline(false);
                            }}
                            className={filterClearClass}
                          >
                            Clear
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    "SEVERITY"
                  )}
                </th>

                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-2 py-2">
                  {showColumnFilters ? (
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() =>
                          setShowTagDropdownInline(!showTagDropdownInline)
                        }
                        className={filterDropdownButtonClass}
                      >
                        <span className="flex-1 truncate text-left">
                          {tagInlineFilter || "Tags"}
                        </span>

                        <span className="ml-2 text-slate-400 flex-shrink-0">
                          ▼
                        </span>
                      </button>

                      {showTagDropdownInline && (
                        <div className={filterDropdownClass}>
                          {tagOptions.map((tag) => (
                            <div
                              key={tag}
                              onClick={() => {
                                setTagInlineFilter(tag);
                                setShowTagDropdownInline(false);
                              }}
                              className={filterOptionClass}
                            >
                              <span>{tag}</span>
                              {tagInlineFilter === tag && (
                                <span className="text-indigo-600 font-bold">
                                  ✓
                                </span>
                              )}
                            </div>
                          ))}

                          <div
                            onClick={() => {
                              setTagInlineFilter("");
                              setShowTagDropdownInline(false);
                            }}
                            className={filterClearClass}
                          >
                            Clear
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    "TAGS"
                  )}
                </th>

                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-2 py-2 ">
                  {showColumnFilters ? (
                    <input
                      placeholder="Release"
                      value={defectReleaseInlineFilter}
                      onChange={(e) =>
                        setDefectReleaseInlineFilter(e.target.value)
                      }
                      className={filterInputClass}
                    />
                  ) : (
                    "DEFECT RELEASE"
                  )}
                </th>

                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-2 py-2">
                  {showColumnFilters ? (
                    <input
                      placeholder="Owner"
                      value={defectOwnerInlineFilter}
                      onChange={(e) =>
                        setDefectOwnerInlineFilter(e.target.value)
                      }
                      className={filterInputClass}
                    />
                  ) : (
                    "DEFECT OWNER"
                  )}
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-2 py-2">
                  {showColumnFilters ? (
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() =>
                          setShowSourceDropdownInline(!showSourceDropdownInline)
                        }
                        className={filterDropdownButtonClass}
                      >
                        <span className="flex-1 truncate text-left">
                          {sourceInlineFilter || "Source"}
                        </span>

                        <span className="ml-2 text-slate-400 flex-shrink-0">
                          ▼
                        </span>
                      </button>

                      {showSourceDropdownInline && (
                        <div className={filterDropdownClass}>
                          {sourceOptions.map((source) => (
                            <div
                              key={source}
                              onClick={() => {
                                setSourceInlineFilter(source);
                                setShowSourceDropdownInline(false);
                              }}
                              className={filterOptionClass}
                            >
                              <span>{source}</span>
                              {sourceInlineFilter === source && (
                                <span className="text-indigo-600 font-bold">
                                  ✓
                                </span>
                              )}
                            </div>
                          ))}

                          <div
                            onClick={() => {
                              setSourceInlineFilter("");
                              setShowSourceDropdownInline(false);
                            }}
                            className={filterClearClass}
                          >
                            Clear
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    "SOURCE"
                  )}
                </th>
              </tr>
            </thead>

            <tbody>
              {currentRows.length > 0 ? (
                currentRows.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => setSelectedDefect(item)}
                    className={`
    h-16
    border-b
    ${
      darkMode
        ? "border-neutral-800 hover:bg-neutral-900 text-neutral-200"
        : "border-slate-100 hover:bg-indigo-50/40"
    }
    cursor-pointer
    transition-all
    duration-200
`}
                  >
                    <td className="px-3">
                      {user?.role === "admin" && (
                        <div
                          className={`
        flex
        items-center
        gap-1.5
        ${
          darkMode
            ? "bg-black/80 border-neutral-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
            : "bg-white border-slate-200 shadow-sm"
        }
        border
        p-1.5
        rounded-2xl
        w-fit
      `}
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation();

                              console.log("EDIT CLICKED", item);

                              onEdit?.(item);
                            }}
                            className={`flex h-8 w-8 items-center justify-center rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                              darkMode
                                ? "text-neutral-300 hover:bg-blue-500/15 hover:text-blue-300"
                                : "text-slate-500 hover:bg-blue-50 hover:text-blue-600"
                            }`}
                            aria-label="Edit defect"
                            title="Edit defect"
                          >
                            <Pencil size={15} strokeWidth={2.2} />
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onDelete?.(item.id);
                            }}
                            className={`flex h-8 w-8 items-center justify-center rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 ${
                              darkMode
                                ? "text-neutral-400 hover:bg-rose-500/15 hover:text-rose-300"
                                : "text-slate-500 hover:bg-rose-50 hover:text-rose-600"
                            }`}
                            aria-label="Delete defect"
                            title="Delete defect"
                          >
                            <Trash2 size={15} strokeWidth={2.2} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              fetchHistory(item.id);
                            }}
                            className={`flex h-8 w-8 items-center justify-center rounded-xl text-[0px] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                              darkMode
                                ? "text-neutral-400 hover:bg-amber-500/15 hover:text-amber-300"
                                : "text-slate-500 hover:bg-amber-50 hover:text-amber-600"
                            }`}
                            aria-label="View history"
                            title="View history"
                          >
                            <Clock3 size={15} strokeWidth={2.2} />
                            🕒
                          </button>
                        </div>
                      )}
                    </td>

                    <td className="py-4">{item.id}</td>

                    <td
                      className={`font-medium ${
                        darkMode ? "text-white" : "text-slate-800"
                      }`}
                    >
                      <div
                        className="truncate max-w-[250px]"
                        title={item.title}
                      >
                        {item.title}
                      </div>
                    </td>

                    <td>
                      <div className="flex items-center gap-2">
                        <div
                          className={`
      w-10
      h-10
      rounded-full
      flex
      items-center
      justify-center
      text-xs
      font-semibold
      ${
        darkMode
          ? "bg-indigo-600 text-white"
          : "bg-gradient-to-r from-indigo-100 to-purple-100 text-slate-700"
      }
    `}
                        >
                          {item.assignee
                            .split(" ")
                            .map((word) => word[0])
                            .join("")}
                        </div>

                        <div
                          className={`truncate max-w-[180px] ${
                            darkMode ? "text-white" : "text-slate-800"
                          }`}
                          title={item.assignee}
                        >
                          {item.assignee}
                        </div>
                      </div>
                    </td>

                    <td>
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border
      ${
        item.status === "Assigned"
          ? darkMode
            ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
            : "bg-emerald-50 text-emerald-700 border-emerald-200"
          : darkMode
            ? "bg-red-500/15 text-red-400 border-red-500/30"
            : "bg-red-50 text-red-700 border-red-200"
      }
    `}
                      >
                        <span
                          className={`w-2 h-2 rounded-full
        ${item.status === "Assigned" ? "bg-emerald-500" : "bg-red-500"}
      `}
                        />

                        {item.status}
                      </span>
                    </td>

                    <td>{item.stage}</td>

                    <td>
                      <div
                        className="truncate max-w-[140px]"
                        title={item.environment}
                      >
                        {item.environment}
                      </div>
                    </td>

                    <td>
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-xs font-semibold border
      ${
        item.severity === "Major Problem"
          ? darkMode
            ? "bg-red-500/15 text-red-400 border-red-500/30"
            : "bg-red-50 text-red-700 border-red-200"
          : item.severity === "Minor Problem"
            ? darkMode
              ? "bg-amber-500/15 text-amber-400 border-amber-500/30"
              : "bg-amber-50 text-amber-700 border-amber-200"
            : item.severity === "Suggestion"
              ? darkMode
                ? "bg-blue-500/15 text-blue-400 border-blue-500/30"
                : "bg-blue-50 text-blue-700 border-blue-200"
              : darkMode
                ? "bg-slate-500/15 text-slate-300 border-slate-500/30"
                : "bg-slate-100 text-slate-700 border-slate-200"
      }
    `}
                      >
                        <span
                          className={`w-2 h-2 rounded-full
        ${
          item.severity === "Major Problem"
            ? "bg-red-500"
            : item.severity === "Minor Problem"
              ? "bg-amber-500"
              : item.severity === "Suggestion"
                ? "bg-blue-500"
                : "bg-slate-500"
        }
      `}
                        />

                        <span
                          className="truncate max-w-[120px]"
                          title={item.severity}
                        >
                          {item.severity}
                        </span>
                      </span>
                    </td>

                    <td>
                      <div className="truncate max-w-[80px]" title={item.tag}>
                        {item.tag}
                      </div>
                    </td>

                    <td>
                      <div
                        className={`truncate max-w-[200px] ${
                          darkMode ? "text-neutral-200" : "text-slate-800"
                        }`}
                        title={item.defectRelease}
                      >
                        {item.defectRelease}
                      </div>
                    </td>

                    <td>
                      <div className="flex items-center gap-2">
                        <div
                          className={`
      w-8
      h-8
      rounded-full
      flex
      items-center
      justify-center
      text-xs
      font-medium
      ${
        darkMode
          ? "bg-cyan-600 text-white"
          : "bg-gradient-to-r from-cyan-100 to-blue-100 text-slate-700"
      }
    `}
                        >
                          {item.defectOwner
                            .split(" ")
                            .map((word) => word[0])
                            .join("")
                            .slice(0, 2)}
                        </div>

                        <div
                          className={`truncate max-w-[180px] ${
                            darkMode ? "text-white" : "text-slate-800"
                          }`}
                          title={item.defectOwner}
                        >
                          {item.defectOwner}
                        </div>
                      </div>
                    </td>

                    <td>
                      <div
                        className="truncate max-w-[120px]"
                        title={item.source}
                      >
                        {item.source}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12" className="py-16 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="text-4xl">🔍</div>

                      <h3 className="text-lg font-semibold text-slate-700">
                        No matching defects found
                      </h3>

                      <p className="text-sm text-slate-500">
                        Try changing your search term or filters.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div
          className={`
  flex
  flex-col
  md:flex-row
  items-center
  justify-between
  gap-4
  p-4
  md:p-6
  border-t
  ${darkMode ? "border-neutral-800" : "border-slate-100"}
`}
        >
          {/* Left */}

          <div className="text-center md:text-left">
            {filteredDefects.length === 0 ? (
              <span className="text-sm text-red-500 font-medium">
                No matching records found
              </span>
            ) : (
              <span className="text-sm text-slate-500">
                Showing {startRecord}-{endRecord} of {filteredDefects.length}{" "}
                results
              </span>
            )}
          </div>

          {/* Center Pagination */}

          <div
            className="
  flex
  flex-wrap
  justify-center
  items-center
  gap-2
  order-1
  md:order-none
"
          >
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className={`
        w-10 h-10
        rounded-xl
        border
        ${
          darkMode
            ? "bg-neutral-900 border-neutral-700 text-white hover:bg-neutral-800"
            : "bg-white border-slate-200 hover:bg-slate-50"
        }
        disabled:opacity-40
        disabled:cursor-not-allowed
      `}
            >
              ‹
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`

          w-10 h-10

          rounded-xl

          border

          transition-all

          ${
            currentPage === index + 1
              ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
              : darkMode
                ? "bg-neutral-900 border-neutral-700 text-white hover:bg-neutral-800"
                : "bg-white border-slate-200 hover:bg-slate-50"
          }

        `}
              >
                {index + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(currentPage + 1)}
              className={`
        w-10 h-10
        rounded-xl
        border
        ${
          darkMode
            ? "bg-neutral-900 border-neutral-700 text-white hover:bg-neutral-800"
            : "bg-white border-slate-200 hover:bg-slate-50"
        }
        disabled:opacity-40
        disabled:cursor-not-allowed
      `}
            >
              <span className={darkMode ? "text-white" : "text-slate-700"}>
                ›
              </span>
            </button>
          </div>

          {/* Right */}

          <div
            className="
  flex
  flex-wrap
  justify-center
  items-center
  gap-3
"
          >
            <>
              <span className="hidden md:block text-sm text-slate-500">
                Rows per page
              </span>

              <span className="block md:hidden text-sm text-slate-500">
                Rows
              </span>
            </>

            <div className="relative">
              <button
                onClick={() => setShowRowsDropdown(!showRowsDropdown)}
                className={`
    w-[80px]
    h-10
    border
    ${
      darkMode
        ? "bg-neutral-900 border-neutral-700 text-white"
        : "bg-white border-slate-200"
    }
    rounded-xl
    text-sm
    font-medium
    transition
    flex
    items-center
    justify-between
    px-3
  `}
              >
                <span>{rowsPerPage}</span>

                <span
                  className={`transition-transform duration-200 ${
                    showRowsDropdown ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>

              {showRowsDropdown && (
                <div
                  className={`
        absolute
        bottom-full
        right-0
        mb-2
        w-[90px]
        ${
          darkMode
            ? "bg-neutral-950 border-neutral-800"
            : "bg-white border-slate-200"
        }
        border
        rounded-xl
        shadow-xl
        overflow-hidden
        z-50
      `}
                >
                  {[5, 10, 15, 20].map((n) => (
                    <button
                      key={n}
                      onClick={() => {
                        setRowsPerPage(n);
                        setCurrentPage(1);
                        setShowRowsDropdown(false);
                      }}
                      className="
            w-full
            px-3
            py-2
            text-left
            hover:bg-indigo-50
            transition
          "
                    >
                      {n}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {selectedDefect && (
          <div
            className={`
    fixed
    top-0
    right-0
    h-screen
    w-full md:w-[400px]
    ${darkMode ? "bg-black text-white" : "bg-white"}
    shadow-2xl
    p-6
    z-50
`}
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
              <p>
                <b>Source:</b> {selectedDefect.source}
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
        {showHistoryModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]">
            <div
              className={`
    ${darkMode ? "bg-black text-white" : "bg-white"}
    w-[700px]
    max-h-[80vh]
    overflow-y-auto
    rounded-3xl
    p-6
  `}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  🕒 Defect History Timeline
                </h2>

                <button
                  onClick={() => setShowHistoryModal(false)}
                  className="text-red-500"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                {historyLogs.length === 0 ? (
                  <p>No history found</p>
                ) : (
                  historyLogs.map((log) => (
                    <div
                      key={log.id}
                      className={`
      border
      rounded-2xl
      p-4
      ${
        darkMode
          ? "bg-neutral-900 border-neutral-800"
          : "bg-slate-50 border-slate-200"
      }
    `}
                    >
                      <p
                        className={`font-semibold ${
                          darkMode ? "text-indigo-400" : "text-indigo-600"
                        }`}
                      >
                        {log.changedBy}
                      </p>

                      <p
                        className={`text-sm ${
                          darkMode ? "text-neutral-400" : "text-slate-500"
                        }`}
                      >
                        {new Date(log.createdAt).toLocaleString()}
                      </p>

                      <div className="mt-2">
                        <span
                          className={`font-medium ${
                            darkMode ? "text-neutral-300" : "text-slate-700"
                          }`}
                        >
                          {log.fieldName}
                        </span>

                        <div className="mt-1">
                          <span
                            className={
                              darkMode ? "text-red-400" : "text-red-500"
                            }
                          >
                            {log.oldValue}
                          </span>

                          {" → "}

                          <span
                            className={
                              darkMode ? "text-green-400" : "text-green-600"
                            }
                          >
                            {log.newValue}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

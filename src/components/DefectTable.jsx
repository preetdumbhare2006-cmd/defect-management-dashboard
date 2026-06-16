import { useState, useEffect } from "react";

import { Pencil, Trash2, Funnel } from "lucide-react";

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
}) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [sortAsc, setSortAsc] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

  const [selectedDefect, setSelectedDefect] = useState(null);

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
  const statusOptions = [...new Set(data.map((item) => item.status))];

  const stageOptions = [...new Set(data.map((item) => item.stage))];

  const severityOptions = [...new Set(data.map((item) => item.severity))];

  const tagOptions = [...new Set(data.map((item) => item.tag))];

  const sourceOptions = [...new Set(data.map((item) => item.source))];
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

  const startRecord = filteredDefects.length === 0 ? 0 : firstIndex + 1;

  const endRecord = Math.min(lastIndex, filteredDefects.length);

  return (
    <div className="px-2 md:px-8 pb-8">
      <div
        className="
    relative
    bg-white
    rounded-[28px]
    border
    border-slate-200
    overflow-visible
    shadow-sm
  "
      >
        <div className="overflow-x-auto">
          <table className="min-w-[1200px] w-full">
            <colgroup>
              <col style={{ width: "70px" }} /> {/* Actions */}
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
            <thead className="sticky top-0 bg-slate-50 z-10">
              <tr className="h-14 bg-slate-50 border-b border-slate-200">
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
                        className="
w-full
h-11
px-4
bg-white
border
border-slate-200
rounded-2xl
text-sm
font-medium
text-slate-700
shadow-sm
hover:border-indigo-300
focus:border-indigo-500
focus:ring-2
focus:ring-indigo-100
outline-none
transition-all
duration-200
placeholder:text-slate-400
truncate
overflow-hidden
text-ellipsis
whitespace-nowrap
"
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
                      className="
w-full
h-11
px-4
bg-white
border
border-slate-200
rounded-2xl
text-sm
font-medium
text-slate-700
shadow-sm
hover:border-indigo-300
focus:border-indigo-500
focus:ring-2
focus:ring-indigo-100
outline-none
transition-all
duration-200
placeholder:text-slate-400
"
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
                      className="
w-full
h-11
px-4
bg-white
border
border-slate-200
rounded-2xl
text-sm
font-medium
text-slate-700
shadow-sm
hover:border-indigo-300
focus:border-indigo-500
focus:ring-2
focus:ring-indigo-100
outline-none
transition-all
duration-200
placeholder:text-slate-400
"
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
                        className="w-full h-11 px-4 bg-white border border-slate-200 rounded-2xl text-sm font-medium text-slate-700 shadow-sm hover:border-indigo-300 flex items-center justify-between"
                      >
                        <span className="flex-1 truncate text-left">
                          {statusInlineFilter || "Status"}
                        </span>

                        <span className="ml-2 text-slate-400 flex-shrink-0">
                          ▼
                        </span>
                      </button>

                      {showStatusDropdownInline && (
                        <div className="absolute z-50 mt-2 w-full bg-white border border-slate-200 rounded-2xl shadow-xl overflow-visible">
                          {statusOptions.map((status) => (
                            <div
                              key={status}
                              onClick={() => {
                                setStatusInlineFilter(status);
                                setShowStatusDropdownInline(false);
                              }}
                              className="flex items-center justify-between px-4 py-3 hover:bg-indigo-50 cursor-pointer"
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
                            className="px-4 py-3 border-t border-slate-100 text-red-500 hover:bg-red-50 cursor-pointer"
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
                        className="
          w-full
          h-11
          px-4
          bg-white
          border
          border-slate-200
          rounded-2xl
          text-sm
          font-medium
          text-slate-700
          shadow-sm
          hover:border-indigo-300
          flex
          items-center
          justify-between
        "
                      >
                        <span className="flex-1 truncate text-left">
                          {stageInlineFilter || "Stage"}
                        </span>

                        <span className="ml-2 text-slate-400 flex-shrink-0">
                          ▼
                        </span>
                      </button>

                      {showStageDropdownInline && (
                        <div className="absolute z-[9999] mt-2 w-full bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
                          {stageOptions.map((stage) => (
                            <div
                              key={stage}
                              onClick={() => {
                                setStageInlineFilter(stage);
                                setShowStageDropdownInline(false);
                              }}
                              className="flex items-center justify-between px-4 py-3 hover:bg-indigo-50 cursor-pointer transition"
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
                            className="px-4 py-3 border-t border-slate-100 text-red-500 hover:bg-red-50 cursor-pointer"
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
                        className="
          w-full
          h-11
          px-4
          bg-white
          border
          border-slate-200
          rounded-2xl
          text-sm
          font-medium
          text-slate-700
          shadow-sm
          hover:border-indigo-300
          flex
          items-center
          justify-between
          overflow-hidden
        "
                      >
                        <span className="flex-1 truncate text-left">
                          {environmentInlineFilter || "Environment"}
                        </span>

                        <span className="ml-2 text-slate-400 flex-shrink-0">
                          ▼
                        </span>
                      </button>

                      {showEnvironmentDropdownInline && (
                        <div
                          className="
            absolute
            z-50
            mt-2
            w-full
            bg-white
            border
            border-slate-200
            rounded-2xl
            shadow-xl
            overflow-hidden
          "
                        >
                          {["QA", "DEV", "BCBSKS PROD"].map((env) => (
                            <div
                              key={env}
                              onClick={() => {
                                setEnvironmentInlineFilter(env);
                                setShowEnvironmentDropdownInline(false);
                              }}
                              className="
                flex
                items-center
                justify-between
                px-4
                py-3
                hover:bg-indigo-50
                cursor-pointer
                transition
              "
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
                            className="
              px-4
              py-3
              border-t
              border-slate-100
              text-red-500
              hover:bg-red-50
              cursor-pointer
            "
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
                        className="w-full h-11 px-4 bg-white border border-slate-200 rounded-2xl text-sm font-medium text-slate-700 shadow-sm hover:border-indigo-300 flex items-center justify-between"
                      >
                        <span className="flex-1 truncate text-left">
                          {severityInlineFilter || "Severity"}
                        </span>

                        <span className="ml-2 text-slate-400 flex-shrink-0">
                          ▼
                        </span>
                      </button>

                      {showSeverityDropdownInline && (
                        <div className="absolute z-[9999] mt-2 w-full bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
                          {severityOptions.map((severity) => (
                            <div
                              key={severity}
                              onClick={() => {
                                setSeverityInlineFilter(severity);
                                setShowSeverityDropdownInline(false);
                              }}
                              className="flex items-center justify-between px-4 py-3 hover:bg-indigo-50 cursor-pointer"
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
                            className="px-4 py-3 border-t border-slate-100 text-red-500 hover:bg-red-50 cursor-pointer"
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
                        className="w-full h-11 px-4 bg-white border border-slate-200 rounded-2xl text-sm font-medium text-slate-700 shadow-sm hover:border-indigo-300 flex items-center justify-between"
                      >
                        <span className="flex-1 truncate text-left">
                          {tagInlineFilter || "Tags"}
                        </span>

                        <span className="ml-2 text-slate-400 flex-shrink-0">
                          ▼
                        </span>
                      </button>

                      {showTagDropdownInline && (
                        <div className="absolute z-[9999] mt-2 w-full bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
                          {tagOptions.map((tag) => (
                            <div
                              key={tag}
                              onClick={() => {
                                setTagInlineFilter(tag);
                                setShowTagDropdownInline(false);
                              }}
                              className="flex items-center justify-between px-4 py-3 hover:bg-indigo-50 cursor-pointer"
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
                            className="
    px-4
    py-2
    border-t
    border-slate-100
    text-red-500
    hover:bg-red-50
    cursor-pointer
    text-sm
    font-medium
    whitespace-nowrap
  "
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
                      className="
w-full
h-11
px-4
bg-white
border
border-slate-200
rounded-2xl
text-sm
font-medium
text-slate-700
shadow-sm
hover:border-indigo-300
focus:border-indigo-500
focus:ring-2
focus:ring-indigo-100
outline-none
transition-all
duration-200
placeholder:text-slate-400
"
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
                      className="
w-full
h-11
px-4
bg-white
border
border-slate-200
rounded-2xl
text-sm
font-medium
text-slate-700
shadow-sm
hover:border-indigo-300
focus:border-indigo-500
focus:ring-2
focus:ring-indigo-100
outline-none
transition-all
duration-200
placeholder:text-slate-400
"
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
                        className="w-full h-11 px-4 bg-white border border-slate-200 rounded-2xl text-sm font-medium text-slate-700 shadow-sm hover:border-indigo-300 flex items-center justify-between"
                      >
                        <span className="flex-1 truncate text-left">
                          {sourceInlineFilter || "Source"}
                        </span>

                        <span className="ml-2 text-slate-400 flex-shrink-0">
                          ▼
                        </span>
                      </button>

                      {showSourceDropdownInline && (
                        <div className="absolute z-[9999] mt-2 min-w-[150px] w-full bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
                          {sourceOptions.map((source) => (
                            <div
                              key={source}
                              onClick={() => {
                                setSourceInlineFilter(source);
                                setShowSourceDropdownInline(false);
                              }}
                              className="flex items-center justify-between px-4 py-3 hover:bg-indigo-50 cursor-pointer"
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
                            className="px-4 py-3 border-t border-slate-100 text-red-500 hover:bg-red-50 cursor-pointer"
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
                    className="

    h-16

    border-b

    border-slate-100

    hover:bg-indigo-50/40

    cursor-pointer

    transition-all

    duration-200

  "
                  >
                    <td>
                      {user?.role === "admin" && (
                        <div
                          className="
        flex
        items-center
        gap-1
        bg-slate-50
        border
        border-slate-100
        p-1
        rounded-xl
        w-fit
      "
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation();

                              console.log("EDIT CLICKED", item);

                              onEdit?.(item);
                            }}
                            className="
          w-8
          h-8
          rounded-lg
          hover:bg-white
          transition
          flex
          items-center
          justify-center
        "
                          >
                            <Pencil size={16} strokeWidth={2} />
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onDelete?.(item.id);
                            }}
                            className="
          w-8
          h-8
          rounded-lg
          text-slate-400
          hover:text-red-600
          hover:bg-red-50
          transition-all
          duration-200
          flex
          items-center
          justify-center
          hover:scale-110
        "
                            title="Delete Defect"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      )}
                    </td>

                    <td className="py-4">{item.id}</td>

                    <td className="font-medium text-slate-800">
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
                          className="
      w-10 h-10
      rounded-full
      bg-gradient-to-r from-indigo-100 to-purple-100
      flex items-center justify-center
      text-xs
    "
                        >
                          {item.assignee
                            .split(" ")
                            .map((word) => word[0])
                            .join("")}
                        </div>

                        <div
                          className="truncate max-w-[180px]"
                          title={item.assignee}
                        >
                          {item.assignee}
                        </div>
                      </div>
                    </td>

                    <td>
                      <span
                        className={
                          item.status === "Assigned"
                            ? "bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-medium"
                            : "bg-red-50 text-red-500 px-3 py-1 rounded-full text-xs font-medium"
                        }
                      >
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
                        className={
                          item.severity === "Crash/Data Loss"
                            ? "bg-red-50 text-red-500 font-medium px-3 py-2 rounded-full text-sm"
                            : "bg-slate-100 text-slate-700 font-medium px-3 py-2 rounded-full text-sm"
                        }
                      >
                        <span
                          className="inline-block max-w-[130px] truncate align-middle"
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
                        className="truncate max-w-[200px]"
                        title={item.defectRelease}
                      >
                        {item.defectRelease}
                      </div>
                    </td>

                    <td>
                      <div className="flex items-center gap-2">
                        <div
                          className="
      w-8 h-8
      rounded-full
      bg-gradient-to-r from-cyan-100 to-blue-100
      flex items-center justify-center
      text-xs font-medium
    "
                        >
                          {item.defectOwner
                            .split(" ")
                            .map((word) => word[0])
                            .join("")
                            .slice(0, 2)}
                        </div>

                        <div
                          className="truncate max-w-[180px]"
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
          className="
  flex
  flex-col
  md:flex-row
  items-center
  justify-between
  gap-4
  p-4
  md:p-6
  border-t
  border-slate-100
"
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
              className="

        w-10 h-10

        rounded-xl

        border border-slate-200

        bg-white

        hover:bg-slate-50

        disabled:opacity-40

        disabled:cursor-not-allowed

      "
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
              className="

        w-10 h-10

        rounded-xl

        border border-slate-200

        bg-white

        hover:bg-slate-50

        disabled:opacity-40

        disabled:cursor-not-allowed

      "
            >
              ›
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
                className="
    w-[80px]
    h-10
    border
    border-slate-200
    rounded-xl
    bg-white
    text-sm
    font-medium
    hover:bg-slate-50
    transition
    flex
    items-center
    justify-between
    px-3
  "
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
                  className="
        absolute
        bottom-full
        right-0
        mb-2
        w-[90px]
        bg-white
        border
        border-slate-200
        rounded-xl
        shadow-xl
        overflow-hidden
        z-50
      "
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
            className="

    fixed

    top-0

    right-0

    h-screen

    w-full md:w-[400px]

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
      </div>
    </div>
  );
}

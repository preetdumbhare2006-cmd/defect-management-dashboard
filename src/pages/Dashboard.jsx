import axios from "axios";
import { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import DashboardHeader from "../components/DashboardHeader";
import FilterBar from "../components/FilterBar";
import ChartCard from "../components/ChartCard";
import DefectSourceChart from "../components/charts/DefectSourceChart";
import SeverityChart from "../components/charts/SeverityChart";
import AgingChart from "../components/charts/AgingChart";
import TagsChart from "../components/charts/TagsChart";
import DefectTable from "../components/DefectTable";
import WorkFlowPulseChart from "../components/charts/WorkFlowPulseChart";
import AttentionRequiredChart from "../components/charts/AttentionRequiredChart";
import EnvironmentChart from "../components/charts/EnvironmentChart";
import AssignedToChart from "../components/charts/AssignedToChart";
import AddedByChart from "../components/charts/AddedByChart";

import { archivedDefects } from "../data/archivedDefectsData";
import { ChevronDown } from "lucide-react";

export default function Dashboard() {
  const [defects, setDefects] = useState([]);
  const [search, setSearch] = useState("");
  const chartRef = useRef(null);
  const [activeTab, setActiveTab] = useState("active");
  const [showAnalytics, setShowAnalytics] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState([]);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [severityFilter, setSeverityFilter] = useState([]);
  const [showSeverityDropdown, setShowSeverityDropdown] = useState(false);
  const [assigneeFilter, setAssigneeFilter] = useState([]);
  const [showAssigneeDropdown, setShowAssigneeDropdown] = useState(false);
  const [stageFilter, setStageFilter] = useState([]);
  const [showStageDropdown, setShowStageDropdown] = useState(false);
  const [environmentFilter, setEnvironmentFilter] = useState([]);
  const [tagFilter, setTagFilter] = useState([]);
  const [showTagDropdown, setShowTagDropdown] = useState(false);

  const [defectOwnerFilter, setDefectOwnerFilter] = useState([]);
  const [showOwnerDropdown, setShowOwnerDropdown] = useState(false);
  const [severityData, setSeverityData] = useState([]);
  const [environmentData, setEnvironmentData] = useState([]);
  const [sourceData, setSourceData] = useState([]);
  const [tagsData, setTagsData] = useState([]);
  const [workflowData, setWorkflowData] = useState([]);
  const [assignedData, setAssignedData] = useState([]);
  const [attentionData, setAttentionData] = useState([]);
  const [agingData, setAgingData] = useState([]);
  const [addedByData, setAddedByData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/defects")
      .then((res) => {
        console.log("API Data:", res.data);
        setDefects(res.data);
      })
      .catch((err) => {
        console.error("API Error:", err);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/charts/severity")
      .then((res) => setSeverityData(res.data))
      .catch(console.error);
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/charts/environment")
      .then((res) => setEnvironmentData(res.data))
      .catch(console.error);
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/charts/source")
      .then((res) => setSourceData(res.data))
      .catch(console.error);
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/charts/tags")
      .then((res) => setTagsData(res.data))
      .catch(console.error);
  }, []);
 
  useEffect(() => {
    axios
  .get("http://localhost:5000/api/charts/workflow-pulse")
  .then((res) => setWorkflowData(res.data))
      .catch(console.error);
  }, []);
  useEffect(() => {
      axios
  .get("http://localhost:5000/api/charts/assigned-to")
  .then((res) => setAssignedData(res.data))
      .catch(console.error);
  }, []);
  useEffect(() => {
    axios
  .get("http://localhost:5000/api/charts/attention-required")
  .then((res) => setAttentionData(res.data))
      .catch(console.error);
  }, []);
   useEffect(() => {
    axios
  .get("http://localhost:5000/api/charts/aging")
  .then((res) => setAgingData(res.data))
       .catch(console.error);
   }, []);
   useEffect(() => {
     axios
       .get("http://localhost:5000/api/charts/added-by")
       .then((res) => setAddedByData(res.data))
       .catch(console.error);
   }, []);

  const [sourceFilter, setSourceFilter] = useState([]);
  const [showSourceDropdown, setShowSourceDropdown] = useState(false);

  const [showEnvironmentDropdown, setShowEnvironmentDropdown] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  useEffect(() => {
    const el = chartRef.current;
    if (!el) return;
    const handleScroll = () => {
      setShowLeftArrow(el.scrollLeft > 10);
      setShowRightArrow(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
    };
    handleScroll();
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [showAnalytics]);

  const filterClass = `
h-12 w-full px-4
bg-white/90
backdrop-blur-sm
border border-slate-200
rounded-2xl
text-sm font-medium text-slate-700
outline-none
hover:border-indigo-300
hover:shadow-md
transition-all duration-300
cursor-pointer
`;
  const statusOptions = [...new Set(defects.map((item) => item.status))];
  const stageOptions = [...new Set(defects.map((item) => item.stage))];
  const environmentOptions = [
    ...new Set(defects.map((item) => item.environment)),
  ];
  const severityOptions = [...new Set(defects.map((item) => item.severity))];
  const assigneeOptions = [...new Set(defects.map((item) => item.assignee))];
  const tagOptions = [...new Set(defects.map((item) => item.tag))];

  const sourceOptions = [...new Set(defects.map((item) => item.source))];
  const defectOwnerOptions = [
    ...new Set(defects.map((item) => item.defectOwner)),
  ];

  return (
    <div className="bg-[#f7f8fc] min-h-screen">
      <Navbar search={search} setSearch={setSearch} />

      <div className="mx-4 mt-3 bg-white rounded-3xl overflow-hidden border border-gray-100">
        <DashboardHeader
          defects={defects}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <FilterBar
          showAnalytics={showAnalytics}
          setShowAnalytics={setShowAnalytics}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          severityFilter={severityFilter}
          setSeverityFilter={setSeverityFilter}
          assigneeFilter={assigneeFilter}
          setAssigneeFilter={setAssigneeFilter}
          stageFilter={stageFilter}
          setStageFilter={setStageFilter}
          environmentFilter={environmentFilter}
          setEnvironmentFilter={setEnvironmentFilter}
          tagFilter={tagFilter}
          setTagFilter={setTagFilter}
        />

        {showFilters && (
          <div className="px-8 py-5 bg-slate-50 rounded-[28px] mx-8 mb-6 border border-slate-200">
            {/* Filter Tags Container */}
            <div className="flex justify-end mb-4">
              <div
                className="
      flex items-center gap-1.5 flex-wrap
      px-3 py-2
      bg-white
      border border-slate-200
      rounded-full
      shadow-sm
    "
              >
                {severityFilter.map((severity) => (
                  <div
                    key={severity}
                    className="
flex items-center gap-1
px-3 py-1
rounded-full
bg-indigo-50
text-indigo-600
text-sm
font-medium
border border-indigo-200
hover:bg-indigo-100
transition-all
duration-200
"
                  >
                    {severity}
                    <button
                      onClick={() =>
                        setSeverityFilter(
                          severityFilter.filter((s) => s !== severity),
                        )
                      }
                      className="font-bold hover:text-red-500"
                    >
                      ×
                    </button>
                  </div>
                ))}
                {statusFilter.map((status) => (
                  <div
                    key={status}
                    className="
flex items-center gap-1
px-3 py-1
rounded-full
bg-indigo-50
text-indigo-600
text-sm
font-medium
border border-indigo-200
hover:bg-indigo-100
transition-all
duration-200
"
                  >
                    {status}
                    <button
                      onClick={() =>
                        setStatusFilter(
                          statusFilter.filter((s) => s !== status),
                        )
                      }
                      className="font-bold hover:text-red-500"
                    >
                      ×
                    </button>
                  </div>
                ))}
                {environmentFilter.map((env) => (
                  <div
                    key={env}
                    className="
flex items-center gap-1
px-3 py-1
rounded-full
bg-indigo-50
text-indigo-600
text-sm
font-medium
border border-indigo-200
hover:bg-indigo-100
transition-all
duration-200
"
                  >
                    {env}
                    <button
                      onClick={() =>
                        setEnvironmentFilter(
                          environmentFilter.filter((e) => e !== env),
                        )
                      }
                      className="font-bold hover:text-red-500"
                    >
                      ×
                    </button>
                  </div>
                ))}
                {stageFilter.map((stage) => (
                  <div
                    key={stage}
                    className="
flex items-center gap-1
px-3 py-1
rounded-full
bg-indigo-50
text-indigo-600
text-sm
font-medium
border border-indigo-200
hover:bg-indigo-100
transition-all
duration-200
"
                  >
                    {stage}
                    <button
                      onClick={() =>
                        setStageFilter(stageFilter.filter((s) => s !== stage))
                      }
                      className="font-bold hover:text-red-500"
                    >
                      ×
                    </button>
                  </div>
                ))}
                {assigneeFilter.map((assignee) => (
                  <div
                    key={assignee}
                    className="
flex items-center gap-1
px-3 py-1
rounded-full
bg-indigo-50
text-indigo-600
text-sm
font-medium
border border-indigo-200
hover:bg-indigo-100
transition-all
duration-200
"
                  >
                    {assignee}
                    <button
                      onClick={() =>
                        setAssigneeFilter(
                          assigneeFilter.filter((a) => a !== assignee),
                        )
                      }
                      className="font-bold hover:text-red-500"
                    >
                      ×
                    </button>
                  </div>
                ))}
                {defectOwnerFilter.map((owner) => (
                  <div
                    key={owner}
                    className="
flex items-center gap-1
px-3 py-1
rounded-full
bg-indigo-50
text-indigo-600
text-sm
font-medium
border border-indigo-200
hover:bg-indigo-100
transition-all
duration-200
"
                  >
                    {owner}
                    <button
                      onClick={() =>
                        setDefectOwnerFilter(
                          defectOwnerFilter.filter((o) => o !== owner),
                        )
                      }
                      className="font-bold hover:text-red-500"
                    >
                      ×
                    </button>
                  </div>
                ))}
                {tagFilter.map((tag) => (
                  <div
                    key={tag}
                    className="
flex items-center gap-1
px-3 py-1
rounded-full
bg-indigo-50
text-indigo-600
text-sm
font-medium
border border-indigo-200
hover:bg-indigo-100
transition-all
duration-200
"
                  >
                    {tag}
                    <button
                      onClick={() =>
                        setTagFilter(tagFilter.filter((t) => t !== tag))
                      }
                      className="font-bold hover:text-red-500"
                    >
                      ×
                    </button>
                  </div>
                ))}
                {sourceFilter.map((source) => (
                  <div
                    key={source}
                    className="
flex items-center gap-1
px-3 py-1
rounded-full
bg-indigo-50
text-indigo-600
text-sm
font-medium
border border-indigo-200
hover:bg-indigo-100
transition-all
duration-200
"
                  >
                    {source}
                    <button
                      onClick={() =>
                        setSourceFilter(
                          sourceFilter.filter((s) => s !== source),
                        )
                      }
                      className="
font-bold
text-indigo-500
hover:text-red-500
transition
"
                    >
                      ×
                    </button>
                  </div>
                ))}
                {(statusFilter.length > 0 ||
                  severityFilter.length > 0 ||
                  environmentFilter.length > 0 ||
                  stageFilter.length > 0 ||
                  assigneeFilter.length > 0 ||
                  tagFilter.length > 0 ||
                  defectOwnerFilter.length > 0 ||
                  sourceFilter.length > 0) && (
                  <button
                    onClick={() => {
                      setStatusFilter([]);
                      setEnvironmentFilter([]);
                      setSeverityFilter([]);
                      setStageFilter([]);
                      setTagFilter([]);
                      setAssigneeFilter([]);
                      setDefectOwnerFilter([]);
                      setSourceFilter([]);
                    }}
                    className="
px-3 py-1
rounded-full
bg-red-50
text-red-600
text-sm
font-medium
border border-red-200
hover:bg-red-100
hover:border-red-300
transition-all
duration-200
ml-2
"
                  >
                    Clear All
                  </button>
                )}
                {statusFilter.length === 0 &&
                  severityFilter.length === 0 &&
                  environmentFilter.length === 0 &&
                  stageFilter.length === 0 &&
                  assigneeFilter.length === 0 &&
                  tagFilter.length === 0 &&
                  defectOwnerFilter.length === 0 &&
                  sourceFilter.length === 0 && (
                    <span className="text-sm text-slate-400">
                      No Filters Applied
                    </span>
                  )}
              </div>
            </div>

            {/* Filter Dropdowns */}
            <div className="grid grid-cols-5 gap-8 mb-8">
              <div>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                    className={`${filterClass}
flex items-center justify-between gap-3 overflow-hidden
hover:-translate-y-[1px]
`}
                  >
                    <span className="flex items-center gap-2 truncate">
                      Status
                      {statusFilter.length > 0 && (
                        <span className="w-7 h-7 rounded-xl bg-blue-600 text-white text-[10px] flex items-center justify-center font-medium">
                          {statusFilter.length}
                        </span>
                      )}
                    </span>
                    <ChevronDown size={16} />
                  </button>

                  {showStatusDropdown && (
                    <div
                      className="
absolute z-50 mt-3 w-full
bg-white/95
backdrop-blur-xl
border border-slate-200
rounded-3xl
shadow-[0_20px_60px_rgba(15,23,42,0.15)]
overflow-hidden
animate-in fade-in zoom-in-95
"
                    >
                      <div className="max-h-64 overflow-y-auto">
                        {statusOptions.map((status) => {
                          const count = defects.filter(
                            (item) => item.status === status,
                          ).length;

                          return (
                            <label
                              key={status}
                              onClick={() => {
                                if (statusFilter.includes(status)) {
                                  setStatusFilter(
                                    statusFilter.filter(
                                      (item) => item !== status,
                                    ),
                                  );
                                } else {
                                  setStatusFilter([...statusFilter, status]);
                                }
                              }}
                              className="flex items-center justify-between px-5 py-4 hover:bg-slate-50 cursor-pointer transition"
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-7 h-7 rounded-xl border flex items-center justify-center text-xs
                ${
                  statusFilter.includes(status)
                    ? "bg-indigo-600 border-indigo-600 text-white shadow-md"
                    : "border-slate-300"
                }`}
                                >
                                  {statusFilter.includes(status) && "✓"}
                                </div>

                                <span>{status}</span>
                              </div>

                              <span className="text-slate-400 text-sm">
                                {count}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() =>
                      setShowEnvironmentDropdown(!showEnvironmentDropdown)
                    }
                    className={`${filterClass}
flex items-center justify-between gap-3 overflow-hidden
hover:-translate-y-[1px]
`}
                  >
                    <span className="flex items-center gap-2 truncate">
                      Environment
                      {environmentFilter.length > 0 && (
                        <span className="w-7 h-7 rounded-xl bg-blue-600 text-white text-xs flex items-center justify-center">
                          {environmentFilter.length}
                        </span>
                      )}
                    </span>

                    <ChevronDown size={16} />
                  </button>

                  {showEnvironmentDropdown && (
                    <div
                      className="
absolute z-50 mt-3 w-full
bg-white/95
backdrop-blur-xl
border border-slate-200
rounded-3xl
shadow-[0_20px_60px_rgba(15,23,42,0.15)]
overflow-hidden
animate-in fade-in zoom-in-95
"
                    >
                      <div className="max-h-64 overflow-y-auto">
                        {environmentOptions.map((env) => {
                          const count = defects.filter(
                            (item) => item.environment === env,
                          ).length;

                          return (
                            <label
                              key={env}
                              onClick={() => {
                                if (environmentFilter.includes(env)) {
                                  setEnvironmentFilter(
                                    environmentFilter.filter(
                                      (item) => item !== env,
                                    ),
                                  );
                                } else {
                                  setEnvironmentFilter([
                                    ...environmentFilter,
                                    env,
                                  ]);
                                }
                              }}
                              className="flex items-center justify-between px-5 py-4 hover:bg-slate-50 cursor-pointer transition"
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-7 h-7 rounded-xl border flex items-center justify-center text-xs
                ${
                  environmentFilter.includes(env)
                    ? "bg-indigo-600 border-indigo-600 text-white shadow-md"
                    : "border-slate-300"
                }`}
                                >
                                  {environmentFilter.includes(env) && "✓"}
                                </div>

                                <span>{env}</span>
                              </div>

                              <span className="text-slate-400 text-sm">
                                {count}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() =>
                      setShowSeverityDropdown(!showSeverityDropdown)
                    }
                    className={`${filterClass}
flex items-center justify-between gap-3 overflow-hidden
hover:-translate-y-[1px]
`}
                  >
                    <span className="flex items-center gap-2 truncate">
                      Severity
                      {severityFilter.length > 0 && (
                        <span className="w-7 h-7 rounded-xl bg-blue-600 text-white text-xs flex items-center justify-center">
                          {severityFilter.length}
                        </span>
                      )}
                    </span>

                    <ChevronDown size={16} />
                  </button>

                  {showSeverityDropdown && (
                    <div
                      className="
absolute z-50 mt-3 w-full
bg-white/95
backdrop-blur-xl
border border-slate-200
rounded-3xl
shadow-[0_20px_60px_rgba(15,23,42,0.15)]
overflow-hidden
animate-in fade-in zoom-in-95
"
                    >
                      <div className="max-h-64 overflow-y-auto">
                        {severityOptions.map((severity) => {
                          const count = defects.filter(
                            (item) => item.severity === severity,
                          ).length;

                          return (
                            <label
                              key={severity}
                              onClick={() => {
                                if (severityFilter.includes(severity)) {
                                  setSeverityFilter(
                                    severityFilter.filter(
                                      (item) => item !== severity,
                                    ),
                                  );
                                } else {
                                  setSeverityFilter([
                                    ...severityFilter,
                                    severity,
                                  ]);
                                }
                              }}
                              className="flex items-center justify-between px-5 py-4 hover:bg-slate-50 cursor-pointer transition"
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-7 h-7 rounded-xl border flex items-center justify-center text-xs
                ${
                  severityFilter.includes(severity)
                    ? "bg-indigo-600 border-indigo-600 text-white shadow-md"
                    : "border-slate-300"
                }`}
                                >
                                  {severityFilter.includes(severity) && "✓"}
                                </div>

                                <span>{severity}</span>
                              </div>

                              <span className="text-slate-400 text-sm">
                                {count}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowStageDropdown(!showStageDropdown)}
                    className={`${filterClass}
flex items-center justify-between gap-3 overflow-hidden
hover:-translate-y-[1px]
`}
                  >
                    <span className="flex items-center gap-2 truncate">
                      Stage
                      {stageFilter.length > 0 && (
                        <span className="w-7 h-7 rounded-xl bg-blue-600 text-white text-xs flex items-center justify-center">
                          {stageFilter.length}
                        </span>
                      )}
                    </span>
                    <ChevronDown size={16} />
                  </button>

                  {showStageDropdown && (
                    <div
                      className="
absolute z-50 mt-3 w-full
bg-white/95
backdrop-blur-xl
border border-slate-200
rounded-3xl
shadow-[0_20px_60px_rgba(15,23,42,0.15)]
overflow-hidden
animate-in fade-in zoom-in-95
"
                    >
                      <div className="max-h-64 overflow-y-auto">
                        {stageOptions.map((stage) => {
                          const count = defects.filter(
                            (item) => item.stage === stage,
                          ).length;

                          return (
                            <label
                              key={stage}
                              onClick={() => {
                                if (stageFilter.includes(stage)) {
                                  setStageFilter(
                                    stageFilter.filter(
                                      (item) => item !== stage,
                                    ),
                                  );
                                } else {
                                  setStageFilter([...stageFilter, stage]);
                                }
                              }}
                              className="flex items-center justify-between px-5 py-4 hover:bg-slate-50 cursor-pointer transition"
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-7 h-7 rounded-xl border flex items-center justify-center text-xs
                ${
                  stageFilter.includes(stage)
                    ? "bg-indigo-600 border-indigo-600 text-white shadow-md"
                    : "border-slate-300"
                }`}
                                >
                                  {stageFilter.includes(stage) && "✓"}
                                </div>

                                <span>{stage}</span>
                              </div>

                              <span className="text-slate-400 text-sm">
                                {count}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowTagDropdown(!showTagDropdown)}
                    className={`${filterClass}
flex items-center justify-between gap-3 overflow-hidden
hover:-translate-y-[1px]
`}
                  >
                    <span className="flex items-center gap-2 truncate">
                      Tags
                      {tagFilter.length > 0 && (
                        <span className="w-7 h-7 rounded-xl bg-blue-600 text-white text-xs flex items-center justify-center">
                          {tagFilter.length}
                        </span>
                      )}
                    </span>
                    <ChevronDown size={16} />
                  </button>

                  {showTagDropdown && (
                    <div
                      className="
absolute z-50 mt-3 w-full
bg-white/95
backdrop-blur-xl
border border-slate-200
rounded-3xl
shadow-[0_20px_60px_rgba(15,23,42,0.15)]
overflow-hidden
animate-in fade-in zoom-in-95
"
                    >
                      <div className="max-h-64 overflow-y-auto">
                        {tagOptions.map((tag) => {
                          const count = defects.filter(
                            (item) => item.tag === tag,
                          ).length;

                          return (
                            <label
                              key={tag}
                              onClick={() => {
                                if (tagFilter.includes(tag)) {
                                  setTagFilter(
                                    tagFilter.filter((item) => item !== tag),
                                  );
                                } else {
                                  setTagFilter([...tagFilter, tag]);
                                }
                              }}
                              className="flex items-center justify-between px-5 py-4 hover:bg-slate-50 cursor-pointer transition"
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-7 h-7 rounded-xl border flex items-center justify-center text-xs
                ${
                  tagFilter.includes(tag)
                    ? "bg-indigo-600 border-indigo-600 text-white shadow-md"
                    : "border-slate-300"
                }`}
                                >
                                  {tagFilter.includes(tag) && "✓"}
                                </div>

                                <span>{tag}</span>
                              </div>

                              <span className="text-slate-400 text-sm">
                                {count}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-4">
              <div>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() =>
                      setShowAssigneeDropdown(!showAssigneeDropdown)
                    }
                    className={`${filterClass}
flex items-center justify-between gap-3 overflow-hidden
hover:-translate-y-[1px]
`}
                  >
                    <span className="flex items-center gap-2 truncate">
                      Assignee
                      {assigneeFilter.length > 0 && (
                        <span className="w-7 h-7 rounded-xl bg-blue-600 text-white text-xs flex items-center justify-center">
                          {assigneeFilter.length}
                        </span>
                      )}
                    </span>
                    <ChevronDown size={16} />
                  </button>

                  {showAssigneeDropdown && (
                    <div
                      className="
absolute z-50 mt-3 w-full
bg-white/95
backdrop-blur-xl
border border-slate-200
rounded-3xl
shadow-[0_20px_60px_rgba(15,23,42,0.15)]
overflow-hidden
animate-in fade-in zoom-in-95
"
                    >
                      <div className="max-h-64 overflow-y-auto">
                        {assigneeOptions.map((assignee) => {
                          const count = defects.filter(
                            (item) => item.assignee === assignee,
                          ).length;

                          return (
                            <label
                              key={assignee}
                              onClick={() => {
                                if (assigneeFilter.includes(assignee)) {
                                  setAssigneeFilter(
                                    assigneeFilter.filter(
                                      (item) => item !== assignee,
                                    ),
                                  );
                                } else {
                                  setAssigneeFilter([
                                    ...assigneeFilter,
                                    assignee,
                                  ]);
                                }
                              }}
                              className="flex items-center justify-between px-5 py-4 hover:bg-slate-50 cursor-pointer transition"
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-7 h-7 rounded-xl border flex items-center justify-center text-xs
                ${
                  assigneeFilter.includes(assignee)
                    ? "bg-indigo-600 border-indigo-600 text-white shadow-md"
                    : "border-slate-300"
                }`}
                                >
                                  {assigneeFilter.includes(assignee) && "✓"}
                                </div>

                                <span>{assignee}</span>
                              </div>

                              <span className="text-slate-400 text-sm">
                                {count}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowOwnerDropdown(!showOwnerDropdown)}
                    className={`${filterClass}
flex items-center justify-between gap-3 overflow-hidden
hover:-translate-y-[1px]
`}
                  >
                    <span className="flex items-center gap-2 truncate">
                      Defect Owner
                      {defectOwnerFilter.length > 0 && (
                        <span className="w-7 h-7 rounded-xl bg-blue-600 text-white text-xs flex items-center justify-center">
                          {defectOwnerFilter.length}
                        </span>
                      )}
                    </span>
                    <ChevronDown size={16} />
                  </button>

                  {showOwnerDropdown && (
                    <div
                      className="
absolute z-50 mt-3 w-full
bg-white/95
backdrop-blur-xl
border border-slate-200
rounded-3xl
shadow-[0_20px_60px_rgba(15,23,42,0.15)]
overflow-hidden
animate-in fade-in zoom-in-95
"
                    >
                      <div className="max-h-64 overflow-y-auto">
                        {defectOwnerOptions.map((owner) => {
                          const count = defects.filter(
                            (item) => item.defectOwner === owner,
                          ).length;

                          return (
                            <label
                              key={owner}
                              onClick={() => {
                                if (defectOwnerFilter.includes(owner)) {
                                  setDefectOwnerFilter(
                                    defectOwnerFilter.filter(
                                      (item) => item !== owner,
                                    ),
                                  );
                                } else {
                                  setDefectOwnerFilter([
                                    ...defectOwnerFilter,
                                    owner,
                                  ]);
                                }
                              }}
                              className="
flex items-center justify-between
px-5 py-4
hover:bg-gradient-to-r
hover:from-indigo-50
hover:to-blue-50
cursor-pointer
transition-all duration-200
"
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-7 h-7 rounded-xl border flex items-center justify-center text-xs
                ${
                  defectOwnerFilter.includes(owner)
                    ? "bg-indigo-600 border-indigo-600 text-white shadow-md"
                    : "border-slate-300"
                }`}
                                >
                                  {defectOwnerFilter.includes(owner) && "✓"}
                                </div>

                                <span>{owner}</span>
                              </div>

                              <span className="text-slate-400 text-sm">
                                {count}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowSourceDropdown(!showSourceDropdown)}
                    className={`${filterClass}
flex items-center justify-between gap-3 overflow-hidden
hover:-translate-y-[1px]
`}
                  >
                    <span className="flex items-center gap-2 truncate">
                      Source
                      {sourceFilter.length > 0 && (
                        <span className="w-7 h-7 rounded-xl bg-blue-600 text-white text-xs flex items-center justify-center">
                          {sourceFilter.length}
                        </span>
                      )}
                    </span>

                    <ChevronDown size={16} />
                  </button>

                  {showSourceDropdown && (
                    <div className="absolute z-50 mt-2 w-full bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
                      <div className="max-h-64 overflow-y-auto">
                        {sourceOptions.map((source) => {
                          const count = defects.filter(
                            (item) => item.source === source,
                          ).length;

                          return (
                            <label
                              key={source}
                              onClick={() => {
                                if (sourceFilter.includes(source)) {
                                  setSourceFilter(
                                    sourceFilter.filter(
                                      (item) => item !== source,
                                    ),
                                  );
                                } else {
                                  setSourceFilter([...sourceFilter, source]);
                                }
                              }}
                              className="
flex items-center justify-between
px-5 py-4
hover:bg-gradient-to-r
hover:from-indigo-50
hover:to-blue-50
cursor-pointer
transition-all duration-200
"
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-7 h-7 rounded-xl border flex items-center justify-center text-xs
                    ${
                      sourceFilter.includes(source)
                        ? "bg-indigo-600 border-indigo-600 text-white shadow-md"
                        : "border-slate-300"
                    }`}
                                >
                                  {sourceFilter.includes(source) && "✓"}
                                </div>

                                <span>{source}</span>
                              </div>

                              <span className="text-slate-400 text-sm">
                                {count}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        {showAnalytics && (
          <div className="relative px-8 pb-8 pt-2">
            {showLeftArrow && (
              <button
                onClick={() =>
                  chartRef.current.scrollBy({ left: -500, behavior: "smooth" })
                }
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-lg border border-slate-200 hover:scale-105 transition"
              >
                ←
              </button>
            )}
            {showRightArrow && (
              <button
                onClick={() =>
                  chartRef.current.scrollBy({ left: 500, behavior: "smooth" })
                }
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-lg border border-slate-200 hover:scale-105 transition"
              >
                →
              </button>
            )}
            <div
              ref={chartRef}
              className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar pb-2"
            >
              <div className="w-[420px] flex-shrink-0">
                <ChartCard title="Severity" footerData={severityData}>
                  <SeverityChart />
                </ChartCard>
              </div>
              <div className="w-[420px] flex-shrink-0">
                <ChartCard title="Aging" footerData={agingData}>
                  <AgingChart />
                </ChartCard>
              </div>
             <div className="w-[420px] flex-shrink-0">
                <ChartCard title="Defect Source" footerData={sourceData}>
                  <DefectSourceChart />
                </ChartCard>
              </div>
              <div className="w-[420px] flex-shrink-0">
                <ChartCard title="Tags" footerData={tagsData}>
                  <TagsChart />
                </ChartCard>
              </div>
             <div className="w-[420px] flex-shrink-0">
                <ChartCard title="Workflow Pulse" footerData={workflowData}>
                  <WorkFlowPulseChart />
                </ChartCard>
              </div>
             <div className="w-[420px] flex-shrink-0">
                <ChartCard
                  title="Attention Required"
                  footerData={attentionData}
                >
                  <AttentionRequiredChart />
                </ChartCard>
              </div>
             <div className="w-[420px] flex-shrink-0">
                <ChartCard title="Environment" footerData={environmentData}>
                  <EnvironmentChart />
                </ChartCard>
              </div>
             <div className="w-[420px] flex-shrink-0">
                <ChartCard title="Assigned To" footerData={assignedData}>
                  <AssignedToChart />
                </ChartCard>
              </div>
             <div className="w-[420px] flex-shrink-0">
                <ChartCard title="Added By" footerData={addedByData}>
                  <AddedByChart />
                </ChartCard>
              </div>
            </div>
          </div>
        )}

        <DefectTable
          key={activeTab}
          data={activeTab === "active" ? defects : archivedDefects}
          search={search}
          statusFilter={statusFilter}
          severityFilter={severityFilter}
          assigneeFilter={assigneeFilter}
          stageFilter={stageFilter}
          environmentFilter={environmentFilter}
          tagFilter={tagFilter}
          setStageFilter={setStageFilter}
          setEnvironmentFilter={setEnvironmentFilter}
          setTagFilter={setTagFilter}
          sourceFilter={sourceFilter}
          defectOwnerFilter={defectOwnerFilter}
          sourceFilter={sourceFilter}
        />
      </div>
    </div>
  );
}

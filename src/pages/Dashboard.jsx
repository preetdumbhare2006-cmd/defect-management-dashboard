import { useState } from "react";
import Navbar from "../components/Navbar";
import DashboardHeader from "../components/DashboardHeader";
import FilterBar from "../components/FilterBar";
import ChartCard from "../components/ChartCard";
import DefectSourceChart from "../components/charts/DefectSourceChart";
import SeverityChart from "../components/charts/SeverityChart";
import AgingChart from "../components/charts/AgingChart";
import TagsChart from "../components/charts/TagsChart";
import DefectTable from "../components/DefectTable";
import Sidebar from "../components/Sidebar";
import StatsCards from "../components/StatsCards";
import WorkFlowPulseChart from "../components/charts/WorkFlowPulseChart";
import AttentionRequiredChart from "../components/charts/AttentionRequiredChart";
import EnvironmentChart from "../components/charts/EnvironmentChart";
import AssignedToChart from "../components/charts/AssignedToChart";
import AddedByChart from "../components/charts/AddedByChart";
import { motion, AnimatePresence } from "framer-motion";
import { saveAs } from "file-saver";
import { defects } from "../data/defectsData";
export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [chartPage, setChartPage] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div
      className={
        darkMode
          ? "bg-slate-900 min-h-screen text-white"
          : "bg-[#f7f8fc] min-h-screen"
      }
    >
      <div>
        <Navbar
          search={search}
          setSearch={setSearch}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <div className="mx-4 mt-3 bg-white rounded-3xl overflow-hidden border border-gray-100">
          <DashboardHeader defects={defects} />

          <FilterBar />

          <div className="flex justify-end items-center gap-3 px-8 pt-4">
            <button
              onClick={() => setChartPage(Math.max(1, chartPage - 1))}
              className="w-10 h-10 rounded-full border bg-white"
            >
              ←
            </button>

            <span className="font-semibold text-gray-600">{chartPage} / 3</span>

            <button
              onClick={() => setChartPage(Math.min(3, chartPage + 1))}
              className="w-10 h-10 rounded-full border bg-white"
            >
              →
            </button>
          </div>
          {chartPage === 1 && (
            <div
              className="grid xl:grid-cols-4
lg:grid-cols-2
grid-cols-1 gap-6 p-8"
            >
              <ChartCard title="Severity">
                <SeverityChart />
              </ChartCard>

              <ChartCard title="Aging Distribution">
                <AgingChart />
              </ChartCard>

              <ChartCard title="Defect Source">
                <DefectSourceChart />
              </ChartCard>

              <ChartCard title="Defect Tags">
                <TagsChart />
              </ChartCard>
            </div>
          )}

          {chartPage === 2 && (
            <div className="grid xl:grid-cols-4 lg:grid-cols-2 grid-cols-1 gap-6 p-8">
              <ChartCard title="Work Flow Pulse (Stage)">
                <WorkFlowPulseChart />
              </ChartCard>

              <ChartCard title="Attention Required">
                <AttentionRequiredChart />
              </ChartCard>

              <ChartCard title="Environment">
                <EnvironmentChart />
              </ChartCard>

              <ChartCard title="Severity">
                <SeverityChart />
              </ChartCard>
            </div>
          )}
          {chartPage === 3 && (
            <div className="grid xl:grid-cols-4 lg:grid-cols-2 grid-cols-1 gap-6 p-8">
              <ChartCard title="Defect Source">
                <DefectSourceChart />
              </ChartCard>

              <ChartCard title="Defect Tags">
                <TagsChart />
              </ChartCard>

              <ChartCard title="Assigned To">
                <AssignedToChart />
              </ChartCard>

              <ChartCard title="Added By">
                <AddedByChart />
              </ChartCard>
            </div>
          )}

          <DefectTable search={search} />
        </div>
      </div>
    </div>
  );
}

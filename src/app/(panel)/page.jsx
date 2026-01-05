"use client";

import { useState } from "react";
import {
  AreaChart,
  BarChart,
  Card,
  Dropdown,
  FilterItem,
  ModalNotification,
  MultiLineChart,
  Option,
  PieChart,
  Select,
} from "@/components";
import { IconDanger, IconEye, IconFilters, IconWarning } from "@/Icons";

export default function Home() {
  const [openModalWarning, setOpenModalWarning] = useState(false);
  const [openModalError, setOpenModalError] = useState(false);
  const [selected, setSelected] = useState("365");
  const [selectedAreaHealthyDuration, setSelectedAreaHealthyDuration] = useState("365");
  const [selectedBar, setSelectedBar] = useState("365");

  const areaHealthyDurationChartData = {
    7: {
      name: "Last 7 Days",
      color: "#3673E8",
      xLabels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      data: [300, 340, 375, 290, 265, 360, 380],
    },
    30: {
      name: "Last Month",
      color: "#3673E8",
      xLabels: Array.from({ length: 30 }, (_, i) => `Sep ${i + 1}`),
      data: [
        300, 340, 375, 290, 265, 360, 380, 470, 560, 680, 695, 670, 725, 550,
        180, 175, 135, 165, 145, 185, 100, 150, 195, 170, 85, 90, 125, 250, 380,
        420,
      ],
    },
    365: {
      name: "Last Year",
      color: "#3673E8",
      xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      data: [90, 175, 135, 65, 145, 185, 100, 150, 195, 170, 85, 90, 125],
    },
  };

  const barChartData = {
    7: {
      name: "Last 7 Days",
      color: "#4064ff",
      xLabels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      data: [300, 340, 375, 290, 265, 360, 380],
    },
    30: {
      name: "Last Month",
      color: "#4064ff",
      xLabels: Array.from({ length: 30 }, (_, i) => `Sep ${i + 1}`),
      data: [
        300, 340, 375, 290, 265, 360, 380, 470, 560, 680, 695, 670, 725, 550,
        180, 175, 135, 165, 145, 185, 100, 150, 195, 170, 85, 90, 125, 250, 380,
        420,
      ],
    },
    365: {
      name: "Last Year",
      color: "#4064ff",
      xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      data: [180, 175, 135, 65, 145, 185, 100, 150, 195, 170, 85, 90, 125],
    },
  };

  const EquipmentsHealthChartData = [
    { value: 80, name: "Normal", color: "#007BFF" },
    { value: 30, name: "Abnormal", color: "#FFC107" },
  ];

  const AlertTrendChartData = [
    {
      name: "7 Days",
      xLabels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      lines: [
        { name: "Normal", color: "#007BFF", data: [300, 340, 375, 290, 265, 360, 380] },
        { name: "Abnormal", color: "#FFC107", data: [280, 320, 350, 270, 250, 340, 360] },
      ],
    },
    {
      name: "Last Month",
      xLabels: ["Sep 1", "Sep 2", "Sep 3", "Sep 4", "Sep 5", "Sep 6", "Sep 7"],
      lines: [
        { name: "Normal", color: "#007BFF", data: [300, 340, 375, 290, 265, 360, 380] },
        { name: "Abnormal", color: "#FFC107", data: [280, 330, 365, 285, 260, 355, 370] },
      ],
    },
    {
      name: "Last Year",
      xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      lines: [
        { name: "Normal", color: "#007BFF", data: [180, 175, 135, 65, 145, 185, 100] },
        { name: "Abnormal", color: "#FFC107", data: [160, 165, 125, 55, 130, 170, 90] },
      ],
    },
  ];

  const getSelectedData = () => {
    if (selected === "7") return AlertTrendChartData[0];
    if (selected === "30") return AlertTrendChartData[1];
    return AlertTrendChartData[2];
  };

  return (
    <>
      <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-8">
        <Card>
          <div className="flex flex-col gap-6 mb-8">
            <h1 className="text-2xl md:text-3xl font-medium text-zinc-800">Dashboard</h1>
            <p className="text-base text-zinc-800 leading-relaxed">
              Overview of equipment status, recent alerts, and key system metrics
            </p>
          </div>

          {/* Stats Grid - Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="h-48 px-6 py-8 bg-emerald-50 rounded-xl border border-zinc-100 flex flex-col justify-center items-center gap-4">
              <div className="text-center text-zinc-700/80 text-lg md:text-xl font-medium">
                Normal Equipments
              </div>
              <div className="text-3xl md:text-4xl font-medium text-zinc-800">84</div>
            </div>

            <div className="h-48 px-6 py-8 bg-[#FCEBED] rounded-xl border border-zinc-100 flex flex-col justify-center items-center gap-4">
              <div className="text-center text-zinc-700/80 text-lg md:text-xl font-medium">
                Abnormal Equipments
              </div>
              <div className="text-3xl md:text-4xl font-medium text-zinc-800">31</div>
            </div>

            <div className="h-48 px-6 py-8 bg-sky-100 rounded-xl border border-zinc-100 flex flex-col justify-center items-center gap-4">
              <div className="text-center text-zinc-700/80 text-lg md:text-xl font-medium">
                Working Equipments
              </div>
              <div className="text-3xl md:text-4xl font-medium text-zinc-800">84</div>
            </div>

            <div className="h-48 px-6 py-8 bg-yellow-50 rounded-xl border border-zinc-100 flex flex-col justify-center items-center gap-4">
              <div className="text-center text-zinc-700/80 text-lg md:text-xl font-medium">
                Total Equipments
              </div>
              <div className="text-3xl md:text-4xl font-medium text-zinc-800">120</div>
            </div>
          </div>
        </Card>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Pie Chart Card */}
          <div className="lg:col-span-4">
            <Card className="h-full flex flex-col gap-8 p-6">
              <h2 className="text-xl font-medium text-zinc-700">Equipments Health</h2>
              <div className="flex-1 flex items-center justify-center">
                <PieChart data={EquipmentsHealthChartData} />
              </div>
              <div className="flex justify-center gap-8 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-blue-600 rounded-full" />
                  <div>
                    <div className="text-slate-700 text-lg font-medium">Normal</div>
                    <div className="text-zinc-800 text-lg">73%</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-warning rounded-full" />
                  <div>
                    <div className="text-slate-700 text-lg font-medium">Abnormal</div>
                    <div className="text-zinc-800 text-lg">27%</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* MultiLine Chart Card */}
          <div className="lg:col-span-8">
            <Card className="h-full flex flex-col gap-6 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-xl font-medium text-zinc-800 flex flex-wrap items-center gap-2">
                  Alert Trend -
                  <Select value={selected} onChange={setSelected}>
                    <Option value="365">Last year</Option>
                    <Option value="30">Last month</Option>
                    <Option value="7">Last 7 Days</Option>
                  </Select>
                </h2>

                <Dropdown
                  direction="right"
                  buttonText={
                    <>
                      <IconFilters /> Filters
                    </>
                  }
                  buttonClassName="btn btn-default h-12"
                >
                  <FilterItem>FilterItem</FilterItem>
                  <FilterItem>FilterItem</FilterItem>
                </Dropdown>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="text-slate-700 text-lg font-medium">Units</div>
                <div className="flex flex-wrap justify-center sm:justify-end gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-600 rounded-full" />
                    <span className="text-slate-700 text-lg font-medium">Normal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-warning rounded-full" />
                    <span className="text-slate-700 text-lg font-medium">Abnormal</span>
                  </div>
                </div>
              </div>

              <div className="flex-1 min-h-72">
                <MultiLineChart Data={getSelectedData()} />
              </div>
            </Card>
          </div>
        </div>

        {/* Bottom Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <div className="p-6 flex flex-col gap-6">
              <h2 className="text-xl font-medium text-zinc-800 flex flex-wrap items-center gap-2">
                Healthy Operation Duration -
                <Select value={selectedAreaHealthyDuration} onChange={setSelectedAreaHealthyDuration}>
                  <Option value="365">Last year</Option>
                  <Option value="30">Last month</Option>
                  <Option value="7">Last 7 Days</Option>
                </Select>
              </h2>
              <div className="min-h-72">
                <AreaChart Data={areaHealthyDurationChartData[selectedAreaHealthyDuration]} />
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6 flex flex-col gap-6">
              <h2 className="text-xl font-medium text-zinc-800 flex flex-wrap items-center gap-2">
                Device Repair Duration -
                <Select value={selectedBar} onChange={setSelectedBar}>
                  <Option value="365">Last year</Option>
                  <Option value="30">Last month</Option>
                  <Option value="7">Last 7 Days</Option>
                </Select>
              </h2>
              <div className="min-h-72">
                <BarChart Data={barChartData[selectedBar]} />
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Alerts */}
      <Card>
  <div className="p-4 sm:p-6">
    <h2 className="text-lg sm:text-xl font-medium text-zinc-700 mb-4 sm:mb-6">
      Recent Alerts
    </h2>
    <hr className="border-zinc-100 mb-4 sm:mb-6" />

    {/* Desktop table */}
    <div className="hidden md:block">
      <table className="w-full">
        <tbody>
          <tr className="border-b border-zinc-100">
            <td className="py-4">
              <div className="flex items-center gap-3">
                <IconDanger size={20} />
                <span className="text-base">
                  Belt Tear in Reduction Unit – Critical
                </span>
              </div>
            </td>
            <td className="py-4 text-right">
              <button
                className="btn btn-primary h-10 px-4"
                onClick={() => setOpenModalError(true)}
              >
                <IconEye size={18} />
                View
              </button>
            </td>
          </tr>

          <tr>
            <td className="py-4">
              <div className="flex items-center gap-3">
                <IconWarning size={20} />
                <span className="text-base">
                  Misalignment Detected – Warning
                </span>
              </div>
            </td>
            <td className="py-4 text-right">
              <button
                className="btn btn-primary h-10 px-4"
                onClick={() => setOpenModalWarning(true)}
              >
                <IconEye size={18} />
                View
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    {/* Mobile cards */}
    <div className="md:hidden space-y-4">
      <div className="border rounded-xl p-4">
        <div className="flex items-center gap-3 mb-3">
          <IconDanger size={20} />
          <span className="text-base font-medium">
            Belt Tear in Reduction Unit – Critical
          </span>
        </div>
        <button
          className="btn btn-primary w-full h-10"
          onClick={() => setOpenModalError(true)}
        >
          <IconEye size={18} />
          View
        </button>
      </div>

      <div className="border rounded-xl p-4">
        <div className="flex items-center gap-3 mb-3">
          <IconWarning size={20} />
          <span className="text-base font-medium">
            Misalignment Detected – Warning
          </span>
        </div>
        <button
          className="btn btn-primary w-full h-10"
          onClick={() => setOpenModalWarning(true)}
        >
          <IconEye size={18} />
          View
        </button>
      </div>
    </div>
  </div>
</Card>

      </div>

      {/* Modals */}
      <ModalNotification
        type="error"
        title="Belt Tear Detected"
        text="A belt tear was detected in the Reduction Unit at 09:32."
        cancelText="Cancel"
        confirmText="Inspect Tear Location"
        open={openModalError}
        onClose={() => setOpenModalError(false)}
      />

      <ModalNotification
        type="warning"
        title="Misalignment Detected"
        text="Slight belt misalignment detected in the main drive unit."
        cancelText="Cancel"
        confirmText="Inspect Location"
        open={openModalWarning}
        onClose={() => setOpenModalWarning(false)}
      />
    </>
  );
}
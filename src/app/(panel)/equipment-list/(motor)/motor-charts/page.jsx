"use client";



import { AreaChart, BarChart, Card, Option, Select } from "@/components";
import DataGrid from "@/components/common/DataGrid/DataGrid";
import { IconHistory, IconLive, IconSearch } from "@/Icons";
import Link from "next/link";
import { useState } from "react";

export default function EquipmentList() {
  const [selectedArea, setSelectedArea] = useState("365");
  const [selectedBar, setSelectedBar] = useState("365");
  const [selectedAreaHealthyDuration, setSelectedAreaHealthyDuration] =
    useState("365");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // items per page

  const areaHealthyDurationChartData = {
    "7": {
      name: "Last 7 Days",
      color: "#3673E8",
      xLabels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      data: [300, 340, 375, 290, 265, 360, 380],
    },
    "30": {
      name: "Last Month",
      color: "#3673E8",
      xLabels: Array.from({ length: 30 }, (_, i) => `Sep ${i + 1}`),
      data: Array(30).fill(0).map((_, i) => 300 + i * 5),
    },
    "365": {
      name: "Last Year",
      color: "#3673E8",
      xLabels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
      data: [90, 175, 135, 65, 145, 185, 100, 150, 195, 170, 85, 90],
    },
  };

  const areaChartData = { ...areaHealthyDurationChartData };
  const barChartData = {
    "7": {
      name: "Last 7 Days",
      color: "#4064ff",
      xLabels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      data: [300, 340, 375, 290, 265, 360, 380],
    },
    "30": {
      name: "Last Month",
      color: "#4064ff",
      xLabels: Array.from({ length: 30 }, (_, i) => `Sep ${i + 1}`),
      data: Array(30).fill(0).map((_, i) => 300 + i * 5),
    },
    "365": {
      name: "Last Year",
      color: "#4064ff",
      xLabels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
      data: [180, 175, 135, 65, 145, 185, 100, 150, 195, 170, 85, 90],
    },
  };

  const alertHistory = [
    { id: 1, date: "2025-12-28 14:30", vibration: 2.45, description: "Overheat detected", link: "/motor-view-details" },
    { id: 2, date: "2025-12-28 15:10", vibration: 3.12, description: "Vibration anomaly", link: "/motor-view-details" },
    { id: 3, date: "2025-12-28 16:00", vibration: 2.78, description: "Temperature spike", link: "/motor-view-details" },
    { id: 4, date: "2025-12-29 10:00", vibration: 2.50, description: "Bearing vibration", link: "/motor-view-details" },
    { id: 5, date: "2025-12-29 11:00", vibration: 2.60, description: "Overheat warning", link: "/motor-view-details" },
    { id: 6, date: "2025-12-29 12:00", vibration: 3.00, description: "Unexpected vibration", link: "/motor-view-details" },
  ];

  const filteredData = alertHistory.filter(
    (item) =>
      item.date.includes(searchQuery) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const alertColumns = [
    {
      key: "date",
      header: "Date / Time",
      render: (item) => <Link href={item.link} className="hover:underline">{item.date}</Link>,
    },
    {
      key: "vibration",
      header: "Vibration",
      render: (item) => <Link href={item.link} className="hover:underline">{item.vibration} mm/s</Link>,
    },
    {
      key: "description",
      header: "Description",
      render: (item) => <Link href={item.link} className="hover:underline">{item.description}</Link>,
    },
  ];

  return (
    <div className="flex flex-col gap-6 py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Live / History Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href="motor-status" className="btn btn-gray text-xl px-8 min-w-40 flex items-center justify-center gap-3">
          <IconLive /> Live
        </Link>
        <Link href="motor-charts" className="btn btn-primary text-xl px-8 min-w-40 flex items-center justify-center gap-3">
          <IconHistory /> History
        </Link>
      </div>

      {/* Charts */}
      <Card className="flex flex-col gap-6">
        <div className="text-zinc-800 text-3xl font-medium">
          Page Motor Bardsir Steel Reduction 3001
        </div>
        <div className="h-px relative bg-gray-200 my-6"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <div className="flex flex-col gap-4">
              <div className="text-zinc-800 text-xl font-medium flex gap-2">
                Motor Failure Count and Types -
                <Select value={selectedArea} onChange={setSelectedArea}>
                  <Option value="365">Last year</Option>
                  <Option value="30">Last month</Option>
                  <Option value="7">Last 7 Days</Option>
                </Select>
              </div>
              <div className="text-slate-700/70 text-sm font-normal">
                Logged and categorized motor failures over the selected time period
              </div>
            </div>
            <div className="relative min-h-72 mt-6 p-3 rounded-lg overflow-hidden">
              <AreaChart Data={areaChartData[selectedArea] || areaChartData["365"]} />
            </div>
          </Card>

          <Card>
            <div className="flex flex-col gap-4">
              <div className="text-zinc-800 text-xl font-medium flex gap-2">
                Recent Conveyor Belt DAS Fault -
                <Select value={selectedBar} onChange={setSelectedBar}>
                  <Option value="365">Last year</Option>
                  <Option value="30">Last month</Option>
                  <Option value="7">Last 7 Days</Option>
                </Select>
              </div>
              <div className="text-slate-700/70 text-sm font-normal">
                Displays total motor uptime during the selected time period
              </div>
            </div>
            <div className="relative min-h-72 mt-6 p-3 rounded-lg overflow-hidden">
              <BarChart Data={barChartData[selectedBar] || barChartData["365"]} />
            </div>
          </Card>
        </div>

        <Card>
          <div className="flex flex-col gap-4">
            <div className="text-zinc-800 text-xl font-medium flex gap-2">
              Healthy Operation Duration -
              <Select value={selectedAreaHealthyDuration} onChange={setSelectedAreaHealthyDuration}>
                <Option value="365">Last year</Option>
                <Option value="30">Last month</Option>
                <Option value="7">Last 7 Days</Option>
              </Select>
            </div>
          </div>
          <div className="relative min-h-72 mt-6 p-3 rounded-lg overflow-hidden">
            <AreaChart Data={areaHealthyDurationChartData[selectedAreaHealthyDuration] || areaHealthyDurationChartData["365"]} />
          </div>
        </Card>
      </Card>

      {/* Alert History */}
      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div className="text-zinc-800 text-xl font-medium">Alert History</div>
          <div className="relative w-full sm:w-80">
            <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-3 h-12 rounded-xl border border-zinc-300 text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            />
          </div>
        </div>

        <DataGrid
          title=""
          data={paginatedData}
          columns={alertColumns}
          primaryColumns={1}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </Card>
    </div>
  );
}

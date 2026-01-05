"use client";

import { Card } from "@/components";
import DataGrid from "@/components/common/DataGrid/DataGrid";
import { AreaChart } from "@/components/common/Charts/AreaChart";
import { IconBarChart, IconCalendar, IconHistory, IconLive } from "@/Icons";
import Link from "next/link";
import { useState } from "react";

export default function EquipmentList() {
  const [selectedFaultInterval, setSelectedFaultInterval] = useState("365");
  const [selectedHealthyDuration, setSelectedHealthyDuration] = useState("365");

  // Fault Interval Chart Data
  const faultIntervalChartData = {
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

  // Healthy Duration Chart Data
  const healthyDurationChartData = {
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

  // Sample error data for DataGrid
  const errorsData = [
    {
      id: 1,
      timestamp: "2025/05/09 - 09:32",
      size: "Belt Tear",
      detectionPoint: "Discharge Zone",
      description: "Belt tear detected at conveyor discharge",
      link: "/conveyor-view-details",
    },
    {
      id: 2,
      timestamp: "2025/05/10 - 10:12",
      size: "Misalignment",
      detectionPoint: "Reduction Unit",
      description: "Conveyor slightly off-center",
      link: "/conveyor-view-details",
    },
    {
      id: 3,
      timestamp: "2025/05/11 - 14:45",
      size: "Vibration Anomaly",
      detectionPoint: "Drive Motor",
      description: "High vibration detected in motor bearing",
      link: "/conveyor-view-details",
    },
  ];

  const errorColumns = [
    { key: "timestamp", header: "Timestamp" },
    { key: "size", header: "Size of the failure" },
    { key: "detectionPoint", header: "Detection Point" },
    { key: "description", header: "Description" },
  ];

  return (
    <div className="flex flex-col gap-8 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Live / History Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="conveyor-live"
          className="btn btn-gray text-lg md:text-xl px-8 py-4 min-h-14 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-shadow rounded-xl"
        >
          <IconLive size={28} />
          Live
        </Link>

        <Link
          href="conveyor-history"
          className="btn btn-primary text-lg md:text-xl px-8 py-4 min-h-14 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-shadow rounded-xl"
        >
          <IconHistory size={28} />
          History
        </Link>
      </div>

      {/* Recent Conveyor Belt DAS Fault Chart */}
      <Card className="overflow-hidden shadow-xl rounded-3xl">
        <div className="p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-xl md:text-2xl font-semibold text-zinc-800">
                Recent Conveyor Belt DAS Fault
              </h3>
              <select
                value={selectedFaultInterval}
                onChange={(e) => setSelectedFaultInterval(e.target.value)}
                className="px-4 py-2 rounded-lg border border-zinc-300 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="365">Last year</option>
                <option value="30">Last month</option>
                <option value="7">Last 7 Days</option>
              </select>
            </div>

            <div className="flex flex-col gap-3 text-sm">
              <div className="flex items-center gap-2">
                <IconBarChart size={18} />
                <span className="text-slate-700">Average DAS Fault interval:</span>
                <span className="text-blue-600 font-semibold">every 7 days</span>
              </div>
              <div className="flex items-center gap-2">
                <IconCalendar size={18} />
                <span className="text-slate-700">Last DAS Fault:</span>
                <span className="text-blue-600 font-semibold">2025-04-25</span>
              </div>
            </div>
          </div>

          <div className="relative min-h-80 mt-6 rounded-2xl overflow-hidden bg-zinc-50/50">
            <AreaChart Data={faultIntervalChartData[selectedFaultInterval]} />
          </div>
        </div>
      </Card>

      {/* Healthy Operation Duration Chart */}
      <Card className="overflow-hidden shadow-xl rounded-3xl">
        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <h3 className="text-xl md:text-2xl font-semibold text-zinc-800">
              Healthy Operation Duration
            </h3>
            <select
              value={selectedHealthyDuration}
              onChange={(e) => setSelectedHealthyDuration(e.target.value)}
              className="px-4 py-2 rounded-lg border border-zinc-300 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="365">Last year</option>
              <option value="30">Last month</option>
              <option value="7">Last 7 Days</option>
            </select>
          </div>

          <div className="relative min-h-80 mt-6 rounded-2xl overflow-hidden bg-zinc-50/50">
            <AreaChart Data={healthyDurationChartData[selectedHealthyDuration]} />
          </div>
        </div>
      </Card>

      {/* Current Error List using DataGrid */}
      <DataGrid
        title="Current Error List"
        data={errorsData}
        columns={errorColumns}
        primaryColumns={3}
        searchPlaceholder="Search errors..."
        currentPage={1}
        totalPages={5}
        onPageChange={(page) => console.log("Page:", page)}
      />
    </div>
  );
}
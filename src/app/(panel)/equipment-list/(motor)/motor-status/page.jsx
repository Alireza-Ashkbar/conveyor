"use client";

import { Card } from "@/components";
import DataGrid from "@/components/common/DataGrid/DataGrid";
import { IconCheckSquareSuccesss, IconDanger, IconHistory, IconLive, IconSearch } from "@/Icons";
import Image from "next/image";
import Link from "next/link";

export default function MotoStatus() {
  const motorPoints = [
    { id: 1, name: "Point 1", vibration: 2.45, temp: 180, status: "Abnormal", color: "bg-cyan-400" },
    { id: 2, name: "Point 2", vibration: 2.45, temp: 180, status: "Abnormal", color: "bg-blue-600" },
    { id: 3, name: "Point 3", vibration: 2.45, temp: 180, status: "Normal", color: "bg-yellow-400" },
    { id: 4, name: "Point 4", vibration: 2.45, temp: 180, status: "Abnormal", color: "bg-red-500" },
    { id: 5, name: "Point 5", vibration: 2.45, temp: 180, status: "Abnormal", color: "bg-green-600" },
    { id: 6, name: "Point 6", vibration: 2.45, temp: 180, status: "Abnormal", color: "bg-amber-600" },
    { id: 7, name: "Point 7", vibration: 2.45, temp: 180, status: "Abnormal", color: "bg-indigo-600" },
    { id: 8, name: "Point 8", vibration: 2.45, temp: 180, status: "Abnormal", color: "bg-pink-600" },
  ];

  const alertHistory = [
    { id: 1, date: "2025-12-28 14:30", vibration: 2.45, description: "Overheat detected" },
    { id: 2, date: "2025-12-28 15:10", vibration: 3.12, description: "Vibration anomaly" },
    { id: 3, date: "2025-12-28 16:00", vibration: 2.78, description: "Temperature spike" },
  ];

  const alertColumns = [
    {
      key: "date",
      header: "Date / Time",
      render: (item) => (
        <Link href="/motor-view-details" className="hover:underline">
          {item.date}
        </Link>
      ),
    },
    {
      key: "vibration",
      header: "Vibration",
      render: (item) => (
        <Link href="/motor-view-details" className="hover:underline">
          {item.vibration} mm/s
        </Link>
      ),
    },
    {
      key: "description",
      header: "Description",
      render: (item) => (
        <Link href="/motor-view-details" className="hover:underline">
          {item.description}
        </Link>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6 py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Live / History Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href="motor-status" className="btn btn-primary text-lg md:text-xl px-8 py-4 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-shadow">
          <IconLive size={28} />
          Live
        </Link>
        <Link href="motor-charts" className="btn btn-gray text-lg md:text-xl px-8 py-4 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-shadow">
          <IconHistory size={28} />
          History
        </Link>
      </div>

      {/* Motor Info */}
      <Card className="overflow-hidden shadow-xl rounded-2xl">
        <div className="p-6 sm:p-8">
          <div className="text-zinc-800 text-xl font-medium mb-4">Page Motor Bardsir Steel Reduction 3001</div>

          {/* Status */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="text-zinc-800 text-xl font-medium">Motor Status</div>
            <div className="flex items-center gap-4">
              <span className="text-zinc-800 text-lg font-medium">Current status:</span>
              <div className="status status-error text-sm font-medium flex items-center gap-2">
                <IconDanger size={20} />
                Abnormal
              </div>
            </div>
          </div>

          {/* Motor Image */}
          <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden mb-6">
            <Image src="/images/motor.png" alt="motor" fill className="object-contain object-center rounded-lg" />
          </div>

          {/* Motor Points Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {motorPoints.map((point) => (
              <Link
                key={point.id}
                href="/motor-view-details"
                className="p-4 bg-neutral-100 rounded-lg border border-zinc-100 flex flex-col items-center gap-3 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full ${point.color}`} />
                  <span className="text-slate-700 font-medium">{point.name}</span>
                </div>
                <div className="text-sm text-zinc-800/70">
                  Vibration: <span className="font-medium text-zinc-800">{point.vibration} mm/s</span>
                </div>
                <div className="text-sm text-zinc-800/70">
                  Temperature: <span className="font-medium text-zinc-800">{point.temp}°C</span>
                </div>
                <div className={`status text-sm font-medium flex items-center gap-2 ${point.status === "Normal" ? "status-successs" : "status-error"}`}>
                  {point.status === "Normal" ? <IconCheckSquareSuccesss size={18} /> : <IconDanger size={18} />}
                  {point.status}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Card>

      {/* Alert History DataGrid */}
      <Card className="overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="text-zinc-800 text-xl font-medium">Alert History</div>
            <div className="relative w-full sm:w-80">
              <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-3 h-12 rounded-xl border border-zinc-300 text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>
          </div>

          <DataGrid
            title=""
            data={alertHistory}
            columns={alertColumns}
            primaryColumns={1} // Mobile: only date
            searchPlaceholder="Search alerts..."
            currentPage={1}
            totalPages={1}
          />
        </div>
      </Card>
    </div>
  );
}

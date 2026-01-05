"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components";
import { ConveyorBeltContainer } from "@/components/ThreeScene/ConveyorBeltContainer";
import DataGrid from "@/components/common/DataGrid/DataGrid";
import { IconDanger, IconHistory, IconLive } from "@/Icons";
import Link from "next/link";

const MemoizedConveyor = ({ faults }) => {
  return <ConveyorBeltContainer faults={faults} />;
};

export default function EquipmentList() {
  const initialFaults = [
    {
      id: "1",
      name: "Danger Zone 1",
      distensToStartPoint: 300,
      timeStamp: "2025-12-28 14:30:00",
      size: 20,
      img: "/images/danger1.jpg",
      description: "Fault Detected! 🚨",
      severity: "High",
      link: "conveyor-view-details",
    },
    {
      id: "2",
      name: "Misalignment Alert",
      distensToStartPoint: 60,
      timeStamp: "2025-12-28 15:10:22",
      size: 100,
      img: "/images/danger2.jpg",
      description: "Fault Detected! 🚨",
      severity: "Medium",
      link: "conveyor-view-details",
    },
    {
      id: "3",
      name: "Vibration Anomaly",
      distensToStartPoint: 350,
      timeStamp: "2025-12-28 13:45:10",
      size: 30,
      img: "/images/danger3.jpg",
      description: "Fault Detected! 🚨",
      severity: "Critical",
      link: "conveyor-view-details",
    },
    // ... keep all your other initial faults here (even if >250m)
  ];

  const [faults, setFaults] = useState(initialFaults);

  const faultNames = [
    "Belt Slippage",
    "Electrical Fault",
    "Structural Crack",
    "Lubrication Low",
    "Overload Detected",
    "Bearing Failure Risk",
    "Vibration Anomaly",
    "High Temperature",
    "Motor Overload",
    "Chain Wear",
    "Roller Jam",
    "Misalignment Alert",
    "Sensor Malfunction",
    "Danger Zone",
    "Dust Accumulation",
    "Tension Loss",
    "Gearbox Overheat",
    "Pulley Misalignment",
    "Foreign Object Detected",
    "V-Belt Wear",
  ];

  const descriptions = [
    "Motor drawing excessive current",
    "Noise level elevated",
    "Conveyor belt slightly off-center",
    "Unusual vibration in roller assembly",
    "Bearing overheating",
    "Excessive wear on drive chain",
    "Potential structural fatigue",
    "Electrical spike detected",
    "Sensor reading inconsistent",
    "Belt tracking issue",
    "Load exceeding capacity",
    "Speed not matching setpoint",
    "Roller not rotating freely",
    "Low lubricant levels",
    "Dust on sensors",
    "Belt tension low",
  ];

  const severities = ["Low", "Medium", "High", "Critical"];
  const severityWeights = [0.35, 0.35, 0.2, 0.1];

  const images = Array.from(
    { length: 10 },
    (_, i) => `/images/danger${i + 1}.jpg`
  );

  const weightedRandom = (items, weights) => {
    const total = weights.reduce((a, b) => a + b, 0);
    let r = Math.random() * total;
    for (let i = 0; i < items.length; i++) {
      r -= weights[i];
      if (r <= 0) return items[i];
    }
    return items[items.length - 1];
  };

  // Generate fault with distance limited to 1–250 meters
  const generateFault = (id) => {
    const now = new Date();
    const timestamp = now.toISOString().slice(0, 19).replace("T", " ");

    return {
      id: String(id),
      name: `${
        faultNames[Math.floor(Math.random() * faultNames.length)]
      } #${Math.floor(Math.random() * 999)}`,
      distensToStartPoint: Math.floor(Math.random() * 250) + 1, // ← ONLY 1 to 250
      timeStamp: timestamp,
      size: Math.floor(Math.random() * 80) + 10,
      img: images[Math.floor(Math.random() * images.length)],
      description:
        descriptions[Math.floor(Math.random() * descriptions.length)],
      severity: weightedRandom(severities, severityWeights),
      link: "conveyor-view-details",
    };
  };

  // Generate up to 60 faults total, 5 every 10 seconds
  useEffect(() => {
    if (faults.length >= 60) return;

    const interval = setInterval(() => {
      setFaults((prev) => {
        if (prev.length >= 60) {
          clearInterval(interval);
          return prev;
        }

        const remaining = 60 - prev.length;
        const toAdd = Math.min(5, remaining);

        const nextId = prev.length + 1;
        const newFaults = Array.from({ length: toAdd }, (_, i) =>
          generateFault(nextId + i)
        );

        return [...newFaults, ...prev]; // Newest at top
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [faults.length]);

  const errorColumns = [
    {
      key: "name",
      header: "Fault Name",
      render: (item) => <strong className="text-zinc-900">{item.name}</strong>,
    },
    {
      key: "severity",
      header: "Severity",
      render: (item) => {
        const colors = {
          Critical: "bg-red-100 text-red-800",
          High: "bg-orange-100 text-orange-800",
          Medium: "bg-yellow-100 text-yellow-800",
          Low: "bg-green-100 text-green-800",
        };
        const color = colors[item.severity] || colors.Low;

        return (
          <span
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${color}`}
          >
            {item.severity}
          </span>
        );
      },
    },
    { key: "timeStamp", header: "Timestamp" },
    { key: "description", header: "Description" },
    {
      key: "distensToStartPoint",
      header: "Distance from Start",
      render: (item) => `${item.distensToStartPoint} m`,
    },
  ];

  return (
    <div className="flex flex-col gap-8 py-2 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="conveyor-live"
          className="btn btn-primary text-lg md:text-xl px-8 py-4 min-h-14 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-shadow"
        >
          <IconLive size={28} />
          Live View
        </Link>

        <Link
          href="conveyor-history"
          className="btn btn-gray text-lg md:text-xl px-8 py-4 min-h-14 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-shadow"
        >
          <IconHistory size={28} />
          History
        </Link>
      </div>

      {/* Conveyor Card */}
      <Card className="overflow-hidden shadow-xl rounded-2xl">
        <div className="p-4 sm:p-6 md:p-8">
          {/* Header: title + status */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
            {/* Title */}
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-zinc-800">
                Conveyor CV016
              </h2>
              <p className="text-zinc-600 mt-1 sm:mt-2 text-sm sm:text-base">
                Real-time monitoring dashboard
              </p>
            </div>

            {/* Status */}
            <div className="flex items-center gap-2 sm:gap-4">
              <span className="text-zinc-700 font-medium text-sm sm:text-base md:text-lg">
                Current status:
              </span>
              <div className="px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-base md:text-sm lg:text-base font-semibold flex items-center gap-1.5 sm:gap-2.5 bg-red-100 text-red-800 shadow-sm">
                <IconDanger size={18} sm={22} />
                Abnormal ({faults.length}/60 active)
              </div>
            </div>
          </div>

          {/* Conveyor Scene Container */}
          <div
            className="
        relative w-full 
        h-48 xs:h-64 sm:h-80 md:h-[520px] lg:h-[640px] xl:h-[720px] 
        rounded-2xl overflow-hidden 
        border border-zinc-200 shadow-lg
      "
          >
            <MemoizedConveyor faults={faults} />
          </div>
        </div>
      </Card>

      {/* Fault List */}
      <Card className="overflow-hidden">
        <div className="p-6 sm:p-8">
          <DataGrid
            title="Current Error List"
            data={faults}
            columns={errorColumns}
            primaryColumns={2}
            searchPlaceholder="Search errors..."
            currentPage={1}
            totalPages={Math.ceil(faults.length / 10)}
            onPageChange={(page) => console.log("Page:", page)}
          />
        </div>
      </Card>
    </div>
  );
}

// pages/faults-alerts-list/page.jsx
"use client";

import DataGrid from "@/components/common/DataGrid/DataGrid";
import { IconCheckSquareSuccesss, IconDanger } from "@/Icons";

const faultsData = [
  {
    id: 1,
    timestamp: "2025/05/09 – 09:32",
    equipmentName: "Conveyor Belt",
    faultType: "Belt Tear",
    description: "Tear detected at discharge zone",
    status: "Normal",
    unitPlant: "Reduction – Bardsir Steel Plant",
    fixed: "Fixed",
    type: "conveyor",
  },
  {
    id: 2,
    timestamp: "2025/05/09 – 09:32",
    equipmentName: "Conveyor Belt",
    faultType: "Belt deviation",
    description: "Belt slightly off-center at tail pulley",
    status: "Abnormal",
    unitPlant: "Reduction – Bardsir Steel Plant",
    fixed: "Not fixed",
    type: "conveyor",
  },
  {
    id: 3,
    timestamp: "2025/05/09 – 09:32",
    equipmentName: "Motor Bardsir",
    faultType: "Temperature increase",
    description: "Motor bearing temperature exceeded threshold",
    status: "Abnormal",
    unitPlant: "Reduction – Bardsir Steel Plant",
    fixed: "Not fixed",
    type: "motor",
  },
  {
    id: 4,
    timestamp: "2025/05/09 – 09:32",
    equipmentName: "Motor Bardsir",
    faultType: "Vibration level",
    description: "High vibration detected in drive end",
    status: "Abnormal",
    unitPlant: "Reduction – Bardsir Steel Plant",
    fixed: "Not fixed",
    type: "motor",
  },
];

// Generate dynamic link with [id]
const dataWithLinks = faultsData.map((item) => ({
  ...item,
  link: `faults-alerts/${item.id}`,
}));

const faultsColumns = [
  {
    key: "timestamp",
    header: "Timestamp",
  },
  {
    key: "equipmentName",
    header: "Equipment Name",
    render: (item) => (
      <strong className="text-zinc-900">{item.equipmentName}</strong>
    ),
  },
  {
    key: "faultType",
    header: "Fault Type",
  },
  {
    key: "description",
    header: "Description",
  },
  {
    key: "status",
    header: "Status",
    render: (item) => (
      <span
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
          item.status === "Normal"
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        {item.status === "Normal" ? (
          <IconCheckSquareSuccesss size={16} />
        ) : (
          <IconDanger size={16} />
        )}
        {item.status}
      </span>
    ),
  },
  {
    key: "unitPlant",
    header: "Unit / Plant",
  },
  {
    key: "fixed",
    header: "Fixed",
    render: (item) => (
      <span
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
          item.fixed === "Fixed"
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        {item.fixed === "Fixed" ? (
          <IconCheckSquareSuccesss size={16} />
        ) : (
          <IconDanger size={16} />
        )}
        {item.fixed}
      </span>
    ),
  },
];

export default function FaultsAlertsList() {
  return (
    <div className="flex flex-col gap-6 p-8  mx-auto px-4">
      <DataGrid
        title="Faults & Alerts List"
        data={dataWithLinks}
        columns={faultsColumns}
        primaryColumns={2} // Mobile: Equipment Name + Fault Type
        searchPlaceholder="Search faults..."
        currentPage={1}
        totalPages={5}
        onPageChange={(page) => console.log("Page:", page)}
      />
    </div>
  );
}

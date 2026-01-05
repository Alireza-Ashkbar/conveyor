// pages/equipment-list/page.jsx
"use client";

import DataGrid from "@/components/common/DataGrid/DataGrid";
import { IconCheckSquareSuccesss, IconDanger, IconEye } from "@/Icons";
import Link from "next/link";

const equipmentData = [
  {
    id: 1,
    name: "CV016 Conveyor Belt",
    type: "Conveyor Belt",
    plant: "Bardsir Steel",
    unit: "Reduction",
    eqCode: "3001",
    status: "Normal",
    lastAlert: "2024/05/04 - 08:45",
    link: "/equipment-list/conveyor-live",
  },
  {
    id: 2,
    name: "Motor No. 4",
    type: "Motor",
    plant: "Bardsir Steel",
    unit: "Rolling",
    eqCode: "3031",
    status: "Abnormal",
    lastAlert: "2024/05/04 - 08:45",
    link: "/equipment-list/motor-status",
  },
];
const equipmentColumns = [
  { key: "name", header: "Equipment Name", render: (item) => <strong>{item.name}</strong> },
  { key: "type", header: "Type" },
  { key: "plant", header: "Plant" },
  { key: "unit", header: "Unit" },
  { key: "eqCode", header: "EQ Code" },
  {
    key: "status",
    header: "Health Status",
    render: (item) => (
      <span
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
          item.status === "Normal" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}
      >
        {item.status === "Normal" ? <IconCheckSquareSuccesss size={16} /> : <IconDanger size={16} />}
        {item.status}
      </span>
    ),
  },
  { key: "lastAlert", header: "Last Alert" },
  // No "Action" column anymore!
];

export default function EquipmentList() {
  return (
    <div className="flex flex-col gap-6 p-8  mx-auto px-4">
      <DataGrid
        title="Equipment List"
        data={equipmentData}
        columns={equipmentColumns}
        currentPage={1}
        totalPages={5}
        onPageChange={(page) => console.log("Page:", page)}
      />
    </div>
  );
}
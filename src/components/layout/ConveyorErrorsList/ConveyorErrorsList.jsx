"use client";

import { Pagination } from "@/components";
import { IconEye } from "@/Icons";
import Link from "next/link";

const errorsData = [
  {
    id: 1,
    timestamp: "2025/05/09 - 09:32",
    size: "Belt Tear",
    detectionPoint: "Discharge Zone",
    description: "Belt tear detected at conveyor discharge",
    link: "conveyor-view-details",
  },
  {
    id: 2,
    timestamp: "2025/05/10 - 10:12",
    size: "Misalignment",
    detectionPoint: "Reduction Unit",
    description: "Conveyor slightly off-center",
    link: "conveyor-view-details",
  },
];

export const ConveyorErrorsList = () => {
  return (
    <>
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-auto">
        <table className="table w-full min-w-[800px]">
          <thead>
            <tr>
              <th className="w-52">Timestamp</th>
              <th>Size of the failure:</th>
              <th>Detection Point</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {errorsData.map((error) => (
              <tr key={error.id}>
                <td>{error.timestamp}</td>
                <td>{error.size}</td>
                <td>{error.detectionPoint}</td>
                <td>{error.description}</td>
                <td>
                  <Link
                    href={error.link}
                    className="btn btn-primary h-10 px-3 py-2 w-max"
                  >
                    <IconEye />
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {errorsData.map((error) => (
          <div key={error.id} className="border rounded-xl p-4 bg-white shadow-sm">
            <div className="text-sm font-medium text-zinc-700 mb-1">{error.timestamp}</div>
            <div className="text-sm text-zinc-600 mb-1">
              <span className="font-semibold">Size:</span> {error.size}
            </div>
            <div className="text-sm text-zinc-600 mb-1">
              <span className="font-semibold">Detection Point:</span> {error.detectionPoint}
            </div>
            <div className="text-sm text-zinc-600 mb-3">{error.description}</div>
            <Link
              href={error.link}
              className="btn btn-primary w-full h-10 flex items-center justify-center gap-2"
            >
              <IconEye />
              View Details
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-4">
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={(page) => console.log("Set page:", page)}
        />
      </div>
    </>
  );
};

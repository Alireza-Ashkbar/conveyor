"use client";

import { Pagination } from "@/components";
import { IconEye } from "@/Icons";
import Link from "next/link";

export const MotorErrorsList = () => {
  return (
    <>
      <div className="table-res overflow-auto">
        <table className="table w-full min-w-4xl">
          <thead>
            <tr>
              <th>Alert Time</th>
              <th>Vibration Value</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2025/05/09 - 09:32</td>
              <td>8.10 mm/s</td>
              <td>High vibration – Value exceeds threshold</td>
              <td>
                <Link
                  href="motor-view-details"
                  className="btn btn-primary h-10 px-3 py-2 w-max"
                >
                  <IconEye />
                  View Details
                </Link>
              </td>
            </tr>
            <tr>
              <td>2025/05/08 - 21:45</td>
              <td>4.56 mm/s</td>
              <td>High vibration – Value exceeds threshold</td>
              <td>
                <Link
                  href="motor-view-details"
                  className="btn btn-primary h-10 px-3 py-2 w-max"
                >
                  <IconEye />
                  View Details
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={console.log("setPage")}
      />
    </>
  );
};

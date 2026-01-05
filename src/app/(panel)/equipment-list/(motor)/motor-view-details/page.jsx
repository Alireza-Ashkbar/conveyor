"use client";

import {
  Card,
  Modal,
  ModalNotification,
  MotorNoteModal,
  Pagination,
} from "@/components";

import { IconEdit, IconEye, IconInbox } from "@/Icons";
import { useState } from "react";

export default function MotorViewDetails() {
  const [openMotorNoteModal, setOpenMotorNoteModal] = useState(false);
  const [selected, setSelected] = useState("yes");
  const [openModalWarning, setOpenModalWarning] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-4">
        <Card>
          <div className="flex items-center justify-between gap-6 mb-6">
            <div className="text-zinc-800 text-xl font-medium">
              System Diagnostic Report
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2.5">
              <label className="text-zinc-800 text-sm font-normal">
                Alert Time:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="2025/05/09 - 09:32"
              />
            </div>
            <div className="flex flex-col gap-2.5">
              <label className="text-zinc-800 text-sm font-normal">
                Vibration Value:
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="form-control"
                  placeholder="183.36"
                />
                <span className="absolute top-1/2 right-2 -translate-y-1/2 text-zinc-800 text-sm font-normal">
                  mm/s
                </span>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between gap-6">
            <div className="text-zinc-800 text-xl font-medium">
              Operator Verification Panel
            </div>
            <button
              className="btn btn-primary px-4 min-w-36 gap-4"
              onClick={() => setOpenModalWarning(true)}
            >
              <IconInbox />
              Save
            </button>
          </div>

          <div className="h-px bg-zinc-100 my-6" />

          <div className="flex items-center gap-6">
            <div className="text-zinc-800 text-base font-medium leading-relaxed">
              Is this issue valid?
            </div>

            <label className="radio-select text-zinc-800 text-base font-normal leading-relaxed">
              <input
                type="radio"
                name="issue_valid"
                value="yes"
                checked={selected === "yes"}
                onChange={(e) => setSelected(e.target.value)}
              />
              Yes, it’s real
            </label>

            <label className="radio-select text-zinc-800 text-base font-normal leading-relaxed">
              <input
                type="radio"
                name="issue_valid"
                value="no"
                checked={selected === "no"}
                onChange={(e) => setSelected(e.target.value)}
              />
              No, it’s a system error
            </label>

            <label className="radio-select text-zinc-800 text-base font-normal leading-relaxed">
              <input
                type="radio"
                name="issue_valid"
                value="monitoring"
                checked={selected === "monitoring"}
                onChange={(e) => setSelected(e.target.value)}
              />
              Monitoring
            </label>
          </div>

          {/* Conditional render Threshold */}
          {selected === "monitoring" && (
            <div className="flex flex-col flex-1 gap-3.5 mt-6 pt-4 border-t border-t-zinc-100">
              <label className="form-label text-zinc-800 text-sm font-medium">
                Threshold:
              </label>
              <input
                type="number"
                className="form-control max-w-2xl"
                placeholder="Enter Threshold (Number)"
              />
            </div>
          )}
        </Card>

        <Card>
          <div className="flex items-center justify-between gap-6">
            <div className="text-zinc-800 text-xl font-medium">
              Notes History
            </div>

            <div className="flex items-center gap-6">
              <button
                className="btn btn-primary-o px-4 min-w-36 gap-4"
                onClick={() => setOpenMotorNoteModal(true)}
              >
                <IconEdit />
                Add Note
              </button>
            </div>
          </div>

          <div className="h-px bg-zinc-100 my-6" />

          <div className="table-res overflow-auto my-6">
            <table className="table w-full min-w-4xl">
              <thead>
                <tr>
                  <th className="w-52">Date/Time</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2025/05/09 - 09:32</td>
                  <td>System false alarm - no visible damage</td>
                  <td>
                    AI-triggered alert for foreign object was not verified
                    during physical check. No object found along 20m segment of
                    belt. Report marked as false positive.
                  </td>
                  <td className="">
                    <button
                      className="btn btn-primary h-10 px-3 py-2 w-max"
                      onClick={() => setOpenMotorNoteModal(true)}
                    >
                      <IconEye />
                      View Details
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>2025/05/09 - 09:32</td>
                  <td>System false alarm - no visible damage</td>
                  <td>
                    AI-triggered alert for foreign object was not verified
                    during physical check. No object found along 20m segment of
                    belt. Report marked as false positive.
                  </td>
                  <td className="">
                    <button
                      className="btn btn-primary h-10 px-3 py-2 w-max"
                      onClick={() => setOpenMotorNoteModal(true)}
                    >
                      <IconEye />
                      View Details
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>2025/05/09 - 09:32</td>
                  <td>System false alarm - no visible damage</td>
                  <td>
                    AI-triggered alert for foreign object was not verified
                    during physical check. No object found along 20m segment of
                    belt. Report marked as false positive.
                  </td>
                  <td className="">
                    <button
                      className="btn btn-primary h-10 px-3 py-2 w-max"
                      onClick={() => setOpenMotorNoteModal(true)}
                    >
                      <IconEye />
                      View Details
                    </button>
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
        </Card>
      </div>

      <Modal
        title="Note Details"
        open={openMotorNoteModal}
        onClose={() => {
          setOpenMotorNoteModal(false);
        }}
      >
        <MotorNoteModal />
      </Modal>

      <ModalNotification
        type="warning" // warning, error
        title="Are you sure about your selection?"
        // text="A belt tear was detected in the Reduction Unit at 09:32."
        cancelText="Cancel"
        confirmText="Yes"
        open={openModalWarning}
        onClose={() => {
          setOpenModalWarning(false);
        }}
      ></ModalNotification>
    </>
  );
}

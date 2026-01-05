// pages/equipment-list/conveyor-view-details/page.jsx
"use client";

import { Card, Modal } from "@/components";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  IconAddCircle,
  IconCheckSquareSuccesss,
  IconChevronLeft,
  IconDanger,
  IconLive2,
} from "@/Icons";

const faultDetail = {
  id: "1",
  name: "Danger Zone 1",
  equipmentName: "Conveyor Belt CV016",
  faultType: "Belt Tear",
  severity: "High",
  timeStamp: "2025-12-28 14:30:00",
  detectionPoint: "Discharge Zone",
  distanceFromStart: 300,
  markerSize: 20,
  unitPlant: "Reduction – Bardsir Steel Plant",
  status: "Abnormal",
  fixed: "Not fixed",
  description:
    "High temperature detected on motor bearing near discharge pulley. Immediate inspection recommended to prevent belt damage and downtime.",
  img: "/images/danger1.jpg",
};
const initialNotes = [
  {
    id: 1,
    date: "2025-12-30 09:20", // Today
    author: "Ali Hosseini",
    text: "Fault detected by AI vision system on CV016 conveyor belt. Tear identified on top cover at discharge zone, approximately 40-50cm long, located 300m from head pulley. No steel cord exposure visible, but edges appear frayed. System automatically flagged as 'High Severity - Belt Tear'. Belt speed reduced to 75% as safety precaution. Maintenance team notified via urgent alert.",
    status: "Abnormal",
  },
  {
    id: 2,
    date: "2025-12-30 10:45", // Later today
    author: "Reza Karimi",
    text: "On-site verification of AI-detected fault on CV016. Confirmed longitudinal tear on carrying side, ~45cm in length, centered on belt. Minor material spillage observed at damage point. No impact to return side or structure yet. Photos taken and uploaded to system. Temporary speed restriction maintained. Awaiting shift supervisor approval for shutdown and repair planning.",
    status: "Abnormal",
  },
];

const getSeverityColor = (severity) => {
  switch (severity) {
    case "Critical":
      return "bg-red-100 text-red-800";
    case "High":
      return "bg-orange-100 text-orange-800";
    case "Medium":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function FaultDetails() {
  const [notes, setNotes] = useState(initialNotes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedNotes, setExpandedNotes] = useState({}); // { noteId: true/false }

  const [newNote, setNewNote] = useState({
    author: "",
    text: "",
    status: "Abnormal",
  });

  const toggleExpand = (noteId) => {
    setExpandedNotes((prev) => ({
      ...prev,
      [noteId]: !prev[noteId],
    }));
  };

  const handleSaveNote = () => {
    if (!newNote.author.trim() || !newNote.text.trim()) {
      alert("Please fill in your name and note description.");
      return;
    }

    const currentDate = new Date()
      .toLocaleString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
      .replace(",", "");

    const noteToAdd = {
      id: notes.length + 1,
      date: currentDate,
      author: newNote.author.trim(),
      text: newNote.text.trim(),
      status: newNote.status,
    };

    setNotes([noteToAdd, ...notes]);
    setNewNote({ author: "", text: "", status: "Abnormal" });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setNewNote({ author: "", text: "", status: "Abnormal" });
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="min-h-screen bg-zinc-50 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/faults-alerts"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium text-sm sm:text-base mt-6 mb-4 transition-colors"
          >
            <IconChevronLeft size={18} />
            Back to Faults List
          </Link>

          <Card className="overflow-hidden shadow-xl rounded-2xl sm:rounded-3xl">
            <div className="p-5 sm:p-8 lg:p-10">
              {/* Header, Image, Severity, Grid, Description — unchanged */}
              <div className="mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-800 mb-2">
                  {faultDetail.name}
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-zinc-600">
                  <span>
                    <strong>Equipment:</strong> {faultDetail.equipmentName}
                  </span>
                  <span className="hidden xs:inline">•</span>
                  <span>
                    <strong>Fault ID:</strong> #{faultDetail.id}
                  </span>
                </div>
              </div>

              {faultDetail.img && (
                <div className="relative w-full h-56 sm:h-72 lg:h-96 rounded-2xl overflow-hidden mb-6 shadow-md">
                  <Image
                    src={faultDetail.img}
                    alt={faultDetail.name}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <p className="text-base sm:text-lg font-semibold">
                      {faultDetail.faultType}
                    </p>
                    <p className="text-xs sm:text-sm opacity-90">
                      {faultDetail.detectionPoint}
                    </p>
                  </div>
                </div>
              )}

              <div className="mb-6">
                <span
                  className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm sm:text-base font-bold ${getSeverityColor(
                    faultDetail.severity
                  )}`}
                >
                  {faultDetail.severity} Severity
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {/* Grid items unchanged */}
                <div className="bg-zinc-50 rounded-xl p-4">
                  <p className="text-xs text-zinc-600 font-medium">
                    Detected At
                  </p>
                  <p className="text-lg font-bold text-zinc-800 mt-1 truncate">
                    {faultDetail.timeStamp}
                  </p>
                </div>
                <div className="bg-zinc-50 rounded-xl p-4">
                  <p className="text-xs text-zinc-600 font-medium">
                    Distance from Start
                  </p>
                  <p className="text-lg font-bold text-zinc-800 mt-1">
                    {faultDetail.distanceFromStart} m
                  </p>
                </div>
                <div className="bg-zinc-50 rounded-xl p-4">
                  <p className="text-xs text-zinc-600 font-medium">
                    Marker Size
                  </p>
                  <p className="text-lg font-bold text-yellow-600 mt-1">
                    {faultDetail.markerSize}
                  </p>
                </div>
                <div className="bg-zinc-50 rounded-xl p-4 sm:col-span-2 lg:col-span-1">
                  <p className="text-xs text-zinc-600 font-medium">
                    Unit / Plant
                  </p>
                  <p className="text-base font-semibold text-zinc-800 mt-1">
                    {faultDetail.unitPlant}
                  </p>
                </div>
                <div className="bg-zinc-50 rounded-xl p-4">
                  <p className="text-xs text-zinc-600 font-medium">
                    Current Status
                  </p>
                  <div className="mt-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                        faultDetail.status === "Normal"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {faultDetail.status === "Normal" ? (
                        <IconCheckSquareSuccesss size={14} />
                      ) : (
                        <IconDanger size={14} />
                      )}
                      {faultDetail.status}
                    </span>
                  </div>
                </div>
                <div className="bg-zinc-50 rounded-xl p-4">
                  <p className="text-xs text-zinc-600 font-medium">
                    Fixed Status
                  </p>
                  <div className="mt-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                        faultDetail.fixed === "Fixed"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {faultDetail.fixed === "Fixed" ? (
                        <IconCheckSquareSuccesss size={14} />
                      ) : (
                        <IconDanger size={14} />
                      )}
                      {faultDetail.fixed}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-50 rounded-xl p-5 mb-8">
                <h3 className="text-base sm:text-lg font-semibold text-zinc-800 mb-3">
                  Description
                </h3>
                <p className="text-sm sm:text-base text-zinc-700 leading-relaxed">
                  {faultDetail.description}
                </p>
              </div>

              {/* Notes Section - With Expand/Collapse */}
              <div className="bg-zinc-50 rounded-xl p-5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <h3 className="text-base sm:text-lg font-semibold text-zinc-800">
                    Maintenance Notes ({notes.length})
                  </h3>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn btn-primary   text-sm font-medium flex items-center justify-center gap-2 w-full sm:w-auto"
                  >
                    <IconAddCircle size={20} />
                    Add Note
                  </button>
                </div>

                <div className="space-y-4">
                  {notes.length === 0 ? (
                    <p className="text-zinc-600 text-center py-8 text-sm">
                      No notes yet.
                    </p>
                  ) : (
                    notes.map((note) => {
                      const isExpanded = !!expandedNotes[note.id];
                      const hasMultipleLines =
                        note.text.length > 80 || note.text.includes("\n");

                      return (
                        <div
                          key={note.id}
                          className={`border border-zinc-200 rounded-lg p-4 bg-white shadow-sm transition-all duration-300 ease-in-out ${
                            isExpanded ? "pb-6" : ""
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-3">
                            <div>
                              <p className="font-medium text-zinc-800 text-sm sm:text-base">
                                {note.author}
                              </p>
                              <p className="text-xs text-zinc-500">
                                {note.date}
                              </p>
                            </div>
                            <span
                              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                                note.status === "Fixed"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {note.status === "Fixed" ? (
                                <IconCheckSquareSuccesss size={12} />
                              ) : (
                                <IconDanger size={12} />
                              )}
                              {note.status}
                            </span>
                          </div>

                          {/* Text - One line collapsed */}
                          <div
                            className={`text-sm text-zinc-700 leading-relaxed ${
                              !isExpanded ? "line-clamp-1" : ""
                            }`}
                          >
                            {note.text}
                          </div>

                          {/* Expand Toggle */}
                          {hasMultipleLines && (
                            <button
                              onClick={() => toggleExpand(note.id)}
                              className="mt-3 text-primary hover:text-primary/80 text-sm font-medium transition-colors"
                            >
                              {isExpanded ? "Show Less" : "Show More"}
                            </button>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              <div className="mt-8">
                <Link href={"/equipment-list/conveyor-live"}>
                  <button className="w-full sm:w-auto btn btn-primary px-6 sm:px-8 py-3 text-base sm:text-lg font-medium flex items-center justify-center gap-3">
                    <IconLive2 size={20} />
                    Go to Live View
                  </button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Modal - unchanged */}
      <Modal
        title="Add Maintenance Note"
        open={isModalOpen}
        onClose={handleCancel}
        confirmText="Save Note"
        cancelText="Cancel"
        onConfirm={handleSaveNote}
        onCancel={handleCancel}
      >
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">
              Your Name
            </label>
            <input
              type="text"
              value={newNote.author}
              onChange={(e) =>
                setNewNote({ ...newNote, author: e.target.value })
              }
              className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              placeholder="e.g. John Doe"
              autoFocus
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">
              Note Description
            </label>
            <textarea
              value={newNote.text}
              onChange={(e) => setNewNote({ ...newNote, text: e.target.value })}
              rows={5}
              className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none text-sm"
              placeholder="Describe inspection, actions taken, observations..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">
              Status After Action
            </label>
            <select
              value={newNote.status}
              onChange={(e) =>
                setNewNote({ ...newNote, status: e.target.value })
              }
              className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            >
              <option value="Abnormal">Still Abnormal</option>
              <option value="Fixed">Fixed</option>
            </select>
          </div>
        </div>
      </Modal>
    </>
  );
}

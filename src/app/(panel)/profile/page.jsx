"use client";

import { Card, Modal, Option, Select } from "@/components";
import { useState } from "react";

export default function ProfileDetails() {
  // Profile state
  const [name, setName] = useState("Hojjat Bandani");
  const [position, setPosition] = useState("Manager");

  // Password modal state
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleSaveProfile = () => {
    // In real app: send to API
    alert("Profile updated successfully!");
  };

  const handleChangePassword = () => {
    if (!passwordData.current || !passwordData.new || !passwordData.confirm) {
      alert("Please fill in all password fields.");
      return;
    }
    if (passwordData.new !== passwordData.confirm) {
      alert("New passwords do not match.");
      return;
    }
    // In real app: validate current + update password via API
    alert("Password changed successfully!");
    setIsPasswordModalOpen(false);
    setPasswordData({ current: "", new: "", confirm: "" });
  };

  return (
    <>
      <div className="min-h-screen bg-zinc-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl rounded-2xl overflow-hidden">
            <div className="p-6 sm:p-8 lg:p-10">
              {/* Header */}
              <h1 className="text-2xl sm:text-3xl font-bold text-zinc-800 mb-8">
                My Profile
              </h1>

              {/* Editable Profile Info */}
              <div className="space-y-8">
                {/* Personal Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-neutral-600 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-control w-full px-4 py-3 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-neutral-600 mb-2">
                      Email Address
                    </label>
                    <div className="px-4 py-3 bg-zinc-100 rounded-lg text-zinc-700 font-medium">
                      hojjat.bandani@gmail.com
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-neutral-600 mb-2">
                      Last Login
                    </label>
                    <div className="px-4 py-3 bg-zinc-100 rounded-lg text-zinc-700">
                      2025/05/09 – 09:32
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-neutral-600 mb-2">
                      Organizational Position
                    </label>
                    <Select value={position} onChange={setPosition} className="w-full">
                      <Option value="Manager">Manager</Option>
                      <Option value="chief-executive-officer">
                        Chief Executive Officer (CEO)
                      </Option>
                      <Option value="chief-operating-officer">
                        Chief Operating Officer (COO)
                      </Option>
                      <Option value="chief-technology-officer">
                        Chief Technology Officer (CTO)
                      </Option>
                      <Option value="product-manager">Product Manager</Option>
                      <Option value="human-resources-manager">
                        Human Resources Manager
                      </Option>
                    </Select>
                  </div>
                </div>

                <hr className="border-zinc-200" />

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleSaveProfile}
                    className="btn btn-primary px-8 h-12 font-medium"
                  >
                    Save Profile Changes
                  </button>

                  <button
                    onClick={() => setIsPasswordModalOpen(true)}
                    className="btn btn-outline px-8 h-12 font-medium"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Change Password Modal */}
      <Modal
        title="Change Password"
        open={isPasswordModalOpen}
        onClose={() => {
          setIsPasswordModalOpen(false);
          setPasswordData({ current: "", new: "", confirm: "" });
        }}
        confirmText="Update Password"
        cancelText="Cancel"
        onConfirm={handleChangePassword}
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-3">
              Current Password
            </label>
            <input
              type="password"
              value={passwordData.current}
              onChange={(e) =>
                setPasswordData({ ...passwordData, current: e.target.value })
              }
              className="form-control w-full"
              placeholder="Enter your current password"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-3">
              New Password
            </label>
            <input
              type="password"
              value={passwordData.new}
              onChange={(e) =>
                setPasswordData({ ...passwordData, new: e.target.value })
              }
              className="form-control w-full"
              placeholder="Enter new password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-3">
              Confirm New Password
            </label>
            <input
              type="password"
              value={passwordData.confirm}
              onChange={(e) =>
                setPasswordData({ ...passwordData, confirm: e.target.value })
              }
              className="form-control w-full"
              placeholder="Confirm new password"
            />
          </div>
        </div>
      </Modal>
    </>
  );
}
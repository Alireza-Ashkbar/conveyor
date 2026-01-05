"use client";

import { IconAddCircle, IconClose } from "@/Icons";
import Image from "next/image";
import { useState } from "react";

export const ConveyorNoteModal = () => {
  // const [selectedImage, setSelectedImage] = useState(null);
  // const handleFileChange = (e) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     setSelectedImage(URL.createObjectURL(file));
  //   }
  // };

  const [selectedImages, setSelectedImages] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const newImages = files.map((file) => URL.createObjectURL(file));
      setSelectedImages((prev) => [...prev, ...newImages]);
    }
  };

  const handleRemoveImage = (idx) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col flex-1 gap-3.5">
        <label className="form-label text-zinc-800 text-sm font-normal">
          Title:
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter the title"
        />
      </div>

      <div className="flex flex-col flex-1 gap-3.5">
        <label className="form-label text-zinc-800 text-sm font-normal">
          Description:
        </label>
        <textarea
          rows={8}
          className="form-control"
          placeholder="Enter the description"
        ></textarea>
      </div>

      <div className="flex flex-col flex-1 gap-3.5">
        <label className="form-label text-zinc-800 text-sm font-normal">
          Images:
        </label>
        <div>
          <div className="grid grid-cols-3 gap-6 my-3 w-max">
            {/* Preview Cards */}
            {selectedImages.map((img, idx) => (
              <>
                <div
                  key={idx}
                  className="relative w-64 h-52 px-2 rounded-lg border border-zinc-100"
                >
                  <Image
                    src={img}
                    alt={`preview-${idx}`}
                    fill
                    className="object-cover rounded-lg"
                  />
                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-2 right-2 bg-white rounded-full shadow p-1 hover:bg-gray-100"
                  >
                    <IconClose />
                  </button>
                </div>
              </>
            ))}

            {/* File Input Card */}
            <label className="cursor-pointer w-64 h-52 px-2 bg-gray-50 rounded-lg border border-zinc-100 flex justify-center items-center gap-4 overflow-hidden">
              <IconAddCircle size={32} className="text-gray-400" />
              <input
                type="file"
                accept="image/*"
                multiple // enable selecting multiple files
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-6">
        <button className="btn bg-gray-50 font-medium px-6 hover:bg-gray-100">
          Cancel
        </button>
        <button className="btn btn-primary px-6">Save Note</button>
      </div>
    </div>
  );
};

"use client";

export const MotorNoteModal = () => {
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

      <div className="flex items-center justify-end gap-6">
        <button className="btn bg-gray-50 font-medium px-6 hover:bg-gray-100">
          Cancel
        </button>
        <button className="btn btn-primary px-6">Save Note</button>
      </div>
    </div>
  );
};

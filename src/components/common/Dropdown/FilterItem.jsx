"use client";

export const FilterItem = ({ children }) => {
  return (
    <div>
      <label className="cursor-pointer flex items-center gap-4 text-black text-base font-medium">
        <input type="radio" name="filter" />
        {children}
      </label>
    </div>
  );
};

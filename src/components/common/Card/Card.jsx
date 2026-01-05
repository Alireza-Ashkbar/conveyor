import React from "react";

export const Card = ({ children, classNames, ...rest }) => {
  return (
    <div
      className={`p-6 relative bg-white rounded-2xl border border-gray-50
      shadow-[0px_6px_13px_0px_rgba(163,163,163,0.04),0px_24px_24px_0px_rgba(163,163,163,0.03)] ${classNames} `}
      {...rest}
    >
      {children}
    </div>
  );
};

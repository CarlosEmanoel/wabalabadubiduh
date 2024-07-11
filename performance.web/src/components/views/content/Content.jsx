import React from "react";

export default function ContentComp({ children }) {
  return (
    <div className="form-control mr-2 mt-3 w-screen md:w-auto p-4 bg-white flex justify-center items-center rounded-lg flex-col">{children}</div>
  );
};

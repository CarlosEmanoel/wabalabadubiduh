import React from "react";
import { Outlet } from "react-router-dom";
import { PBackToTop, PFooter, PNavbar } from "../../components";

const SiteLayout = () => {
  return (
    <div className="flex flex-col justify-between min-h-[100vh]">
      <PNavbar />
      <Outlet />
      <PBackToTop />
      <PFooter />
    </div>
  );
};
export default SiteLayout;

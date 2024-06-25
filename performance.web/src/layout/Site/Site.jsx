import React from "react";
import { Outlet } from "react-router-dom";
import { PBackToTop, PFooter, PNavbar } from "../../components";

const SiteLayout = () => {
  return (
    <>
      <PNavbar />
      <Outlet />
      <PBackToTop />
      <PFooter />
    </>
  );
};
export default SiteLayout;

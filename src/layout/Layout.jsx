import React from "react";
import { Navbar } from "./Navbar.jsx";
import { Sidebar } from "./Sidebar.jsx";

export const Layout = ({ children }) => {
  return (
    <>
      <div className="relative">
        <Navbar />
        <Sidebar chid={children} />
      </div>
    </>
  );
};

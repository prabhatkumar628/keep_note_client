import React, { useRef, useState } from "react";
import { Navbar } from "./Navbar.jsx";
import { Sidebar } from "./Sidebar.jsx";

export const Layout = ({ children }) => {
  const [side, setSide] = useState(false);
  const scrollRef = useRef(null);
  return (
    <>
      <div className="relative">
        <Navbar
          scrollRef={scrollRef}
          side={side}
          setSide={setSide}
        />
        <Sidebar
          scrollRef={scrollRef}
          side={side}
          setSide={setSide}
          chid={children}
        />
      </div>
    </>
  );
};

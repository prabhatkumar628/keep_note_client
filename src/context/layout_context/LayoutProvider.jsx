import { useRef, useState } from "react";
import { LayoutContext } from "./LayoutContext.js";

export const LayoutProvider = ({ children }) => {
  const [grid, setGrid] = useState(false);
  const [side, setSide] = useState(false);
  const [search, setSearch] = useState("");
  const scrollRef = useRef(null);

  return (
    <>
      <LayoutContext.Provider value={{ grid, setGrid, side, setSide, scrollRef, search, setSearch }}>
        {children}
      </LayoutContext.Provider>
    </>
  );
};

import { useState } from "react";
import { LayoutContext } from "./LayoutContext.js";

export const LayoutProvider = ({ children }) => {
  const [grid, setGrid] = useState(false);

  return (
    <>
      <LayoutContext.Provider value={{ grid, setGrid }}>
        {children}
      </LayoutContext.Provider>
    </>
  );
};

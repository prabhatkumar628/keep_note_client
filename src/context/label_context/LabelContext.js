import { createContext, useContext } from "react";
export const LabelContext = createContext(null);
export const useLabel = () => useContext(LabelContext);

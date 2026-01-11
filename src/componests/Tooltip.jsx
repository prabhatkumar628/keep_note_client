import React from "react";

export const Tooltip = ({
  children,
  element = "div",
  tip,
  position = "top",
  className = "",
}) => {
  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const arrowClasses = {
    top: "top-full left-1/2 -translate-x-1/2 border-t",
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-b",
    left: "left-full top-1/2 -translate-y-1/2 border-l",
    right: "right-full top-1/2 -translate-y-1/2 border-r",
  };

  return React.createElement(
    element,
    {
      className: `relative group inline-flex ${className}`,
    },
    <>
      {children}

      {tip && (
        <span
          className={`
            absolute z-50 whitespace-nowrap
            px-2 py-1 rounded-md text-xs font-medium
            bg-gray-800 text-gray-100
            dark:bg-[#1a1a1a] dark:text-gray-200
            border border-gray-300 dark:border-gray-700
            opacity-0 group-hover:opacity-100
            scale-95 group-hover:scale-100
            transition-all duration-200
            pointer-events-none
            ${positionClasses[position]}
          `}
        >
          {tip}

          {/* 🔺 Center Arrow */}
          <span
            className={`
              absolute w-[9px] h-[9px] rotate-45 border-b border-r border-t-0 -mt-1
              bg-gray-800 dark:bg-[#1a1a1a]
              border-gray-300 dark:border-gray-700
              ${arrowClasses[position]}
            `}
          />
        </span>
      )}
    </>
  );
};

import React from "react";
import "./loading.css";

export const Loading = ({ title = "Loading", subtitle = "Please wait..." }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-dvh z-50">
  <div className="min-h-screen w-full flex items-center justify-center 
    bg-[rgba(0,0,0,0.45)] backdrop-blur-xs p-6">  {/* <-- BLUR ADDED */}
    
    <div className="grid place-items-center">
      <div className="flex items-center gap-4">
        <div className="loader w-20 h-20 rounded-full flex items-center justify-center">
          <svg className="w-12 h-12 animate-spin-slow" viewBox="0 0 50 50">
            <defs>
              <linearGradient id="g1" x1="0" x2="1">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
            </defs>
            <circle
              cx="25"
              cy="25"
              r="20"
              stroke="url(#g1)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="100"
              strokeDashoffset="25"
              fill="none"
            ></circle>
          </svg>
        </div>

        <div className="hidden md:block">
          <h1 className="text-2xl font-semibold text-gray-100">{title}</h1>
          <p className="text-sm text-gray-300">{subtitle}...</p>
        </div>
      </div>
    </div>

  </div>
</div>

  );
};

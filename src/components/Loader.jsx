import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <svg
        className="animate-spin h-10 w-10 text-blue-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8v-4zm10-1.227A7.965 7.965 0 0120 12h-4c0 3.512-2.24 6.493-5.361 7.616l1.723-3.546z"
        ></path>
      </svg>
    </div>
  );
};

export default Loader;

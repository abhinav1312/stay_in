import React from "react";

const Loader = () => {
  return (
    <div className="absolute h-screen w-screen bg-gray-300 pointer-events-none flex flex-col gap-4 justify-center items-center">
      <div
        className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
      </div>
      <span>
        Loading...
      </span>

    </div>
  );
};

export default Loader;

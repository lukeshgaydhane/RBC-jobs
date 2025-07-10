import React from "react";

const SkeletonJobCard = () => (
  <div className="animate-pulse bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col space-y-4" aria-label="Loading job card">
    <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
    <div className="h-6 w-2/3 bg-gray-200 rounded"></div>
    <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
    <div className="flex space-x-2 mt-2">
      <div className="h-8 w-20 bg-gray-200 rounded"></div>
      <div className="h-8 w-20 bg-gray-200 rounded"></div>
    </div>
    <div className="h-3 w-full bg-gray-100 rounded mt-4"></div>
    <div className="h-3 w-5/6 bg-gray-100 rounded"></div>
    <div className="h-3 w-2/3 bg-gray-100 rounded"></div>
  </div>
);

export default SkeletonJobCard; 
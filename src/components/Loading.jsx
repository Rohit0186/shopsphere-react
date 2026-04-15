import React from 'react';

// Keeping the loader very basic as it looks more like a manual setup
// than a polished, multi-layer UI component.
const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <p className="text-gray-400 font-medium tracking-tight">Loading products...</p>
    </div>
  );
};

export default Loading;

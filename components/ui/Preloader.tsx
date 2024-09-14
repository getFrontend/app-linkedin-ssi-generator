import React from "react";

const Preloader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="initial-loading-state">
        <div className="initial-load-animation">
          <div className="salesnav-image"></div>
          <div className="loading-bar">
            <div className="blue-bar"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;

import React, { useState } from "react";
import BarLoader from "react-spinners/BarLoader";

export default function SplashScreen() {



  return (
    <div className="fixed bg-gray-700 gap-2 flex-col inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <p className="font-bold text-3xl text-white">Task Master</p>
      <BarLoader
        color="#36d7b7"
        loading={true}

        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

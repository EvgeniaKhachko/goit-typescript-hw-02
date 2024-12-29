import React from "react";
import { Vortex } from "react-loader-spinner";

const Loader: React.FC = () => {
  return (
    <div className="loader">
      <Vortex
        visible={true}
        height="80"
        width="80"
        ariaLabel="vortex-loading"
        wrapperStyle={{}}
        wrapperClass="vortex-wrapper"
        colors={["red", "green", "blue", "yellow", "orange", "purple"]}
      />
    </div>
  );
};

export default Loader;


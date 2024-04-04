import React from "react";
import classNames from "classnames";
import CircularProgress from '@mui/material/CircularProgress';
const FullButton = ({ children, onClick, inputClass, loading }) => {
  return (
    <div
      onClick={onClick}
      className={classNames([
        inputClass,
        "w-full text-center mt-3 rounded-lg p-2 font-semibold cursor-pointer",
        {
          "bg-opacity-65 pointer-events-none": loading,
        },
      ])}
    >
      {loading ? <CircularProgress className="!w-5 !h-5 !text-white" /> : children }

    </div>
  );
};

export default FullButton;

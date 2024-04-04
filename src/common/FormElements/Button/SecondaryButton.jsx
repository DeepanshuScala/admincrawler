import classNames from "classnames";
import React from "react";

const SecondaryButton = ({ children, onClick, inputClass }) => {
  return (
    <div
      onClick={onClick}
      className={classNames(
        "w-full h-[48px] cursor-pointer px-3 py-0.5 rounded-full flex justify-center items-center gap-1",
        inputClass
      )}
    >
      {children}
    </div>
  );
};

export default SecondaryButton;

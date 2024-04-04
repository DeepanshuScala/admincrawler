import React from "react";
import classNames from "classnames";

const PrimaryModalHeader = ({ children, inputClass }) => {
  return (
    <h1
      className={classNames([
        "mb-3 text-lg font-semibold text-center",
        inputClass,
      ])}
    >
      {children}
    </h1>
  );
};

export default PrimaryModalHeader;

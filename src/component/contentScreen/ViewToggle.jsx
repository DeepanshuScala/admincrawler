import React from "react";

const ViewToggle = ({ icon, text }) => {
  return (
    <h1 className="flex justify-center items-center">
      <span className="mr-2">
        {icon}
      </span>
      <span className="underline">{text}</span>
    </h1>
  );
};

export default ViewToggle;

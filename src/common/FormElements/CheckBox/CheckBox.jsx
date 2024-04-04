import React from "react";
import "./checkbox.css";

const CheckBox = ({ label, checked, name, onChange }) => {
  return (
    <label class="cursor-pointer flex content-center items-center">
      <input
        name={name}
        type="checkbox"
        class="checkbox-button__input"
        id="choice1-1"
        onChange={onChange}
        checked={checked}
      />
      <span class="checkbox-button__control"></span>
      <span class="text-base font-medium">{label}</span>
    </label>
  );
};

export default CheckBox;

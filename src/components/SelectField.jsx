import React from "react";
import Hr from "./Hr";
const SelectField = ({ options, value, onChange,label }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <>
    <label>{label}</label>
    <select value={value} onChange={handleChange} className="block w-full border-[1px] border-primary rounded-lg px-5 py-4 mt-2">
      {options.map((option, index) => (
        <option key={index} value={option.value}>{option.label}</option>
      ))}
    </select>
    </>
  );
};

export default SelectField;

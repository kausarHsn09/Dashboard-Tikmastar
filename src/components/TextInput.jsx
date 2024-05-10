import React from "react";

const TextInput = ({ type, label, value, onChange, placeholder }) => {
  return (
    <div className="flex flex-col">
      <label>{label}</label>
      
      <input
        type={type}
        className="border-[1px] border-primary rounded-lg px-5 py-4 mt-2" 
        value={value}
        onChange={onChange} 
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextInput;

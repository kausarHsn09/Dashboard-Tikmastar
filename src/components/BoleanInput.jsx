
const BooleanInput = ({ label, value, onChange }) => {
  const handleChange = (e) => {
    onChange(e.target.checked);
  };

  return (
    <div className="flex items-center">
      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={value}
          id={label}
          onChange={handleChange}
          className="appearance-none w-5 h-5 rounded-full border-2 border-gray-400 checked:bg-primary checked:border-transparent focus:outline-none"
        />
        {label}
      </label>
    </div>
  );
};

export default BooleanInput;

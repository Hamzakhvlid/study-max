import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

const DateRangePicker = ({onChange}) => {
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue) => {
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="relative w-full">
      <Datepicker
        value={value}
        onChange={handleValueChange}
        showShortcuts={true}
        primaryColor={"blue"}
        inputClassName="w-full px-4 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 border-solid border-2 border-grey-400 focus:border-0"
      />
    </div>
  );
};

export default DateRangePicker;

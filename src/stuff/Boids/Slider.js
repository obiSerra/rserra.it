import React, { useEffect, useState } from "react";

export default function Slider(props) {
  const { name, label, startVal = 50, minVal = 0, maxVal = 100, onUpdate } = props;

  const [sliderValue, setSliderValue] = useState(parseInt(startVal));

  const onChange = e => {
    const val = parseInt(e.target.value, 10);
    setSliderValue(val);
    onUpdate(val);
  };

  useEffect(() => {}, []);

  return (
    <>
      <label htmlFor={`range_${name}_id`}>{label}</label>
      <div className="d-flex flex-row">
        <input
          type="range"
          id={`range_${name}_id`}
          name={`range_${name}_name`}
          className="slider"
          onChange={onChange}
          value={sliderValue}
          min={minVal}
          max={maxVal}
        />

        <input
          type="number"
          id={`range_${name}_value`}
          value={sliderValue}
          onChange={onChange}
          className="slider-value number-value"
          size="2"
          min={minVal}
          max={maxVal}
        />
      </div>
    </>
  );
}

export function Checkbox(props) {
  const { name, label, startVal, onUpdate = () => null } = props;

  const [checkVal, setCheckVal] = useState(!!startVal);

  const onChange = e => {
    setCheckVal(e.target.checked);
    onUpdate(!checkVal);
  };
  return (
    <>
      <label htmlFor={`check_${name}_id`} className="checkbox">
        <input
          type="checkbox"
          id={`check_${name}_id`}
          name={`check_${name}_id`}
          onChange={onChange}
          checked={checkVal}
        />{" "}
        {label}
      </label>
    </>
  );
}

export function Number(props) {
  const { name, label, startVal = 50, onUpdate = () => null, minVal = 0, maxVal = 1000 } = props;

  const [intVal, setIntVal] = useState(parseInt(startVal, 10));

  const onChange = e => {
    setIntVal(e.target.value);
    onUpdate(parseInt(e.target.value, 10));
  };
  return (
    <>
      <label htmlFor={`check_${name}_id`}>
        {label}
        <input
          type="number"
          min={minVal}
          max={maxVal}
          id={`check_${name}_id`}
          name={`check_${name}_id`}
          className="number-value"
          onChange={onChange}
          value={intVal}
          size="2"
        />{" "}
      </label>
    </>
  );
}

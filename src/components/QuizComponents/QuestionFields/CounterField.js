import React, { useState } from 'react';

const CounterField = ({ field, onChange, value }) => {
  const [count, setCount] = useState(value || field.defaultValue);

  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    onChange(newCount);
  };

  const decrement = () => {
    if (count > field.min) {
      const newCount = count - 1;
      setCount(newCount);
      onChange(newCount);
    }
  };

  return (
    <div className="field">
      <label>{field.title}</label>
      <div className="counter">
        <button type="button" onClick={decrement}>-</button>
        <span>{count}</span>
        <button type="button" onClick={increment}>+</button>
      </div>
    </div>
  );
};

export default CounterField;

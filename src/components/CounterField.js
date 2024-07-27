import React, { useState } from 'react';

const CounterField = ({ field, onChange }) => {
  const [count, setCount] = useState(field.defaultValue);

  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    onChange(field.code, newCount);
  };

  const decrement = () => {
    if (count > field.min) {
      const newCount = count - 1;
      setCount(newCount);
      onChange(field.code, newCount);
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

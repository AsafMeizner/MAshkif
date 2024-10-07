import React, { useState } from 'react';
import './tableChart.css'; 

const TableChart = ({ config }) => {
  const defaultConfig = {
    data: [],
    columns: [],
    title: 'Default Title',
  };

  const finalConfig = { ...defaultConfig, ...config };

  const { data, columns, title } = finalConfig;

  const [columnWidths, setColumnWidths] = useState(
    columns.reduce((acc, col) => {
      acc[col.key] = 200; 
      return acc;
    }, {})
  );

  const handleMouseDown = (e, colKey) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = columnWidths[colKey];

    const onMouseMove = (e) => {
      const newWidth = startWidth + (e.clientX - startX);
      setColumnWidths((prevWidths) => ({
        ...prevWidths,
        [colKey]: Math.max(newWidth, 50), 
      }));
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  return (
    <div className="table-container">
      <h2 className="table-title">{title}</h2>
      <div className="table-wrapper">
        <table className="resizable-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={{ width: columnWidths[col.key] }}
                  className="resizable-header"
                >
                  {col.label}
                  <div
                    className="resize-handle"
                    onMouseDown={(e) => handleMouseDown(e, col.key)}
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col) => (
                  <td key={col.key}>{row[col.key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableChart;

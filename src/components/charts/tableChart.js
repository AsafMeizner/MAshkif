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

  const isHebrew = (text) => /[\u0591-\u05F4]/.test(text);

  const [columnWidths, setColumnWidths] = useState(
    columns.reduce((acc, col) => {
      acc[col.key] = null;
      return acc;
    }, {})
  );

  const handleMouseDown = (e, colKey) => {
    e.preventDefault();
    const startX = e.clientX;
    let startWidth = columnWidths[colKey];
    if (startWidth === null) {
      startWidth = e.target.parentElement.offsetWidth || 200;
    }

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
                  style={{ width: columnWidths[col.key] ? `${columnWidths[col.key]}px` : 'auto' }}
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
                  <td key={col.key}>
                    {typeof row[col.key] === 'string'
                      ? row[col.key].split('\n').map((line, i) => (
                        <React.Fragment key={i}>
                          {isHebrew(line)
                            ? (
                              <span
                                dir="rtl"
                                style={{
                                  textAlign: 'right',
                                  display: 'block',
                                  overflow: 'visible',
                                  whiteSpace: 'normal',
                                }}
                              >
                                {line}
                              </span>
                            )
                            : line}
                          <br />
                        </React.Fragment>
                      ))
                      : row[col.key]
                    }
                  </td>
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
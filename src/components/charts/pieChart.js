import React from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const PieGraph = ({ config }) => {
  const defaultConfig = {
    data: [],
    dataKey: 'value',
    nameKey: 'name',
    chartSettings: {
      outline: true,
      outlineColor: '#ffffff',
      outlineWidth: 1,
      innerRadius: 0,
      outerRadius: '70%',
    },
    showTooltip: true,
    tooltipSettings: {
      backgroundColor: '#333333',
      borderRadius: '10px',
      fontSize: '0.875rem',
      textColor: '#ffffff',
      cursorColor: 'rgba(255, 255, 255, 0.1)',
    },
    showLegend: true,
    legendPosition: 'top',
    legendLayout: 'horizontal',
    responsive: true,
    maintainAspectRatio: true,
    fontSettings: {
      titleFontSize: '1.5rem',
      legendFontSize: '1rem',
      tooltipFontSize: '0.875rem',
      defaultLabelColor: '#ffffff',
    },
    colors: ['#8884d8', '#82ca9d', '#ff4444', '#ffc658', '#ff8042', '#73bf69', '#a4de6c', '#d0ed57'],
    showLabels: true,
    dataLabelPosition: 'outside',
    scoringTypes: [], // <-- default to empty array
    width: 800,
    height: 500,
    title: '',
  };

  const finalConfig = { ...defaultConfig, ...config };
  const {
    data,
    dataKey,
    nameKey,
    chartSettings,
    showTooltip,
    tooltipSettings,
    showLegend,
    width,
    height,
    title,
    fontSettings,
    colors,
    responsive,
    maintainAspectRatio,
    showLabels,
    legendPosition,
    legendLayout,
    scoringTypes, // now guaranteed at least []
  } = finalConfig;

  // Safely handle scoringTypes, defaulting to an empty array if not present
  const st = scoringTypes || [];

  /**
   * updatedData: For each data entry, try to find a scoringType with
   * the same "key" as entry[nameKey], then use that scoringType's .name
   * for display. Otherwise, fallback to the raw entry[nameKey].
   */
  const updatedData = data.map((entry) => {
    // Safely handle if nameKey is missing or undefined
    const entryKeyValue = entry[nameKey];
    if (!entryKeyValue) {
      return {
        ...entry,
        name: 'Unknown', // fallback
      };
    }
    // attempt to find a scoringType that matches this entry's key
    const correspondingType = st.find((type) => type.key === entryKeyValue);
    return {
      ...entry,
      name: correspondingType ? correspondingType.name : entryKeyValue,
    };
  });

  return (
    <div
      style={{
        width: responsive ? '100%' : width,
        height: responsive ? '100%' : height,
      }}
    >
      {title && (
        <h2
          style={{
            fontSize: fontSettings.titleFontSize,
            textAlign: 'center',
            marginBottom: 20,
            color: '#ffffff',
          }}
        >
          {title}
        </h2>
      )}
      <ResponsiveContainer
        width="100%"
        height="100%"
        aspect={maintainAspectRatio ? 2 : 1}
      >
        <PieChart>
          <Pie
            data={updatedData}
            dataKey={dataKey}
            nameKey={nameKey}
            cx="50%"
            cy="50%"
            outerRadius={chartSettings.outerRadius}
            innerRadius={chartSettings.innerRadius}
            fill={colors[0]}
            stroke={chartSettings.outlineColor}
            strokeWidth={chartSettings.outlineWidth}
            label={
              showLabels
                ? ({ name, value }) => `${name}: ${value}`
                : null
            }
            labelLine={showLabels}
          >
            {updatedData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>

          {showTooltip && (
            <Tooltip
              contentStyle={{
                backgroundColor: tooltipSettings.backgroundColor,
                borderRadius: tooltipSettings.borderRadius,
                fontSize: tooltipSettings.fontSize,
                color: tooltipSettings.textColor,
              }}
              itemStyle={{ color: tooltipSettings.textColor }}
              cursor={{ fill: tooltipSettings.cursorColor }}
              wrapperStyle={{
                borderColor: '#ccc',
                boxShadow: '0 0 10px rgba(255, 255, 255, 0.2)',
              }}
            />
          )}

          {showLegend && (
            <Legend
              layout={legendLayout}
              verticalAlign={legendPosition}
              align={
                legendPosition === 'left' || legendPosition === 'right'
                  ? legendPosition
                  : 'center'
              }
              wrapperStyle={{
                display: 'flex',
                justifyContent:
                  legendLayout === 'horizontal' ? 'center' : 'flex-start',
                fontSize: fontSettings.legendFontSize,
                color: '#ffffff',
                paddingLeft: '20px',
                flexWrap: 'wrap',
              }}
            />
          )}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieGraph;

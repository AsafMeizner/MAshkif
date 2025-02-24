import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const MultiPieChart = ({ config }) => {
  const defaultGlobalConfig = {
    mainTitle: '',
    unifiedLegend: true, 
    globalScoringTypes: [],
    pieChartDefaults: {
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
      showLabels: true,
      labelFormatter: ({ value }) => value,
      colors: ['#8884d8', '#82ca9d', '#ff4444', '#ffc658', '#ff8042', '#73bf69', '#a4de6c', '#d0ed57'],
      responsive: true,
      maintainAspectRatio: true,
      height: 250,
    },
  };

  const finalGlobalConfig = { ...defaultGlobalConfig, ...config };
  const { mainTitle, pieCharts, globalScoringTypes, unifiedLegend, pieChartDefaults } = finalGlobalConfig;

  const legendItems =
    globalScoringTypes.length > 0 ? globalScoringTypes : (pieCharts[0]?.scoringTypes || []);

  return (
    <div style={{ width: '100%', color: '#ffffff' }}>
      {mainTitle && (
        <h2 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '2rem' }}>
          {mainTitle}
        </h2>
      )}

      {unifiedLegend && legendItems.length > 0 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            marginBottom: '20px',
          }}
        >
          {legendItems.map((item, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                margin: '0 10px',
              }}
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  backgroundColor: item.color,
                  marginRight: 5,
                }}
              />
              <span style={{ fontSize: '1rem' }}>{item.label}</span>
            </div>
          ))}
        </div>
      )}

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'nowrap',
        }}
      >
        {pieCharts.map((chartConfig, index) => {
          const mergedConfig = {
            ...pieChartDefaults,
            ...chartConfig,
            chartSettings: {
              ...pieChartDefaults.chartSettings,
              ...chartConfig.chartSettings,
            },
            tooltipSettings: {
              ...pieChartDefaults.tooltipSettings,
              ...chartConfig.tooltipSettings,
            },
            scoringTypes: chartConfig.scoringTypes || globalScoringTypes || [],
          };

          const {
            title,
            data,
            dataKey,
            nameKey,
            chartSettings,
            showTooltip,
            tooltipSettings,
            showLabels,
            labelFormatter,
            colors,
            height,
          } = mergedConfig;

          return (
            <div
              key={index}
              style={{
                flex: '1 1 0',
                maxWidth: '25%',
                textAlign: 'center',
                padding: '10px',
              }}
            >
              {title && (
                <h3 style={{ marginBottom: '10px', fontSize: '1.2rem' }}>
                  {title}
                </h3>
              )}
              <ResponsiveContainer width="100%" height={height}>
                <PieChart>
                  <Pie
                    data={data}
                    dataKey={dataKey}
                    nameKey={nameKey}
                    cx="50%"
                    cy="50%"
                    innerRadius={chartSettings.innerRadius}
                    outerRadius={chartSettings.outerRadius}
                    label={showLabels ? labelFormatter : false}
                    labelLine={false}
                    stroke={chartSettings.outline ? chartSettings.outlineColor : 'none'}
                    strokeWidth={chartSettings.outline ? chartSettings.outlineWidth : 0}
                  >
                    {data.map((entry, idx) => {
                      const match = mergedConfig.scoringTypes.find(
                        (type) => type.key === entry[nameKey] || type.name === entry[nameKey]
                      );
                      return (
                        <Cell
                          key={`cell-${idx}`}
                          fill={match ? match.color : colors[idx % colors.length]}
                        />
                      );
                    })}
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
                    />
                  )}
                </PieChart>
              </ResponsiveContainer>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MultiPieChart;

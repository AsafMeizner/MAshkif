import React from 'react';
import {
    RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip
} from 'recharts';

const RadarGraph = ({ config }) => {
    const defaultConfig = {
        data: [],
        radars: [],
        radarSettings: {
            strokeWidth: 2,
            dot: true,
        },
        angleKey: 'subject',
        showRadiusAxis: true, // Toggle to show/hide the radius axis
        customLabels: {},
        showGrid: true,
        gridType: 'polygon', // or 'circle'
        fillGrid: false,
        showLegend: true,
        legendPosition: 'top',
        responsive: true,
        maintainAspectRatio: false,
        width: 800,
        height: 500,
        title: 'Radar Chart',
        tooltipSettings: {
            backgroundColor: '#333333',
            borderRadius: '10px',
            fontSize: '0.875rem',
            textColor: '#ffffff',
            cursorColor: 'rgba(255, 255, 255, 0.1)',
        },
        fontSettings: {
            titleFontSize: '1.5rem',
            axisLabelFontSize: '1.125rem',
            axisTickFontSize: '1rem',
            legendFontSize: '1rem',
            tooltipFontSize: '0.875rem',
            defaultLabelColor: '#ffffff',
        },
        margin: { top: 20, right: 20, left: 20, bottom: 120 },
        maxGridValue: 100, // Default max grid value (can be overridden in the config)
        showTooltip: true, // Default to showing the tooltip
    };

    const finalConfig = { ...defaultConfig, ...config };

    const {
        data,
        radars,
        radarSettings,
        angleKey,
        showRadiusAxis,
        showTooltip, // Toggle to show/hide the tooltip
        customLabels,
        showGrid,
        gridType,
        fillGrid,
        showLegend,
        legendPosition,
        width,
        height,
        title,
        tooltipSettings,
        fontSettings,
        maintainAspectRatio,
        margin,
        maxGridValue, // Max value for the edge of the grid
    } = finalConfig;

    return (
        <div style={{ width: finalConfig.responsive ? '100%' : width, height: finalConfig.responsive ? '100%' : height }}>
            {title && <h2 style={{ fontSize: fontSettings.titleFontSize, textAlign: 'center', marginBottom: 20, color: '#ffffff' }}>{title}</h2>}
            <ResponsiveContainer width="100%" height="100%" aspect={maintainAspectRatio ? 1 : 2}>
                <RadarChart data={data} margin={margin}>
                    {showGrid && (
                        <PolarGrid
                            gridType={gridType}
                            stroke={fillGrid ? 'rgba(255, 255, 255, 0.5)' : '#ffffff'}
                            fill={fillGrid ? 'rgba(255, 255, 255, 0.2)' : 'none'}
                            fillOpacity={fillGrid ? 0.6 : 0}
                        />
                    )}
                    <PolarAngleAxis
                        dataKey={angleKey}
                        tick={{ fontSize: fontSettings.axisTickFontSize, fill: fontSettings.defaultLabelColor }}
                        tickFormatter={(tick) => customLabels[tick] || tick}
                    />
                    <PolarRadiusAxis
                        angle={30}
                        domain={[0, maxGridValue]}  // Ensure the correct domain is used
                        tick={{
                            fontSize: fontSettings.axisTickFontSize,
                            fill: showRadiusAxis ? fontSettings.defaultLabelColor : 'rgba(255, 255, 255, 0)', // Make labels invisible if showRadiusAxis is false
                        }}
                        axisLine={{ stroke: showRadiusAxis ? '#ffffff' : 'rgba(255, 255, 255, 0)' }} // Hide the axis line if needed
                    />
                    {radars.map(radar => (
                        <Radar
                            key={radar.key}
                            name={radar.label}
                            dataKey={radar.key}
                            stroke={radar.color}
                            fill={radar.color}
                            fillOpacity={radarSettings.dot ? 0.1 : 0}
                            strokeWidth={radarSettings.strokeWidth}
                            dot={radarSettings.dot}
                            domain={[0, maxGridValue]} // Force domain to use maxGridValue
                        />
                    ))}
                    {showLegend && (
                        <Legend
                            verticalAlign={legendPosition}
                            wrapperStyle={{ fontSize: fontSettings.legendFontSize, color: '#ffffff' }}
                        />
                    )}
                    {showTooltip && ( // Conditionally render the tooltip based on showTooltip
                        <Tooltip
                            contentStyle={{
                                backgroundColor: tooltipSettings.backgroundColor,
                                borderRadius: tooltipSettings.borderRadius,
                                fontSize: tooltipSettings.fontSize,
                                color: tooltipSettings.textColor,
                            }}
                            cursor={{ fill: tooltipSettings.cursorColor }}
                        />
                    )}
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RadarGraph;

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
        },
        showTooltip: true,
        tooltipSettings: {
            backgroundColor: '#333333',
            borderRadius: '10px',
            fontSize: '14px',
            textColor: '#ffffff',
            cursorColor: 'rgba(255, 255, 255, 0.1)',
        },
        showLegend: true,
        interactiveLegend: true,
        legendPosition: 'right',
        responsive: true,
        maintainAspectRatio: false,
        width: 800,
        height: 500,
        title: 'Pie Chart',
        fontSettings: {
            titleFontSize: 24,
            legendFontSize: 16,
            tooltipFontSize: 16,
            defaultLabelColor: '#ffffff',
        },
        colors: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'],
        showLabels: true,
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
    } = finalConfig;

    return (
        <div style={{ width: responsive ? '100%' : width, height: responsive ? '100%' : height }}>
            {title && <h2 style={{ fontSize: fontSettings.titleFontSize, textAlign: 'center', marginBottom: 20, color: '#ffffff' }}>{title}</h2>}
            <ResponsiveContainer width="100%" height="100%" aspect={maintainAspectRatio ? 2 : 1}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey={dataKey}
                        nameKey={nameKey}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        innerRadius={chartSettings.innerRadius}
                        fill={colors[0]}
                        stroke={chartSettings.outlineColor}
                        strokeWidth={chartSettings.outlineWidth}
                        labelLine={true}
                        label={showLabels ? ({ name, value }) => `${name}: ${value}` : null}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
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
                            layout="vertical"
                            align="right"
                            verticalAlign="middle"
                            wrapperStyle={{
                                fontSize: fontSettings.legendFontSize,
                                color: '#ffffff',
                                paddingLeft: '20px',
                            }}
                        />
                    )}
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

// New pie (or doughnut) graph configuration
export const pieGraphConfig = {
    data: [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
    ],
    dataKey: 'value',
    nameKey: 'name',
    chartSettings: {
        outlineColor: '#ffffff',
        outlineWidth: 2,
        innerRadius: 50,
    },
    showTooltip: true,
    tooltipSettings: {
        backgroundColor: '#333333',
        borderRadius: '8px',
        fontSize: '14px',
        textColor: '#ffffff',
        cursorColor: 'rgba(255, 255, 255, 0.1)',
    },
    showLegend: true,
    responsive: true,
    maintainAspectRatio: true,
    width: 400,
    height: 400,
    title: 'Doughnut Chart Example',
    fontSettings: {
        titleFontSize: 24,
        legendFontSize: 16,
        tooltipFontSize: 14,
        defaultLabelColor: '#ffffff',
    },
    colors: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'],
    showLabels: true,
};

const PieGraphExample = () => (
    <div>
        <PieGraph config={pieGraphConfig} />
    </div>
);

export default PieGraphExample;

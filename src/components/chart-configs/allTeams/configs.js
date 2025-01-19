// config.js

import {
    transformData,
    calculateAverage,
    calculateMax,
} from './functions.js';

/**
 * Generates the chart configuration by applying transformations.
 * @param {Array} scoutingData - The raw scouting data.
 * @param {Array} transformations - The array of transformations to apply.
 * @param {Object} chartSettings - The settings for the chart.
 * @returns {Object} - The complete chart configuration.
 */
const generateChartConfig = (scoutingData, transformations, chartSettings) => {
    const transformedData = transformData(scoutingData, transformations);

    return {
        data: transformedData,
        title: chartSettings.title,
        scoringTypes: chartSettings.scoringTypes,
        chartSettings: {
            showGridlines: chartSettings.showGridlines,
            gridlineColor: chartSettings.gridlineColor,
        },
        xKey: chartSettings.xKey || 'teamNumber',
        yKey: chartSettings.yKey || 'averageScore',
        xAxisLabel: chartSettings.xAxisLabel || 'Team Number',
        yAxisLabel: chartSettings.yAxisLabel || 'Score',
        yAxisMin: chartSettings.yAxisMin || 0,
        yAxisMax: chartSettings.yAxisMax || 'auto',
        showTooltip: chartSettings.showTooltip !== undefined ? chartSettings.showTooltip : true,
        tooltipSettings: chartSettings.tooltipSettings || {},
        showLegend: chartSettings.showLegend !== undefined ? chartSettings.showLegend : true,
        interactiveLegend: chartSettings.interactiveLegend !== undefined ? chartSettings.interactiveLegend : true,
        legendPosition: chartSettings.legendPosition || 'top',
        responsive: chartSettings.responsive !== undefined ? chartSettings.responsive : true,
        maintainAspectRatio: chartSettings.maintainAspectRatio !== undefined ? chartSettings.maintainAspectRatio : true,
        showDataLabels: chartSettings.showDataLabels !== undefined ? chartSettings.showDataLabels : false,
        dataLabelPosition: chartSettings.dataLabelPosition || 'inside',
        dataLabelRotation: chartSettings.dataLabelRotation || 0,
        sortOrder: chartSettings.sortOrder || 'ascending',
    };
};

/**
 * Configuration for Average Teleop Score Chart
 */
export const averageTeleopScoreConfig = (scoutingData) => {
    const transformations = [
        { type: 'groupBy', key: 'teamNumber' },
        {
            type: 'aggregate',
            operations: [
                {
                    field: 'tsc', // Total score calculated as tsc + tamp
                    transform: (item) => item.tsc + item.tamps,
                    operation: 'average',
                    alias: 'averageScore',
                },
            ],
        },
    ];

    const chartSettings = {
        title: 'Tele-Op Average Notes By Team',
        scoringTypes: [
            {
                key: 'averageScore',
                label: 'Average Score',
                color: '#70dbed',
                name: 'Tele-Op Average Cycles',
            },
        ],
        showGridlines: true,
        gridlineColor: '#444444',
        xKey: 'teamNumber',
        yKey: 'averageScore',
        xAxisLabel: 'Team Number',
        yAxisLabel: 'Average Score',
        yAxisMin: 0,
        yAxisMax: 'auto',
        showTooltip: true,
        tooltipSettings: {
            backgroundColor: '#333333',
            borderRadius: '8px',
            fontSize: '0.875rem',
            cursorColor: 'rgba(255, 255, 255, 0.1)',
        },
        showLegend: true,
        interactiveLegend: true,
        legendPosition: 'top',
        responsive: true,
        maintainAspectRatio: true,
        showDataLabels: false,
        dataLabelPosition: 'inside',
        dataLabelRotation: 0,
    };

    return generateChartConfig(scoutingData, transformations, chartSettings);
};

/**
 * Configuration for Max Teleop Score Chart
 */
export const maxTeleopScoreConfig = (scoutingData) => {
    const transformations = [
        { type: 'groupBy', key: 'teamNumber' },
        {
            type: 'aggregate',
            operations: [
                {
                    field: 'tsc', // Total score calculated as tsc + tamp
                    transform: (item) => item.tsc + item.tamps,
                    operation: 'max',
                    alias: 'maxScore',
                },
            ],
        },
    ];

    const chartSettings = {
        title: 'Tele-Op Max Notes By Team',
        scoringTypes: [
            {
                key: 'maxScore',
                label: 'Max Score',
                color: '#f2495c',
                name: 'Tele-Op Max Cycles',
            },
        ],
        showGridlines: true,
        gridlineColor: '#444444',
        xKey: 'teamNumber',
        yKey: 'maxScore',
        xAxisLabel: 'Team Number',
        yAxisLabel: 'Max Score',
        yAxisMin: 0,
        yAxisMax: 'auto',
        showTooltip: true,
        tooltipSettings: {
            backgroundColor: '#333333',
            borderRadius: '8px',
            fontSize: '0.875rem',
            cursorColor: 'rgba(255, 255, 255, 0.1)',
        },
        showLegend: true,
        interactiveLegend: true,
        legendPosition: 'top',
        responsive: true,
        maintainAspectRatio: true,
        showDataLabels: false,
        dataLabelPosition: 'inside',
        dataLabelRotation: 0,
    };

    return generateChartConfig(scoutingData, transformations, chartSettings);
};

/**
 * Configuration for Average Match Score Chart
 */
export const averageMatchScoreConfig = (scoutingData) => {
    const transformations = [
        { type: 'groupBy', key: 'teamNumber' },
        {
            type: 'aggregate',
            operations: [
                {
                    field: 'tsc', // Total match score: tsc + tamp + ausc
                    transform: (item) => item.tsc + item.tamps + item.ausc,
                    operation: 'average',
                    alias: 'averageScore',
                },
            ],
        },
    ];

    const chartSettings = {
        title: 'Match Average Notes By Team',
        scoringTypes: [
            {
                key: 'averageScore',
                label: 'Average Score',
                color: '#3498db',
                name: 'Match Average Score',
            },
        ],
        showGridlines: true,
        gridlineColor: '#444444',
        xKey: 'teamNumber',
        yKey: 'averageScore',
        xAxisLabel: 'Team Number',
        yAxisLabel: 'Average Score',
        yAxisMin: 0,
        yAxisMax: 'auto',
        showTooltip: true,
        tooltipSettings: {
            backgroundColor: '#333333',
            borderRadius: '8px',
            fontSize: '0.875rem',
            cursorColor: 'rgba(255, 255, 255, 0.1)',
        },
        showLegend: true,
        interactiveLegend: true,
        legendPosition: 'top',
        responsive: true,
        maintainAspectRatio: true,
        showDataLabels: false,
        dataLabelPosition: 'inside',
        dataLabelRotation: 0,
    };

    return generateChartConfig(scoutingData, transformations, chartSettings);
};

/**
 * Configuration for Max Match Score Chart
 */
export const maxMatchScoreConfig = (scoutingData) => {
    const transformations = [
        { type: 'groupBy', key: 'teamNumber' },
        {
            type: 'aggregate',
            operations: [
                {
                    field: 'tsc', // Total match score: tsc + tamp + ausc
                    transform: (item) => item.tsc + item.tamps + item.ausc,
                    operation: 'max',
                    alias: 'maxScore',
                },
            ],
        },
    ];

    const chartSettings = {
        title: 'Match Max Notes By Team',
        scoringTypes: [
            {
                key: 'maxScore',
                label: 'Max Score',
                color: '#e74c3c',
                name: 'Match Max Score',
            },
        ],
        showGridlines: true,
        gridlineColor: '#444444',
        xKey: 'teamNumber',
        yKey: 'maxScore',
        xAxisLabel: 'Team Number',
        yAxisLabel: 'Max Score',
        yAxisMin: 0,
        yAxisMax: 'auto',
        showTooltip: true,
        tooltipSettings: {
            backgroundColor: '#333333',
            borderRadius: '8px',
            fontSize: '0.875rem',
            cursorColor: 'rgba(255, 255, 255, 0.1)',
        },
        showLegend: true,
        interactiveLegend: true,
        legendPosition: 'top',
        responsive: true,
        maintainAspectRatio: true,
        showDataLabels: false,
        dataLabelPosition: 'inside',
        dataLabelRotation: 0,
    };

    return generateChartConfig(scoutingData, transformations, chartSettings);
};

/**
 * Configuration for Average Autonomous Score Chart
 */
export const averageAutonomousScoreConfig = (scoutingData) => {
    const transformations = [
        { type: 'groupBy', key: 'teamNumber' },
        {
            type: 'aggregate',
            operations: [
                {
                    field: 'ausc', // Autonomous score
                    operation: 'average',
                    alias: 'averageScore',
                },
            ],
        },
    ];

    const chartSettings = {
        title: 'Autonomous Average Notes By Team',
        scoringTypes: [
            {
                key: 'averageScore',
                label: 'Average Score',
                color: '#8ab8ff',
                name: 'Autonomous Average Score',
            },
        ],
        showGridlines: true,
        gridlineColor: '#444444',
        xKey: 'teamNumber',
        yKey: 'averageScore',
        xAxisLabel: 'Team Number',
        yAxisLabel: 'Average Score',
        yAxisMin: 0,
        yAxisMax: 'auto',
        showTooltip: true,
        tooltipSettings: {
            backgroundColor: '#333333',
            borderRadius: '8px',
            fontSize: '0.875rem',
            cursorColor: 'rgba(255, 255, 255, 0.1)',
        },
        showLegend: true,
        interactiveLegend: true,
        legendPosition: 'top',
        responsive: true,
        maintainAspectRatio: true,
        showDataLabels: false,
        dataLabelPosition: 'inside',
        dataLabelRotation: 0,
    };

    return generateChartConfig(scoutingData, transformations, chartSettings);
};

/**
 * Configuration for Max Autonomous Score Chart
 */
export const maxAutonomousScoreConfig = (scoutingData) => {
    const transformations = [
        { type: 'groupBy', key: 'teamNumber' },
        {
            type: 'aggregate',
            operations: [
                {
                    field: 'ausc', // Autonomous score
                    operation: 'max',
                    alias: 'maxScore',
                },
            ],
        },
    ];

    const chartSettings = {
        title: 'Autonomous Max Notes By Team',
        scoringTypes: [
            {
                key: 'maxScore',
                label: 'Max Score',
                color: '#fa6400',
                name: 'Autonomous Max Score',
            },
        ],
        showGridlines: true,
        gridlineColor: '#444444',
        xKey: 'teamNumber',
        yKey: 'maxScore',
        xAxisLabel: 'Team Number',
        yAxisLabel: 'Max Score',
        yAxisMin: 0,
        yAxisMax: 'auto',
        showTooltip: true,
        tooltipSettings: {
            backgroundColor: '#333333',
            borderRadius: '8px',
            fontSize: '0.875rem',
            cursorColor: 'rgba(255, 255, 255, 0.1)',
        },
        showLegend: true,
        interactiveLegend: true,
        legendPosition: 'top',
        responsive: true,
        maintainAspectRatio: true,
        showDataLabels: false,
        dataLabelPosition: 'inside',
        dataLabelRotation: 0,
    };

    return generateChartConfig(scoutingData, transformations, chartSettings);
};

/**
 * Configuration for Average Autonomous Moved Score Chart
 */
export const averageAutonomousMovedConfig = (scoutingData) => {
    const transformations = [
        { type: 'groupBy', key: 'teamNumber' },
        {
            type: 'aggregate',
            operations: [
                {
                    field: 'Mved',
                    transform: (item) => (item.Mved ? 1 : 0),
                    operation: 'average',
                    alias: 'averageScore',
                },
            ],
        },
    ];

    const chartSettings = {
        title: 'Autonomous Moved Average Notes By Team',
        scoringTypes: [
            {
                key: 'averageScore',
                label: 'Average Score',
                color: '#fade2a',
                name: 'Autonomous Moved Average Score',
            },
        ],
        showGridlines: true,
        gridlineColor: '#444444',
        xKey: 'teamNumber',
        yKey: 'averageScore',
        xAxisLabel: 'Team Number',
        yAxisLabel: 'Average Score',
        yAxisMin: 0,
        yAxisMax: 'auto',
        showTooltip: true,
        tooltipSettings: {
            backgroundColor: '#333333',
            borderRadius: '8px',
            fontSize: '0.875rem',
            cursorColor: 'rgba(255, 255, 255, 0.1)',
        },
        showLegend: true,
        interactiveLegend: true,
        legendPosition: 'top',
        responsive: true,
        maintainAspectRatio: true,
        showDataLabels: false,
        dataLabelPosition: 'inside',
        dataLabelRotation: 0,
    };

    return generateChartConfig(scoutingData, transformations, chartSettings);
};

/**
 * Configuration for Average Autonomous Foul Score Chart
 */
export const averageAutonomousFoulConfig = (scoutingData) => {
    const transformations = [
        { type: 'groupBy', key: 'teamNumber' },
        {
            type: 'aggregate',
            operations: [
                {
                    field: 'auf', // Autonomous foul score
                    operation: 'average',
                    alias: 'averageScore',
                },
            ],
        },
    ];

    const chartSettings = {
        title: 'Autonomous Foul Average By Team',
        scoringTypes: [
            {
                key: 'averageScore',
                label: 'Average Score',
                color: '#ff0000',
                name: 'Autonomous Foul Average Score',
            },
        ],
        showGridlines: true,
        gridlineColor: '#444444',
        xKey: 'teamNumber',
        yKey: 'averageScore',
        xAxisLabel: 'Team Number',
        yAxisLabel: 'Average Score',
        yAxisMin: 0,
        yAxisMax: 'auto',
        showTooltip: true,
        tooltipSettings: {
            backgroundColor: '#333333',
            borderRadius: '8px',
            fontSize: '0.875rem',
            cursorColor: 'rgba(255, 255, 255, 0.1)',
        },
        showLegend: true,
        interactiveLegend: true,
        legendPosition: 'top',
        responsive: true,
        maintainAspectRatio: true,
        showDataLabels: false,
        dataLabelPosition: 'inside',
        dataLabelRotation: 0,
    };

    return generateChartConfig(scoutingData, transformations, chartSettings);
};

/**
 * Configuration for Max Autonomous Foul Score Chart
 */
export const maxAutonomousFoulConfig = (scoutingData) => {
    const transformations = [
        { type: 'groupBy', key: 'teamNumber' },
        {
            type: 'aggregate',
            operations: [
                {
                    field: 'auf', // Autonomous foul score
                    operation: 'max',
                    alias: 'maxScore',
                },
            ],
        },
    ];

    const chartSettings = {
        title: 'Autonomous Foul Max By Team',
        scoringTypes: [
            {
                key: 'maxScore',
                label: 'Max Score',
                color: '#ff0000',
                name: 'Autonomous Foul Max Score',
            },
        ],
        showGridlines: true,
        gridlineColor: '#444444',
        xKey: 'teamNumber',
        yKey: 'maxScore',
        xAxisLabel: 'Team Number',
        yAxisLabel: 'Max Score',
        yAxisMin: 0,
        yAxisMax: 'auto',
        showTooltip: true,
        tooltipSettings: {
            backgroundColor: '#333333',
            borderRadius: '8px',
            fontSize: '0.875rem',
            cursorColor: 'rgba(255, 255, 255, 0.1)',
        },
        showLegend: true,
        interactiveLegend: true,
        legendPosition: 'top',
        responsive: true,
        maintainAspectRatio: true,
        showDataLabels: false,
        dataLabelPosition: 'inside',
        dataLabelRotation: 0,
    };

    return generateChartConfig(scoutingData, transformations, chartSettings);
};

/**
 * Configuration for Autonomous Speaker Accuracy Average Score Chart
 */
export const averageAutonomousSpeakerAccuracyConfig = (scoutingData) => {
    const transformations = [
        { type: 'groupBy', key: 'teamNumber' },
        {
            type: 'aggregate',
            operations: [
                {
                    field: 'ausc', // Successful autonomous speaker
                    transform: (item) => {
                        const attempts = item.ausc + item.auskpm;
                        return attempts > 0 ? item.ausc / attempts : 0;
                    },
                    operation: 'average',
                    alias: 'averageScore',
                },
            ],
        },
    ];

    const chartSettings = {
        title: 'Autonomous Speaker Accuracy Average Notes By Team',
        scoringTypes: [
            {
                key: 'averageScore',
                label: 'Average Accuracy (%)',
                color: '#ff0000',
                name: 'Autonomous Speaker Percent In',
            },
        ],
        showGridlines: true,
        gridlineColor: '#444444',
        xKey: 'teamNumber',
        yKey: 'averageScore',
        xAxisLabel: 'Team Number',
        yAxisLabel: 'Average Accuracy (%)',
        yAxisMin: 0,
        yAxisMax: 'auto',
        showTooltip: true,
        tooltipSettings: {
            backgroundColor: '#333333',
            borderRadius: '8px',
            fontSize: '0.875rem',
            cursorColor: 'rgba(255, 255, 255, 0.1)',
        },
        showLegend: true,
        interactiveLegend: true,
        legendPosition: 'top',
        responsive: true,
        maintainAspectRatio: true,
        showDataLabels: false,
        dataLabelPosition: 'inside',
        dataLabelRotation: 0,
    };

    return generateChartConfig(scoutingData, transformations, chartSettings);
};

/**
 * Configuration for Teleop Speaker Average Score Chart
 */
export const averageTeleopSpeakerByTeamConfig = (scoutingData) => {
    const transformations = [
        { type: 'groupBy', key: 'teamNumber' },
        {
            type: 'aggregate',
            operations: [
                {
                    field: 'tsc', // Teleop speaker score
                    operation: 'average',
                    alias: 'averageScore',
                },
            ],
        },
    ];

    const chartSettings = {
        title: 'Teleop Speaker Average By Team',
        scoringTypes: [
            {
                key: 'averageScore',
                label: 'Average Score',
                color: '#b877d9',
                name: 'Teleop Speaker Average',
            },
        ],
        showGridlines: true,
        gridlineColor: '#444444',
        xKey: 'teamNumber',
        yKey: 'averageScore',
        xAxisLabel: 'Team Number',
        yAxisLabel: 'Average Score',
        yAxisMin: 0,
        yAxisMax: 'auto',
        showTooltip: true,
        tooltipSettings: {
            backgroundColor: '#333333',
            borderRadius: '8px',
            fontSize: '0.875rem',
            cursorColor: 'rgba(255, 255, 255, 0.1)',
        },
        showLegend: true,
        interactiveLegend: true,
        legendPosition: 'top',
        responsive: true,
        maintainAspectRatio: true,
        showDataLabels: false,
        dataLabelPosition: 'inside',
        dataLabelRotation: 0,
    };

    return generateChartConfig(scoutingData, transformations, chartSettings);
};

/**
 * Configuration for Teleop Speaker Max Score Chart
 */
export const maxTeleopSpeakerByTeamConfig = (scoutingData) => {
    const transformations = [
        { type: 'groupBy', key: 'teamNumber' },
        {
            type: 'aggregate',
            operations: [
                {
                    field: 'tsc', // Teleop speaker score
                    operation: 'max',
                    alias: 'maxScore',
                },
            ],
        },
    ];

    const chartSettings = {
        title: 'Teleop Speaker Max By Team',
        scoringTypes: [
            {
                key: 'maxScore',
                label: 'Max Score',
                color: '#f9934e',
                name: 'Teleop Speaker Max',
            },
        ],
        showGridlines: true,
        gridlineColor: '#444444',
        xKey: 'teamNumber',
        yKey: 'maxScore',
        xAxisLabel: 'Team Number',
        yAxisLabel: 'Max Score',
        yAxisMin: 0,
        yAxisMax: 'auto',
        showTooltip: true,
        tooltipSettings: {
            backgroundColor: '#333333',
            borderRadius: '8px',
            fontSize: '0.875rem',
            cursorColor: 'rgba(255, 255, 255, 0.1)',
        },
        showLegend: true,
        interactiveLegend: true,
        legendPosition: 'top',
        responsive: true,
        maintainAspectRatio: true,
        showDataLabels: false,
        dataLabelPosition: 'inside',
        dataLabelRotation: 0,
    };

    return generateChartConfig(scoutingData, transformations, chartSettings);
};

/**
 * Configuration for Teleop Amp Average Score Chart
 */
export const averageTeleopAmpByTeamConfig = (scoutingData) => {
    const transformations = [
        { type: 'groupBy', key: 'teamNumber' },
        {
            type: 'aggregate',
            operations: [
                {
                    field: 'tamps', // Teleop amp score
                    operation: 'average',
                    alias: 'averageScore',
                },
            ],
        },
    ];

    const chartSettings = {
        title: 'Teleop Amp Average By Team',
        scoringTypes: [
            {
                key: 'averageScore',
                label: 'Average Score',
                color: '#fa6400',
                name: 'Teleop Amp Average',
            },
        ],
        showGridlines: true,
        gridlineColor: '#444444',
        xKey: 'teamNumber',
        yKey: 'averageScore',
        xAxisLabel: 'Team Number',
        yAxisLabel: 'Average Score',
        yAxisMin: 0,
        yAxisMax: 'auto',
        showTooltip: true,
        tooltipSettings: {
            backgroundColor: '#333333',
            borderRadius: '8px',
            fontSize: '0.875rem',
            cursorColor: 'rgba(255, 255, 255, 0.1)',
        },
        showLegend: true,
        interactiveLegend: true,
        legendPosition: 'top',
        responsive: true,
        maintainAspectRatio: true,
        showDataLabels: false,
        dataLabelPosition: 'inside',
        dataLabelRotation: 0,
    };

    return generateChartConfig(scoutingData, transformations, chartSettings);
};

/**
 * Configuration for Teleop Amp Max Score Chart
 */
export const maxTeleopAmpByTeamConfig = (scoutingData) => {
    const transformations = [
        { type: 'groupBy', key: 'teamNumber' },
        {
            type: 'aggregate',
            operations: [
                {
                    field: 'tamps', // Teleop amp score
                    operation: 'max',
                    alias: 'maxScore',
                },
            ],
        },
    ];

    const chartSettings = {
        title: 'Teleop Amp Max By Team',
        scoringTypes: [
            {
                key: 'maxScore',
                label: 'Max Score',
                color: '#8ab8ff',
                name: 'Teleop Amp Max',
            },
        ],
        showGridlines: true,
        gridlineColor: '#444444',
        xKey: 'teamNumber',
        yKey: 'maxScore',
        xAxisLabel: 'Team Number',
        yAxisLabel: 'Max Score',
        yAxisMin: 0,
        yAxisMax: 'auto',
        showTooltip: true,
        tooltipSettings: {
            backgroundColor: '#333333',
            borderRadius: '8px',
            fontSize: '0.875rem',
            cursorColor: 'rgba(255, 255, 255, 0.1)',
        },
        showLegend: true,
        interactiveLegend: true,
        legendPosition: 'top',
        responsive: true,
        maintainAspectRatio: true,
        showDataLabels: false,
        dataLabelPosition: 'inside',
        dataLabelRotation: 0,
    };

    return generateChartConfig(scoutingData, transformations, chartSettings);
};

/**
 * Configuration for Teleop Speaker Accuracy Percentage Chart
 */
export const teleopSpeakerPercentInByTeamConfig = (scoutingData) => {
    const transformations = [
        { type: 'groupBy', key: 'teamNumber' },
        {
            type: 'aggregate',
            operations: [
                {
                    field: 'tsc', // Teleop speaker made
                    transform: (item) => {
                        const attempts = (item.tsc || 0) + (item.tsm || 0);
                        return attempts > 0 ? (item.tsc / attempts) * 100 : 0;
                    },
                    operation: 'average',
                    alias: 'averageScore',
                },
            ],
        },
    ];

    const chartSettings = {
        title: 'Teleop Speaker Percent In By Team',
        scoringTypes: [
            {
                key: 'averageScore',
                label: 'Average Accuracy (%)',
                color: '#65fe65',
                name: 'Teleop Speaker Percent In',
            },
        ],
        showGridlines: true,
        gridlineColor: '#444444',
        xKey: 'teamNumber',
        yKey: 'averageScore',
        xAxisLabel: 'Team Number',
        yAxisLabel: 'Average Accuracy (%)',
        yAxisMin: 0,
        yAxisMax: 'auto',
        showTooltip: true,
        tooltipSettings: {
            backgroundColor: '#333333',
            borderRadius: '8px',
            fontSize: '0.875rem',
            cursorColor: 'rgba(255, 255, 255, 0.1)',
        },
        showLegend: true,
        interactiveLegend: true,
        legendPosition: 'top',
        responsive: true,
        maintainAspectRatio: true,
        showDataLabels: false,
        dataLabelPosition: 'inside',
        dataLabelRotation: 0,
    };

    return generateChartConfig(scoutingData, transformations, chartSettings);
};

/**
 * Configuration for Teleop Amp Accuracy Percentage Chart
 */
export const teleopAmpPercentInByTeamConfig = (scoutingData) => {
    const transformations = [
        { type: 'groupBy', key: 'teamNumber' },
        {
            type: 'aggregate',
            operations: [
                {
                    field: 'tamps', // Teleop amp made
                    transform: (item) => {
                        const attempts = (item.tamps || 0) + (item.tampm || 0);
                        return attempts > 0 ? (item.tamps / attempts) * 100 : 0;
                    },
                    operation: 'average',
                    alias: 'averageScore',
                },
            ],
        },
    ];

    const chartSettings = {
        title: 'Teleop Amp Percent In By Team',
        scoringTypes: [
            {
                key: 'averageScore',
                label: 'Average Accuracy (%)',
                color: '#97fa97',
                name: 'Teleop Amp Percent In',
            },
        ],
        showGridlines: true,
        gridlineColor: '#444444',
        xKey: 'teamNumber',
        yKey: 'averageScore',
        xAxisLabel: 'Team Number',
        yAxisLabel: 'Average Accuracy (%)',
        yAxisMin: 0,
        yAxisMax: 'auto',
        showTooltip: true,
        tooltipSettings: {
            backgroundColor: '#333333',
            borderRadius: '8px',
            fontSize: '0.875rem',
            cursorColor: 'rgba(255, 255, 255, 0.1)',
        },
        showLegend: true,
        interactiveLegend: true,
        legendPosition: 'top',
        responsive: true,
        maintainAspectRatio: true,
        showDataLabels: false,
        dataLabelPosition: 'inside',
        dataLabelRotation: 0,
    };

    return generateChartConfig(scoutingData, transformations, chartSettings);
};

/**
 * Configuration for Endgame Trap Average Score Chart
 */
export const averageEndgameTrapByTeamConfig = (scoutingData) => {
    const transformations = [
        { type: 'groupBy', key: 'teamNumber' },
        {
            type: 'aggregate',
            operations: [
                {
                    field: 'cn', // Endgame trap score
                    operation: 'average',
                    alias: 'averageScore',
                },
            ],
        },
        {
            type: 'sort',
            key: 'averageScore',
            order: 'desc',
        },
    ];

    const chartSettings = {
        title: 'Endgame Trap Average By Team',
        scoringTypes: [
            {
                key: 'averageScore',
                label: 'Average Score',
                color: '#f2495c',
                name: 'Trap Average',
            },
        ],
        showGridlines: true,
        gridlineColor: '#444444',
        xKey: 'teamNumber',
        yKey: 'averageScore',
        xAxisLabel: 'Team Number',
        yAxisLabel: 'Average Score',
        yAxisMin: 0,
        yAxisMax: 1,
        showTooltip: true,
        tooltipSettings: {
            backgroundColor: '#333333',
            borderRadius: '8px',
            fontSize: '0.875rem',
            cursorColor: 'rgba(255, 255, 255, 0.1)',
        },
        showLegend: true,
        interactiveLegend: true,
        legendPosition: 'top',
        responsive: true,
        maintainAspectRatio: true,
        showDataLabels: false,
        dataLabelPosition: 'inside',
        dataLabelRotation: 0,
    };

    return generateChartConfig(scoutingData, transformations, chartSettings);
};

/**
 * Configuration for Endgame Climb Percent By Team Chart
 */
export const endgameClimbPercentByTeamConfig = (scoutingData) => {
    const transformations = [
        { type: 'groupBy', key: 'teamNumber' },
        {
            type: 'aggregate',
            operations: [
                {
                    field: 'epo',
                    operation: 'count',
                    alias: 'Hm',
                    transform: (item) => (item.epo === 'Hm' ? 1 : 0),
                },
                {
                    field: 'epo',
                    operation: 'count',
                    alias: 'Fh',
                    transform: (item) => (item.epo === 'Fh' ? 1 : 0),
                },
                {
                    field: 'epo',
                    operation: 'count',
                    alias: 'Os',
                    transform: (item) => (item.epo === 'Os' ? 1 : 0),
                },
                {
                    field: 'epo',
                    operation: 'count',
                    alias: 'Fo',
                    transform: (item) => (item.epo === 'Fo' ? 1 : 0),
                },
                {
                    field: 'epo',
                    operation: 'count',
                    alias: 'P',
                    transform: (item) => (item.epo === 'P' ? 1 : 0),
                },
                {
                    field: 'epo',
                    operation: 'count',
                    alias: 'No',
                    transform: (item) => (item.epo === 'No' ? 1 : 0),
                },
                {
                    field: 'epo',
                    operation: 'count',
                    alias: 'total', // Total climbs per team
                    transform: () => 1, // Each entry counts as 1
                },
            ],
        },
        {
            type: 'map',
            func: (team) => {
                const keys = ['Hm', 'Fh', 'Os', 'Fo', 'P', 'No']; // Desired order
                keys.forEach((key) => {
                    team[key] = team.total > 0 ? Math.round((team[key] / team.total) * 100 * 100) / 100 : 0;
                });
                delete team.total; // Remove the total as it's no longer needed
                return team;
            },
        },
    ];

    const chartSettings = {
        title: 'Endgame Climb Percent By Team',
        scoringTypes: [
            {
                key: 'Hm',
                label: 'Harmony',
                color: '#8884d8',
                stacked: true,
                name: 'Harmony',
            },
            {
                key: 'Fh',
                label: 'Failed Harmony',
                color: '#fff258',
                stacked: true,
                name: 'Failed Harmony',
            },
            {
                key: 'Os',
                label: 'Onstage',
                color: '#82ca9d',
                stacked: true,
                name: 'Onstage',
            },
            {
                key: 'Fo',
                label: 'Failed Climb',
                color: '#ffc658',
                stacked: true,
                name: 'Failed Climb',
            },
            {
                key: 'P',
                label: 'Parked',
                color: '#ff8042',
                stacked: true,
                name: 'Parked',
            },
            {
                key: 'No',
                label: 'No Climb',
                color: '#ff4444',
                stacked: true,
                name: 'No Climb',
            },
        ],
        showGridlines: true,
        gridlineColor: '#444444',
        xKey: 'teamNumber',
        yKey: 'Hm', // Base key for stacked bar (first in order)
        xAxisLabel: 'Team Number',
        yAxisLabel: 'Percentage',
        yAxisMin: 0,
        yAxisMax: 100,
        showTooltip: true,
        tooltipSettings: {
            backgroundColor: '#333333',
            borderRadius: '8px',
            fontSize: '0.875rem',
            cursorColor: 'rgba(255, 255, 255, 0.1)',
        },
        showLegend: true,
        interactiveLegend: true,
        legendPosition: 'top',
        responsive: true,
        maintainAspectRatio: true,
        showDataLabels: false,
        dataLabelPosition: 'inside',
        dataLabelRotation: 0,
        sortOrder: 'ascending',
    };

    return generateChartConfig(scoutingData, transformations, chartSettings);
};

/**
 * Configuration for Competition Multi Number Chart
 */
export const competitionMultiNumberConfig = (scoutingData) => {
    // Calculate required metrics separately as they are not straightforward aggregations
    const speakerTeleOpAverage = calculateAverage(
        scoutingData.map((item) => item.tsc || 0)
    );
    const speakerTeleOpMax = calculateMax(scoutingData.map((item) => item.tsc || 0));

    const ampTeleOpAverage = calculateAverage(
        scoutingData.map((item) => item.tamps || 0)
    );
    const ampTeleOpMax = calculateMax(scoutingData.map((item) => item.tamps || 0));

    const speakerTeleOpAccuracyAverage = calculateAverage(
        scoutingData.map((item) => {
            const attempts = (item.tsc || 0) + (item.tsm || 0);
            return attempts > 0 ? (item.tsc / attempts) * 100 : 0;
        })
    );
    const speakerTeleOpAccuracyMax = calculateMax(
        scoutingData.map((item) => {
            const attempts = (item.tsc || 0) + (item.tsm || 0);
            return attempts > 0 ? (item.tsc / attempts) * 100 : 0;
        })
    );

    const ampTeleOpAccuracyAverage = calculateAverage(
        scoutingData.map((item) => {
            const attempts = (item.tamps || 0) + (item.tampm || 0);
            return attempts > 0 ? (item.tamps / attempts) * 100 : 0;
        })
    );
    const ampTeleOpAccuracyMax = calculateMax(
        scoutingData.map((item) => {
            const attempts = (item.tamps || 0) + (item.tampm || 0);
            return attempts > 0 ? (item.tamps / attempts) * 100 : 0;
        })
    );


    const chartSettings = {
        title: 'Competition Tele-Op Stats',
        scoringTypes: [], // Not used in this chart
        showGridlines: false,
        gridlineColor: '#444444',
    };

    const data = [
        {
            color: '#73bf69',
            title: 'Average TeleOp Speaker / Max',
            min: 0,
            max: Math.round(speakerTeleOpMax * 100) / 100,
            value: Math.round(speakerTeleOpAverage * 100) / 100,
        },
        {
            color: '#ffab40',
            title: 'Average TeleOp Amp / Max',
            min: 0,
            max: Math.round(ampTeleOpMax * 100) / 100,
            value: Math.round(ampTeleOpAverage * 100) / 100,
        },
        {
            color: '#40c4ff',
            title: 'Average Speaker Accuracy / Max',
            min: 0,
            max: Math.round(speakerTeleOpAccuracyMax * 100) / 100,
            value: Math.round(speakerTeleOpAccuracyAverage * 100) / 100,
        },
        {
            color: '#c4162a',
            title: 'Average Amp Accuracy / Max',
            min: 0,
            max: Math.round(ampTeleOpAccuracyMax * 100) / 100,
            value: Math.round(ampTeleOpAccuracyAverage * 100) / 100,
        },
    ];

    return {
        mainTitle: chartSettings.title,
        values: data,
    };
};

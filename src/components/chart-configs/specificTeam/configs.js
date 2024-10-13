import * as specificTeamFunctions from './functions.js';
import * as allTeamsFunctions from '../allTeams/functions.js';

export const matchScoreByRoundConfig = (scoutingData, teamNumber) => {
    return {
        data: specificTeamFunctions.matchScoreByRound(scoutingData, teamNumber),  
        title: `Match Scores by Round for Team ${teamNumber}`,
        scoringTypes: [
            {
                key: 'totalScore',
                label: 'Total Score',
                color: '#c4162a',
                name: 'Round Score',
            },
        ],
        chartSettings: {
            showGridlines: true,
            gridlineColor: '#444444',
        },
        xKey: 'roundNumber', 
        yKey: 'totalScore',
        xAxisLabel: 'Round Number',
        sortDataBy: 'xKey',
        yAxisLabel: 'Total Score',
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
        showDataLabels: true,
        dataLabelPosition: 'inside',
        dataLabelRotation: 0,
        sortOrder: 'ascending',
        xAxisLabelRotation: 0,
        xAxisSettings: {
            tickRotation: 0,  
            tickSize: 5,
            tickPadding: 10,
        },
    };
};

export const averageScoreConfig = (scoutingData, teamNumber) => {
    const averageScore = specificTeamFunctions.averageScore(scoutingData, teamNumber);
  
    return {
      color: '#c4162a',  
      title: `Average Score for Team ${teamNumber}`,
      min: 0, 
      max: specificTeamFunctions.maxScore(scoutingData, teamNumber), 
      value: Math.round(averageScore * 100) / 100,  
    };
};

export const autonomousSpeakerConfig = (scoutingData, teamNumber) => { 
    return {
        data: specificTeamFunctions.autonomousSpeakerPerMatch(scoutingData, teamNumber),  
        title: `Autonomous Speaker by Round for Team ${teamNumber}`,
        scoringTypes: [
            {
                key: 'autonomousScore', 
                label: 'Autonomous Speaker',
                color: '#73bf69',
                name: 'Round Score',
            },
        ],
        chartSettings: {
            showGridlines: true,
            gridlineColor: '#444444',
        },
        xKey: 'roundNumber', 
        yKey: 'autonomousScore',  
        xAxisLabel: 'Round Number',
        sortDataBy: 'xKey',
        yAxisLabel: 'Autonomous Speaker',
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
        showDataLabels: true,
        dataLabelPosition: 'inside',
        dataLabelRotation: 0,
        xAxisLabelRotation: 0,
        sortOrder: 'ascending',
        xAxisSettings: {
            tickRotation: 0,  
            tickSize: 5,
            tickPadding: 10,
        },
    };
};

export const averageAutoSpeakerConfig = (scoutingData, teamNumber) => {
    const averageAutoSpeaker = specificTeamFunctions.averageAutoSpeaker(scoutingData, teamNumber);
  
    return {
      color: '#73bf69',  
      title: `Average Autonomous Speaker for Team ${teamNumber}`,
      min: 0, 
      max: specificTeamFunctions.maxAutoSpeaker(scoutingData, teamNumber), 
      value: Math.round(averageAutoSpeaker * 100) / 100,  
    };
};

export const autoHasMovedConfig = (scoutingData, teamNumber) => {
    return {
        data: specificTeamFunctions.autoHasMovedPerRound(scoutingData, teamNumber),  
        title: `Auto Has Moved by Round for Team ${teamNumber}`,
        scoringTypes: [
            {
                key: 'hasMoved',  
                label: 'Auto Has Moved',
                color: '#82b5d8',
                name: 'Round Score',
            },
        ],
        chartSettings: {
            showGridlines: true,
            gridlineColor: '#444444',
        },
        xKey: 'roundNumber', 
        yKey: 'hasMoved',  
        xAxisLabel: 'Round Number',
        sortDataBy: 'xKey',
        yAxisLabel: 'Auto Has Moved',
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
        showDataLabels: true,
        dataLabelPosition: 'inside',
        dataLabelRotation: 0,
        sortOrder: 'ascending',
        xAxisLabelRotation: 0,
        xAxisSettings: {
            tickRotation: 0,  
            tickSize: 5,
            tickPadding: 10,
        },
    };
}

export const autoFoulPerRoundConfig = (scoutingData, teamNumber) => {
    return {
        data: specificTeamFunctions.autonomousFoulPerMatch(scoutingData, teamNumber),
        title: `Auto Fouls by Round for Team ${teamNumber}`,
        scoringTypes: [
            {
                key: 'autonomousScore',
                label: 'Auto Fouls',
                color: '#ff4444',
                name: 'Round Score',
            },
        ],
        chartSettings: {
            showGridlines: true,
            gridlineColor: '#444444',
        },
        xKey: 'roundNumber',
        yKey: 'autonomousScore', 
        xAxisLabel: 'Round Number',
        sortDataBy: 'xKey',
        yAxisLabel: 'Auto Fouls',
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
        showDataLabels: true,
        dataLabelPosition: 'inside',
        dataLabelRotation: 0,
        sortOrder: 'ascending',
        xAxisLabelRotation: 0,
        xAxisSettings: {
            tickRotation: 0,
            tickSize: 5,
            tickPadding: 10,
        },
    };
};

export const autoPathPerRoundConfig = (scoutingData, teamNumber) => ({
    data: specificTeamFunctions.autoPathStackedData(scoutingData, teamNumber),
    title: `Autonomous Path by Round for Team ${teamNumber}`,
    scoringTypes: [
        {
            key: 'Path1',
            label: 'Path 1',
            color: '#8884d8',
            stacked: true,
            name: 'Speaker 3 (Source Side)',  // Provide descriptive name if needed
        },
        {
            key: 'Path2',
            label: 'Path 2',
            color: '#82ca9d',
            stacked: true,
            name: 'Speaker 2 (Middle)',
        },
        {
            key: 'Path3',
            label: 'Path 3',
            color: '#ff4444',
            stacked: true,
            name: 'Speaker 1 (Amp Side)',
        },
        {
            key: 'Path4',
            label: 'Path 4',
            color: '#ffc658',
            stacked: true,
            name: 'Midline 5 (Source Edge)',
        },
        {
            key: 'Path5',
            label: 'Path 5',
            color: '#ff8042',
            stacked: true,
            name: 'Midline 4',
        },
        {
            key: 'Path6',
            label: 'Path 6',
            color: '#73bf69',
            stacked: true,
            name: 'Midline 3 (Middle)',
        },
        {
            key: 'Path7',
            label: 'Path 7',
            color: '#a4de6c',
            stacked: true,
            name: 'Midline 2',
        },
        {
            key: 'Path8',
            label: 'Path 8',
            color: '#d0ed57',
            stacked: true,
            name: 'Midline 1 (Amp Edge)',
        },
        {
            key: 'Path9',
            label: 'Path 9',
            color: '#82b5d8',
            stacked: true,
            name: 'Other',
        },
        {
            key: 'Path10',
            label: 'Path 10',
            color: '#c4162a',
            stacked: true,
            name: "Didn't Move",
        }
    ],
    chartSettings: {
        showGridlines: true,
        gridlineColor: '#444444',
    },
    xKey: 'roundNumber',
    yAxisLabel: 'Autonomous Path Taken',
    yAxisMin: 0,
    yAxisMax: 1,  
    xAxisLabel: 'Round Number',
    xAxisLabelRotation: 0,
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
    sortOrder: 'ascending',
});

export const actualVsExpectedConfig = (scoutingData, teamNumber) => ({
    data: specificTeamFunctions.actualVsExpectedData(scoutingData, teamNumber),
    title: `Actual vs. Expected Autonomous Scores for Team ${teamNumber}`,
    scoringTypes: [
        {
            key: 'actualScore',
            label: 'Actual Score',
            color: '#73bf69',
            name: 'Actual Score',
        },
        {
            key: 'expectedScore',
            label: 'Expected Score',
            color: '#ff8042',
            name: 'Expected Score',
        },
        {
            key: 'deviation',
            label: 'Deviation',
            color: '#ff4444',
            name: 'Score Deviation',
        },
    ],
    chartSettings: {
        showGridlines: true,
        gridlineColor: '#444444',
    },
    xKey: 'roundNumber',
    yAxisLabel: 'Score',
    yAxisMin: 'auto',
    yAxisMax: 'auto',  
    xAxisLabel: 'Round Number',
    xAxisLabelRotation: 0,
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
    showDataLabels: true,
    dataLabelPosition: 'inside',
    dataLabelRotation: 0,
    sortOrder: 'ascending',
});

export const autoPathUsagePieConfig = (scoutingData, teamNumber) => ({
    data: specificTeamFunctions.autoPathPieData(scoutingData, teamNumber),
    title: `Autonomous Path Usage Percentages for Team ${teamNumber}`,
    scoringTypes: [
        {
            key: 'Path1',
            label: 'Path 1',
            color: '#8884d8',
            name: 'Speaker 3 (Source Side)',
        },
        {
            key: 'Path2',
            label: 'Path 2',
            color: '#82ca9d',
            name: 'Speaker 2 (Middle)',
        },
        {
            key: 'Path3',
            label: 'Path 3',
            color: '#ff4444',
            name: 'Speaker 1 (Amp Side)',
        },
        {
            key: 'Path4',
            label: 'Path 4',
            color: '#ffc658',
            name: 'Midline 5 (Source Edge)',
        },
        {
            key: 'Path5',
            label: 'Path 5',
            color: '#ff8042',
            name: 'Midline 4',
        },
        {
            key: 'Path6',
            label: 'Path 6',
            color: '#73bf69',
            name: 'Midline 3 (Middle)',
        },
        {
            key: 'Path7',
            label: 'Path 7',
            color: '#a4de6c',
            name: 'Midline 2',
        },
        {
            key: 'Path8',
            label: 'Path 8',
            color: '#d0ed57',
            name: 'Midline 1 (Amp Edge)',
        },
        {
            key: 'Path9',
            label: 'Path 9',
            color: '#82b5d8',
            name: 'Other',
        },
        {
            key: 'Path10',
            label: 'Path 10',
            color: '#c4162a',
            name: "Didn't Move",
        }
    ],
    chartSettings: {
        showTooltip: true,
        tooltipSettings: {
            backgroundColor: '#333333',
            borderRadius: '8px',
            fontSize: '0.875rem',
            textColor: '#ffffff',
            cursorColor: 'rgba(255, 255, 255, 0.1)',
        },
        showLegend: true,
        legendPosition: 'top',
        legendLayout: 'horizontal', 
        maintainAspectRatio: true,
        colors: [
            '#8884d8', '#82ca9d', '#ff4444', '#ffc658', 
            '#ff8042', '#73bf69', '#a4de6c', '#d0ed57',
            '#82b5d8', '#c4162a'
        ],
        showLabels: true,
        labelPosition: 'outside',
    },
    responsive: true,
});

export const commentsPerTeamTableConfig = (scoutingData, teamNumber) => {
    return {
        data: specificTeamFunctions.generalPerTeamTable(scoutingData, teamNumber),
        title: `General data for Team ${teamNumber}`,
        columns: [
            {
                key: 'submissionTime',
                label: 'Submission Time',
            },
            {
                key: 'matchNumber',
                label: 'Match Number',
            },
            {
                key: 'scouter',
                label: 'Scouter Name',
            },
            {
                key: 'comment',
                label: 'Comments',
            },
            {
                key: 'card',
                label: 'Card',
            },
            {
                key: 'showedUp',
                label: 'Showed Up',
            },
            {
                key: 'diedOrTippedOver',
                label: 'Died/Tipped Over',
            },
        ],
        tableSettings: {
            showGridlines: true,
            responsive: true,
            maintainAspectRatio: true,
            enableSorting: true, // Enable sorting on columns
            sortBy: 'matchNumber', // Default sorting by match number
            sortOrder: 'ascending', // Ascending sorting order
        },
        columnResizeSettings: {
            resizable: true,
            minColumnWidth: 100,
        },
        pagination: true,
        rowsPerPage: 10,
        paginationSettings: {
            showPaginationControls: true,
            paginationControlPosition: 'bottom',
        },
    };
};

export const startPositionUsagePieConfig = (scoutingData, teamNumber) => ({
    data: specificTeamFunctions.startPositionPieData(scoutingData, teamNumber),
    title: `Starting Position Usage Percentages for Team ${teamNumber}`,
    scoringTypes: [
        {
            key: 'Source',
            label: 'Source',
            color: '#8884d8',
            name: 'Source',
        },
        {
            key: 'Middle',
            label: 'Middle',
            color: '#82ca9d',
            name: 'Middle',
        },
        {
            key: 'Amp',
            label: 'Amp',
            color: '#ff4444',
            name: 'Amp',
        },
    ],
    chartSettings: {
        showTooltip: true,
        tooltipSettings: {
            backgroundColor: '#333333',
            borderRadius: '8px',
            fontSize: '0.875rem',
            textColor: '#ffffff',
            cursorColor: 'rgba(255, 255, 255, 0.1)',
        },
        showLegend: true,
        legendPosition: 'top',
        legendLayout: 'horizontal', 
        maintainAspectRatio: true,
        colors: [
            '#8884d8', '#82ca9d', '#ff4444'
        ],
        showLabels: true,
        labelPosition: 'outside',
    },
    responsive: true,
});


export const teleopScoreByRoundConfig = (scoutingData, teamNumber) => {
    return {
        data: specificTeamFunctions.teleopNotesByRoundSeperated(scoutingData, teamNumber),
        title: `Teleop Score by Round for Team ${teamNumber}`,
        scoringTypes: [
            {
                key: 'teleopSpeaker',
                label: 'Teleop Speaker',
                color: '#f2cc0c',
                name: 'Tele-Op Speaker',
            },
            {
                key: 'teleopAmps',
                label: 'Teleop Amps',
                color: '#73bf69',
                name: 'Tele-Op Amp',
            },
            {
                key: 'teleopFeeder',
                label: 'Teleop Feeder',
                color: '#82b5d8',
                name: 'Tele-Op Feeding',
            }
        ],
        chartSettings: {
            showGridlines: true,
            gridlineColor: '#444444',
        },
        xKey: 'roundNumber',
        yKey: 'teleopScore',
        xAxisLabel: 'Round Number',
        sortDataBy: 'xKey',
        yAxisLabel: 'Teleop Score',
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
        showDataLabels: true,
        dataLabelPosition: 'inside',
        dataLabelRotation: 0,
        sortOrder: 'ascending',
        xAxisLabelRotation: 0,
        xAxisSettings: {
            tickRotation: 0,
            tickSize: 5,
            tickPadding: 10,
        },
    };
};

export const teleopScoreByRoundCombinedConfig = (scoutingData, teamNumber) => {
    return {
        data: specificTeamFunctions.teleopScoreByRound(scoutingData, teamNumber),
        title: `Teleop Cycles by Round for Team ${teamNumber}`,
        scoringTypes: [
            {
                key: 'teleopScore',
                label: 'Teleop Score',
                color: '#ea6460',
                name: 'Tele-Op Cycles',
                stacked: true,
            },
            {
                key: 'teleopFeeder',
                label: 'Teleop Feeder',
                color: '#82b5d8',
                name: 'Tele-Op Feeding',
                stacked: true,
            }
        ],
        chartSettings: {
            showGridlines: true,
            gridlineColor: '#444444',
        },
        xKey: 'roundNumber',
        yKey: 'teleopScore',
        xAxisLabel: 'Round Number',
        sortDataBy: 'xKey',
        yAxisLabel: 'Tele-Op Cycles',
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
        showDataLabels: true,
        dataLabelPosition: 'inside',
        dataLabelRotation: 0,
        sortOrder: 'ascending',
        xAxisLabelRotation: 0,
        xAxisSettings: {
            tickRotation: 0,
            tickSize: 5,
            tickPadding: 10,
        },
    };
}

export const teleopFoulPerMatchConfig = (scoutingData, teamNumber) => {
    return {
        data: specificTeamFunctions.teleopFoulPerMatch(scoutingData, teamNumber),
        title: `Teleop Fouls by Round for Team ${teamNumber}`,
        scoringTypes: [
            {
                key: 'teleopScore',
                label: 'Teleop Fouls',
                color: '#ff4444',
                name: 'Tele-Op Fouls',
            },
        ],
        chartSettings: {
            showGridlines: true,
            gridlineColor: '#444444',
        },
        xKey: 'roundNumber',
        yKey: 'teleopScore',
        xAxisLabel: 'Round Number',
        sortDataBy: 'xKey',
        yAxisLabel: 'Teleop Fouls',
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
        showDataLabels: true,
        dataLabelPosition: 'inside',
        dataLabelRotation: 0,
        sortOrder: 'ascending',
        xAxisLabelRotation: 0,
        xAxisSettings: {
            tickRotation: 0,
            tickSize: 5,
            tickPadding: 10,
        },
    };
}

export const teleopAccuracyPerRoundConfig = (scoutingData, teamNumber) => {
    return {
        data: specificTeamFunctions.teleopAccuracyPerRound(scoutingData, teamNumber),
        title: `Teleop Accuracy by Round for Team ${teamNumber}`,
        scoringTypes: [
            {
                key: 'teleopSpeakerAccuracy',
                label: 'Teleop Speaker Accuracy (%)',
                color: '#f2cc0c',
                name: 'Tele-Op Speaker Accuracy',
            },
            {
                key: 'teleopAmpAccuracy',
                label: 'Teleop Amp Accuracy (%)',
                color: '#73bf69',
                name: 'Tele-Op Amp Accuracy',
            },
        ],
        chartSettings: {
            showGridlines: true,
            gridlineColor: '#444444',
        },
        xKey: 'roundNumber',
        yKey: 'teleopAccuracy',  
        xAxisLabel: 'Round Number',
        yAxisLabel: 'Accuracy (%)',
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
        showDataLabels: true,
        dataLabelPosition: 'inside',
        dataLabelRotation: 0,
        sortOrder: 'ascending',
        xAxisLabelRotation: 0,
        xAxisSettings: {
            tickRotation: 0,
            tickSize: 5,
            tickPadding: 10,
        },
    };
};

export const teamTeleopStatsMultiNumberConfig = (scoutingData, teamNumber) => {
    const ampTeleOpAverage = specificTeamFunctions.ampTeleOpAverage(scoutingData, teamNumber);
    const speakerTeleOpAverage = specificTeamFunctions.speakerTeleOpAverage(scoutingData, teamNumber);
    const ampTeleOpMax = specificTeamFunctions.ampTeleOpMax(scoutingData, teamNumber);
    const speakerTeleOpMax = specificTeamFunctions.speakerTeleOpMax(scoutingData, teamNumber);

    const speakerAccuracyAvarage = specificTeamFunctions.speakerTeleOpAccuracyAverage(scoutingData, teamNumber);
    const ampAccuracyAvarage = specificTeamFunctions.ampTeleOpAccuracyAverage(scoutingData, teamNumber);
    const speakerAccuracyMax = specificTeamFunctions.speakerTeleOpAccuracyMax(scoutingData, teamNumber);
    const ampAccuracyMax = specificTeamFunctions.ampTeleOpAccuracyMax(scoutingData, teamNumber);

    return {
        mainTitle: `Tele-Op Stats for Team ${teamNumber}`, 
        values: [
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
                title: 'Average Speaker Accurecy / Max',
                min: 0,
                max: Math.round(speakerAccuracyMax * 100) / 100,
                value: Math.round(speakerAccuracyAvarage * 100) / 100,
            },
            {
                color: '#c4162a',
                title: 'Average Amp Accurecy / Max',
                min: 0,
                max: Math.round(ampAccuracyMax * 100) / 100,
                value: Math.round(ampAccuracyAvarage * 100) / 100,
            },
        ],
    };
};

export const endgameClimbDataPerRoundConfig = (scoutingData, teamNumber) => ({
    data: specificTeamFunctions.endgameClimbDataPerRound(scoutingData, teamNumber),
    title: `Endgame Climb Data by Round for Team ${teamNumber}`,
    scoringTypes: [
        {
            key: 'No',
            label: 'No Climb',
            color: '#8884d8',
            stacked: true,
            name: 'No Climb',
        },
        {
            key: 'P',
            label: 'Parked',
            color: '#82ca9d',
            stacked: true,
            name: 'Parked',
        },
        {
            key: 'Fh',
            label: 'Failed Harmony',
            color: '#ff4444',
            stacked: true,
            name: 'Failed Harmony',
        },
        {
            key: 'Os',
            label: 'Onstage',
            color: '#ffc658',
            stacked: true,
            name: 'Onstage',
        },
        {
            key: 'Hm',
            label: 'Harmony',
            color: '#ff8042',
            stacked: true,
            name: 'Harmony',
        },
    ],
    chartSettings: {
        showGridlines: true,
        gridlineColor: '#444444',
    },
    xKey: 'roundNumber',
    yAxisLabel: 'Climb Status',
    yAxisMin: 0,
    yAxisMax: 1,
    xAxisLabelRotation: 0,
    xAxisLabel: 'Round Number',
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
    sortOrder: 'ascending',
});

export const endgameClimbUsagePieConfig = (scoutingData, teamNumber) => ({
    data: specificTeamFunctions.endgameClimbPieData(scoutingData, teamNumber),
    title: `Endgame Climb Usage Percentages for Team ${teamNumber}`,
    scoringTypes: [
        {
            key: 'No',
            label: 'No Climb',
            color: '#8884d8',
            name: 'No Climb',
        },
        {
            key: 'P',
            label: 'Parked',
            color: '#82ca9d',
            name: 'Parked',
        },
        {
            key: 'Fh',
            label: 'Failed Harmony',
            color: '#ff4444',
            name: 'Failed Harmony',
        },
        {
            key: 'Os',
            label: 'Onstage',
            color: '#ffc658',
            name: 'Onstage',
        },
        {
            key: 'Hm',
            label: 'Harmony',
            color: '#ff8042',
            name: 'Harmony',
        },
    ],
    chartSettings: {
        showTooltip: true,
        tooltipSettings: {
            backgroundColor: '#333333',
            borderRadius: '8px',
            fontSize: '0.875rem',
            textColor: '#ffffff',
            cursorColor: 'rgba(255, 255, 255, 0.1)',
        },
        showLegend: true,
        legendPosition: 'top',
        legendLayout: 'horizontal',
        maintainAspectRatio: true,
        colors: ['#8884d8', '#82ca9d', '#ff4444', '#ffc658', '#ff8042'],
        showLabels: true,
        labelPosition: 'outside',
    },
    responsive: true,
});

export const trapPerRoundConfig = (scoutingData, teamNumber) => ({
    data: specificTeamFunctions.endgameTrapPerRound(scoutingData, teamNumber),
    title: `Endgame Trap Per Round for Team ${teamNumber}`,
    scoringTypes: [
        {
            key: 'trapScore',
            label: 'Trap Score',
            color: '#f2495c',
            name: 'Trap Score',
        },
    ],
    chartSettings: {
        showGridlines: true,
        gridlineColor: '#444444',
    },
    xKey: 'roundNumber',
    yKey: 'trapScore',
    xAxisLabel: 'Round Number',
    yAxisLabel: 'Trap Score',
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
});

export const endgameTrapUsagePieConfig = (scoutingData, teamNumber) => ({
    data: specificTeamFunctions.endgameTrapPieData(scoutingData, teamNumber),
    title: `Endgame Trap Score for Team ${teamNumber}`,
    scoringTypes: [
        {
            key: '0',
            label: 'Note 0',
            color: '#8884d8',
            name: '0 Note',
        },
        {
            key: '1',
            label: 'Note 1',
            color: '#82ca9d',
            name: '1 Note',
        },
        {
            key: '2',
            label: 'Note 2',
            color: '#ff4444',
            name: '2 Note',
        },
        {
            key: '3',
            label: 'Note 3',
            color: '#ffc658',
            name: '3 Note',
        },
    ],
    chartSettings: {
        showTooltip: true,
        tooltipSettings: {
            backgroundColor: '#333333',
            borderRadius: '8px',
            fontSize: '0.875rem',
            textColor: '#ffffff',
            cursorColor: 'rgba(255, 255, 255, 0.1)',
        },
        showLegend: true,
        legendPosition: 'top',
        legendLayout: 'horizontal',
        maintainAspectRatio: true,
        colors: ['#8884d8', '#82ca9d', '#ff4444', '#ffc658'],
        showLabels: true,
        labelPosition: 'outside',
    },
    responsive: true,
});

export const teamPerformanceRadarConfig = (scoutingData, teamNumber) => {
    // Calculate the max values across all teams for each category
    const maxSpeakerTeleOp = allTeamsFunctions.speakerTeleOpMax(scoutingData);  // Max for Teleop Speaker Score
    const maxAmpTeleOp = allTeamsFunctions.ampTeleOpMax(scoutingData);  // Max for Teleop Amp Score
    const maxSpeakerAuto = allTeamsFunctions.autoSpeakerMax(scoutingData);  // Max for Autonomous Speaker Score
    const maxFeeding = allTeamsFunctions.maxFeeding(scoutingData);  // Max for Feeder Interactions
    const maxEndPosition = 4;  // Max for End Position
    const maxSpeakerAccuracyTeleop = allTeamsFunctions.speakerTeleOpAccuracyMax(scoutingData);  // Max for Teleop Speaker

    // Calculate the specific team's stats (averages)
    const speakerTeleOp = specificTeamFunctions.speakerTeleOpAverage(scoutingData, teamNumber);
    const ampTeleOp = specificTeamFunctions.ampTeleOpAverage(scoutingData, teamNumber);
    const speakerAuto = specificTeamFunctions.speakerAutoAverage(scoutingData, teamNumber);
    const feeding = specificTeamFunctions.feedingAverage(scoutingData, teamNumber);
    const endPosition = specificTeamFunctions.endPositionAverage(scoutingData, teamNumber);
    const speakerAccuracyTeleop = specificTeamFunctions.speakerTeleOpAccuracyAverage(scoutingData, teamNumber);

    // Calculate competition-wide averages
    const avgSpeakerTeleOp = allTeamsFunctions.speakerTeleOpAverage(scoutingData);
    const avgAmpTeleOp = allTeamsFunctions.ampTeleOpAverage(scoutingData);
    const avgSpeakerAuto = allTeamsFunctions.autoSpeakerAverage(scoutingData);
    const avgFeeding = allTeamsFunctions.feedingAverage(scoutingData);
    const avgEndPosition = allTeamsFunctions.competitionEndPositionAverage(scoutingData);
    const avgSpeakerAccuracyTeleop = allTeamsFunctions.speakerTeleOpAccuracyAverage(scoutingData);

    // calculate the specific team's stats (max)
    const maxSpeakerTeleOpTeam = specificTeamFunctions.speakerTeleOpMax(scoutingData, teamNumber);
    const maxAmpTeleOpTeam = specificTeamFunctions.ampTeleOpMax(scoutingData, teamNumber);
    const maxSpeakerAutoTeam = specificTeamFunctions.speakerAutoMax(scoutingData, teamNumber);
    const maxFeedingTeam = specificTeamFunctions.feedingMax(scoutingData, teamNumber);
    const maxEndPositionTeam = specificTeamFunctions.maxEndPositionForMatch(scoutingData, teamNumber);
    const maxSpeakerAccuracy = specificTeamFunctions.speakerTeleOpAccuracyMax(scoutingData, teamNumber);

    // Normalize each category's data to its own maximum value
    const normalizeValue = (value, max) => max > 0 ? (value / max) * 100 : 0;

    // Prepare the normalized data
    const data = [
        {
            subject: 'Autonomous Speaker Score',
            [`Team ${teamNumber} Average`]: normalizeValue(speakerAuto, maxSpeakerAuto),
            'Competition Average': normalizeValue(avgSpeakerAuto, maxSpeakerAuto),
            [`Team ${teamNumber} Max`]: normalizeValue(maxSpeakerAutoTeam, maxSpeakerAuto),
        },
        {
            subject: 'Teleop Speaker Score',
            [`Team ${teamNumber} Average`]: normalizeValue(speakerTeleOp, maxSpeakerTeleOp),
            'Competition Average': normalizeValue(avgSpeakerTeleOp, maxSpeakerTeleOp),
            [`Team ${teamNumber} Max`]: normalizeValue(maxSpeakerTeleOpTeam, maxSpeakerTeleOp),
        },
        {
            subject: 'Teleop Amp Score',
            [`Team ${teamNumber} Average`]: normalizeValue(ampTeleOp, maxAmpTeleOp),
            'Competition Average': normalizeValue(avgAmpTeleOp, maxAmpTeleOp),
            [`Team ${teamNumber} Max`]: normalizeValue(maxAmpTeleOpTeam, maxAmpTeleOp),
        },
        {
            subject: 'Feeder Interactions',
            [`Team ${teamNumber} Average`]: normalizeValue(feeding, maxFeeding),
            'Competition Average': normalizeValue(avgFeeding, maxFeeding),
            [`Team ${teamNumber} Max`]: normalizeValue(maxFeedingTeam, maxFeeding)
        },
        {
            subject: 'End Position',
            [`Team ${teamNumber} Average`]: normalizeValue(endPosition, maxEndPosition),
            'Competition Average': normalizeValue(avgEndPosition, maxEndPosition),
            [`Team ${teamNumber} Max`]: normalizeValue(maxEndPositionTeam, maxEndPosition),
        },
        {
            subject: 'Teleop Speaker Accuracy',
            [`Team ${teamNumber} Average`]: normalizeValue(speakerAccuracyTeleop, maxSpeakerAccuracyTeleop),
            'Competition Average': normalizeValue(avgSpeakerAccuracyTeleop, maxSpeakerAccuracyTeleop),
            [`Team ${teamNumber} Max`]: normalizeValue(maxSpeakerAccuracy, maxSpeakerAccuracyTeleop),
        },
    ];

    return {
        data,
        radars: [
            {
                key: `Team ${teamNumber} Average`,
                label: `Team ${teamNumber} Average`,
                color: '#8884d8',
            },
            {
                key: 'Competition Average',
                label: 'Competition Average',
                color: '#82ca9d',
            },
            {
                key: `Team ${teamNumber} Max`,
                label: `Team ${teamNumber} Max`,
                color: '#ff4444',
            },
        ],
        radarSettings: {
            strokeWidth: 2,
            dot: true,
        },
        angleKey: 'subject',
        showRadiusAxis: false,
        customLabels: {
            'Autonomous Speaker Score': 'Autonomous Speaker',
            'Teleop Speaker Score': 'Teleop Speaker',
            'Teleop Amp Score': 'Teleop Amp',
            'Feeder Interactions': 'Feeder Interactions',
            'End Position': 'End Position',
            'Teleop Speaker Accuracy': 'Teleop Speaker Accuracy',
        },
        showGrid: true,
        gridType: 'polygon',
        fillGrid: true,
        showLegend: true,
        showTooltip: false,
        responsive: true,
        title: 'Team Performance Comparison',
        fontSettings: {
            titleFontSize: '1.5rem',
            labelFontSize: '1rem',
            legendFontSize: '1rem',
            defaultLabelColor: '#ffffff',
        },
        tooltipSettings: {
            backgroundColor: '#333333',
            borderRadius: '8px',
            fontSize: '0.875rem',
            textColor: '#ffffff',
            cursorColor: 'rgba(255, 255, 255, 0.1)',
        },
    };
};

export const compareTeamsAverageRadarConfig = (scoutingData, team1Number, team2Number) => {
    const maxSpeakerTeleOp = allTeamsFunctions.speakerTeleOpMax(scoutingData);
    const maxAmpTeleOp = allTeamsFunctions.ampTeleOpMax(scoutingData);
    const maxSpeakerAuto = allTeamsFunctions.autoSpeakerMax(scoutingData);
    const maxFeeding = allTeamsFunctions.maxFeeding(scoutingData);
    const maxEndPosition = 4;
    const maxSpeakerAccuracyTeleop = allTeamsFunctions.speakerTeleOpAccuracyMax(scoutingData);

    const team1Average = {
        speakerTeleOp: specificTeamFunctions.speakerTeleOpAverage(scoutingData, team1Number),
        ampTeleOp: specificTeamFunctions.ampTeleOpAverage(scoutingData, team1Number),
        speakerAuto: specificTeamFunctions.speakerAutoAverage(scoutingData, team1Number),
        feeding: specificTeamFunctions.feedingAverage(scoutingData, team1Number),
        endPosition: specificTeamFunctions.endPositionAverage(scoutingData, team1Number),
        speakerAccuracyTeleop: specificTeamFunctions.speakerTeleOpAccuracyAverage(scoutingData, team1Number),
    };

    const team2Average = {
        speakerTeleOp: specificTeamFunctions.speakerTeleOpAverage(scoutingData, team2Number),
        ampTeleOp: specificTeamFunctions.ampTeleOpAverage(scoutingData, team2Number),
        speakerAuto: specificTeamFunctions.speakerAutoAverage(scoutingData, team2Number),
        feeding: specificTeamFunctions.feedingAverage(scoutingData, team2Number),
        endPosition: specificTeamFunctions.endPositionAverage(scoutingData, team2Number),
        speakerAccuracyTeleop: specificTeamFunctions.speakerTeleOpAccuracyAverage(scoutingData, team2Number),
    };

    const data = [
        {
            subject: 'Autonomous Speaker Score',
            [`Team ${team1Number} Average`]: (team1Average.speakerAuto / maxSpeakerAuto) * 100,
            [`Team ${team2Number} Average`]: (team2Average.speakerAuto / maxSpeakerAuto) * 100,
        },
        {
            subject: 'Teleop Speaker Score',
            [`Team ${team1Number} Average`]: (team1Average.speakerTeleOp / maxSpeakerTeleOp) * 100,
            [`Team ${team2Number} Average`]: (team2Average.speakerTeleOp / maxSpeakerTeleOp) * 100,
        },
        {
            subject: 'Teleop Amp Score',
            [`Team ${team1Number} Average`]: (team1Average.ampTeleOp / maxAmpTeleOp) * 100,
            [`Team ${team2Number} Average`]: (team2Average.ampTeleOp / maxAmpTeleOp) * 100,
        },
        {
            subject: 'Feeder Interactions',
            [`Team ${team1Number} Average`]: (team1Average.feeding / maxFeeding) * 100,
            [`Team ${team2Number} Average`]: (team2Average.feeding / maxFeeding) * 100,
        },
        {
            subject: 'End Position',
            [`Team ${team1Number} Average`]: (team1Average.endPosition / maxEndPosition) * 100,
            [`Team ${team2Number} Average`]: (team2Average.endPosition / maxEndPosition) * 100,
        },
        {
            subject: 'Teleop Speaker Accuracy',
            [`Team ${team1Number} Average`]: (team1Average.speakerAccuracyTeleop / maxSpeakerAccuracyTeleop) * 100,
            [`Team ${team2Number} Average`]: (team2Average.speakerAccuracyTeleop / maxSpeakerAccuracyTeleop) * 100,
        },
    ];

    return {
        data,
        radars: [
            {
                key: `Team ${team1Number} Average`,
                label: `Team ${team1Number} Average`,
                color: '#8884d8',
            },
            {
                key: `Team ${team2Number} Average`,
                label: `Team ${team2Number} Average`,
                color: '#82ca9d',
            },
        ],
        radarSettings: {
            strokeWidth: 2,
            dot: true,
        },
        angleKey: 'subject',
        showRadiusAxis: false,
        customLabels: {
            'Autonomous Speaker Score': 'Autonomous Speaker',
            'Teleop Speaker Score': 'Teleop Speaker',
            'Teleop Amp Score': 'Teleop Amp',
            'Feeder Interactions': 'Feeder Interactions',
            'End Position': 'End Position',
            'Teleop Speaker Accuracy': 'Teleop Speaker Accuracy',
        },
        showGrid: true,
        gridType: 'polygon',
        fillGrid: true,
        showLegend: true,
        showTooltip: false,
        responsive: true,
        title: 'Team Performance Average Comparison',
        fontSettings: {
            titleFontSize: '1.5rem',
            labelFontSize: '1rem',
            legendFontSize: '1rem',
            defaultLabelColor: '#ffffff',
        },
        tooltipSettings: {
            backgroundColor: '#333333',
            borderRadius: '8px',
            fontSize: '0.875rem',
            textColor: '#ffffff',
            cursorColor: 'rgba(255, 255, 255, 0.1)',
        },
    };
};

export const compareTeamsMaxRadarConfig = (scoutingData, team1Number, team2Number) => {
    const maxSpeakerTeleOp = allTeamsFunctions.speakerTeleOpMax(scoutingData);
    const maxAmpTeleOp = allTeamsFunctions.ampTeleOpMax(scoutingData);
    const maxSpeakerAuto = allTeamsFunctions.autoSpeakerMax(scoutingData);
    const maxFeeding = allTeamsFunctions.maxFeeding(scoutingData);
    const maxEndPosition = 4;
    const maxSpeakerAccuracyTeleop = allTeamsFunctions.speakerTeleOpAccuracyMax(scoutingData);

    const team1Max = {
        speakerTeleOp: specificTeamFunctions.speakerTeleOpMax(scoutingData, team1Number),
        ampTeleOp: specificTeamFunctions.ampTeleOpMax(scoutingData, team1Number),
        speakerAuto: specificTeamFunctions.speakerAutoMax(scoutingData, team1Number),
        feeding: specificTeamFunctions.feedingMax(scoutingData, team1Number),
        endPosition: specificTeamFunctions.maxEndPositionForMatch(scoutingData, team1Number),
        speakerAccuracyTeleop: specificTeamFunctions.speakerTeleOpAccuracyMax(scoutingData, team1Number),
    };

    const team2Max = {
        speakerTeleOp: specificTeamFunctions.speakerTeleOpMax(scoutingData, team2Number),
        ampTeleOp: specificTeamFunctions.ampTeleOpMax(scoutingData, team2Number),
        speakerAuto: specificTeamFunctions.speakerAutoMax(scoutingData, team2Number),
        feeding: specificTeamFunctions.feedingMax(scoutingData, team2Number),
        endPosition: specificTeamFunctions.maxEndPositionForMatch(scoutingData, team2Number),
        speakerAccuracyTeleop: specificTeamFunctions.speakerTeleOpAccuracyMax(scoutingData, team2Number),
    };

    const data = [
        {
            subject: 'Autonomous Speaker Score',
            [`Team ${team1Number} Max`]: (team1Max.speakerAuto / maxSpeakerAuto) * 100,
            [`Team ${team2Number} Max`]: (team2Max.speakerAuto / maxSpeakerAuto) * 100,
        },
        {
            subject: 'Teleop Speaker Score',
            [`Team ${team1Number} Max`]: (team1Max.speakerTeleOp / maxSpeakerTeleOp) * 100,
            [`Team ${team2Number} Max`]: (team2Max.speakerTeleOp / maxSpeakerTeleOp) * 100,
        },
        {
            subject: 'Teleop Amp Score',
            [`Team ${team1Number} Max`]: (team1Max.ampTeleOp / maxAmpTeleOp) * 100,
            [`Team ${team2Number} Max`]: (team2Max.ampTeleOp / maxAmpTeleOp) * 100,
        },
        {
            subject: 'Feeder Interactions',
            [`Team ${team1Number} Max`]: (team1Max.feeding / maxFeeding) * 100,
            [`Team ${team2Number} Max`]: (team2Max.feeding / maxFeeding) * 100,
        },
        {
            subject: 'End Position',
            [`Team ${team1Number} Max`]: (team1Max.endPosition / maxEndPosition) * 100,
            [`Team ${team2Number} Max`]: (team2Max.endPosition / maxEndPosition) * 100,
        },
        {
            subject: 'Teleop Speaker Accuracy',
            [`Team ${team1Number} Max`]: (team1Max.speakerAccuracyTeleop / maxSpeakerAccuracyTeleop) * 100,
            [`Team ${team2Number} Max`]: (team2Max.speakerAccuracyTeleop / maxSpeakerAccuracyTeleop) * 100,
        },
    ];

    return {
        data,
        radars: [
            {
                key: `Team ${team1Number} Max`,
                label: `Team ${team1Number} Max`,
                color: '#8884d8',
            },
            {
                key: `Team ${team2Number} Max`,
                label: `Team ${team2Number} Max`,
                color: '#ff4444',
            },
        ],
        radarSettings: {
            strokeWidth: 2,
            dot: true,
        },
        angleKey: 'subject',
        showRadiusAxis: false,
        customLabels: {
            'Autonomous Speaker Score': 'Autonomous Speaker',
            'Teleop Speaker Score': 'Teleop Speaker',
            'Teleop Amp Score': 'Teleop Amp',
            'Feeder Interactions': 'Feeder Interactions',
            'End Position': 'End Position',
            'Teleop Speaker Accuracy': 'Teleop Speaker Accuracy',
        },
        showGrid: true,
        gridType: 'polygon',
        fillGrid: true,
        showLegend: true,
        showTooltip: false,
        responsive: true,
        title: 'Team Performance Max Comparison',
        fontSettings: {
            titleFontSize: '1.5rem',
            labelFontSize: '1rem',
            legendFontSize: '1rem',
            defaultLabelColor: '#ffffff',
        },
        tooltipSettings: {
            backgroundColor: '#333333',
            borderRadius: '8px',
            fontSize: '0.875rem',
            textColor: '#ffffff',
            cursorColor: 'rgba(255, 255, 255, 0.1)',
        },
    };
};

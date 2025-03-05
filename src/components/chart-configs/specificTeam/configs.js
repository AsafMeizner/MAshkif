import * as specificTeamFunctions from './functions.js';
import * as allTeamsFunctions from '../allTeams/functions.js';

// General

export const matchScoreByRoundConfig = (scoutingData, teamNumber) => {
    return {
        data: specificTeamFunctions.matchScoreByRound(scoutingData, teamNumber),
        title: `Match Scored by Round for Team ${teamNumber}`,
        scoringTypes: [
            {
                key: 'coralScore',
                label: 'Coral Scored',
                color: '#c4162a',
                name: 'Round Coral Scored',
            },
            {
                key: 'AlgaeScore',
                label: 'Algae Scored',
                color: '#1ed760',
                name: 'Round Algae Scored',
            }
        ],
        xKey: 'roundNumber',
        yKey: 'totalScore',
        xAxisLabel: 'Match Number',
        sortDataBy: 'xKey',
        yAxisLabel: 'Total Scored',
        sortOrder: 'ascending',
        xAxisLabelRotation: 0,
        showDataLabels: true,
        dataLabelPosition: 'inside',
        dataLabelRotation: 0,
    };
};

export const averageScoreConfig = (scoutingData, teamNumber) => {
    const averageCoralScore = specificTeamFunctions.scoresSummery(scoutingData, teamNumber).averageCoralScore;
    const averageAlgaeScore = specificTeamFunctions.scoresSummery(scoutingData, teamNumber).averageAlgaeScore;
    const maxCoralScore = specificTeamFunctions.scoresSummery(scoutingData, teamNumber).maxCoralScore;
    const maxAlgaeScore = specificTeamFunctions.scoresSummery(scoutingData, teamNumber).maxAlgaeScore;
    const averageFouls = specificTeamFunctions.scoresSummery(scoutingData, teamNumber).averageFouls;
    const maxFouls = specificTeamFunctions.scoresSummery(scoutingData, teamNumber).maxFouls;

    return {
        mainTitle: `General Stats For Team ${teamNumber}`,
        values: [
            {
                color: '#c4162a',
                title: 'Average / Max Coral Scored',
                min: 0,
                max: maxCoralScore,
                value: averageCoralScore,
            },
            {
                color: '#1ed760',
                title: 'Average / Max Algae Scored',
                min: 0,
                max: maxAlgaeScore,
                value: averageAlgaeScore,
            },
            {
                color: '#f4c20d',
                title: 'Average / Max Fouls',
                min: 0,
                max: maxFouls,
                value: averageFouls,
            }
        ],
    };
};

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
                key: 'fouls',
                label: 'Penalties',
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

// Autonomous

export const autonomousScoreByMatchConfig = (scoutingData, teamNumber) => {
    return {
        data: specificTeamFunctions.autonomousAverageByMatch(scoutingData, teamNumber),
        title: `Autonomous Scored by Match for Team ${teamNumber}`,
        scoringTypes: [
            {
                key: 'l1Score',
                label: 'Coral Scored',
                color: '#91101f',
                name: 'L1 Scored',
                stacked: true,
            },
            {
                key: 'l2Score',
                label: 'Algae Scored',
                color: '#c4162a',
                name: 'L2 Scored',
                stacked: true,
            },
            {
                key: 'l3Score',
                label: 'Coral Scored',
                color: '#e67e22',
                name: 'L3 Scored',
                stacked: true,
            },
            {
                key: 'l4Score',
                label: 'Algae Scored',
                color: '#f4c20d',
                name: 'L4 Scored',
                stacked: true,
            },
            {
                key: 'AlgaeScore',
                label: 'Algae Scored',
                color: '#1ed760',
                name: 'Algae Scored',
                stacked: false,
            }
        ],
        xKey: 'matchNumber',
        yKey: 'totalScore',
        xAxisLabel: 'Match Number',
        sortDataBy: 'xKey',
        yAxisLabel: 'Total Scored',
        sortOrder: 'ascending',
        xAxisLabelRotation: 0,
        showDataLabels: true,
        dataLabelPosition: 'inside',
        dataLabelRotation: 0,
    };
}

export const autonomousSummeryConfig = (scoutingData, teamNumber) => {
    const averageCoralScore = specificTeamFunctions.autonomousSummery(scoutingData, teamNumber).averageCoralScore;
    const averageAlgaeScore = specificTeamFunctions.autonomousSummery(scoutingData, teamNumber).averageAlgaeScore;
    const maxCoralScore = specificTeamFunctions.autonomousSummery(scoutingData, teamNumber).maxCoralScore;
    const maxAlgaeScore = specificTeamFunctions.autonomousSummery(scoutingData, teamNumber).maxAlgaeScore;

    return {
        mainTitle: `Autonomous Stats for Team ${teamNumber}`,
        values: [
            {
                color: '#c4162a',
                title: 'Average / Max Coral Scored',
                min: 0,
                max: maxCoralScore,
                value: averageCoralScore,
            },
            {
                color: '#1ed760',
                title: 'Average / Max Algae Scored',
                min: 0,
                max: maxAlgaeScore,
                value: averageAlgaeScore,
            },
        ],
    };
}

export const autonomousCoralPrecentInConfig = (scoutingData, teamNumber) => {
    return {
        data: specificTeamFunctions.autonomousCoralPrecentIn(scoutingData, teamNumber),
        title: `Autonomous Coral Sucssess Precent for Team ${teamNumber}`,
        scoringTypes: [
            {
                key: 'coralL1Precent',
                label: 'L1',
                color: '#c4162a',
                name: 'L1',
            },
            {
                key: 'coralL2Precent',
                label: 'L2',
                color: '#e67e22',
                name: 'L2',
            },
            {
                key: 'coralL3Precent',
                label: 'L3',
                color: '#f4c20d',
                name: 'L3',
            },
            {
                key: 'coralL4Precent',
                label: 'L4',
                color: '#1ed760',
                name: 'L4',
            }
        ],
        xKey: 'roundNumber',
        yKey: 'coralL1Precent',
        xAxisLabel: 'Match Number',
        sortDataBy: 'xKey',
        yAxisLabel: 'Precent In',
        sortOrder: 'ascending',
        xAxisLabelRotation: 0,
        yAxisMax: 100,
    };
}

export const autonomousLeftStartingLineConfig = (scoutingData, teamNumber) => {
    return {
        data: specificTeamFunctions.autonomousLeftStartingLine(scoutingData, teamNumber),
        title: `Autonomous Left Starting Line for Team ${teamNumber}`,
        scoringTypes: [
            {
                key: 'leftStartingLine',
                label: 'Left Starting Line',
                color: '#c4162a',
                name: 'Left Starting Line',
            }
        ],
        xKey: 'roundNumber',
        yKey: 'leftStartingLine',
        xAxisLabel: 'Match Number',
        sortDataBy: 'xKey',
        yAxisLabel: 'Left Starting Line',
        sortOrder: 'ascending',
        xAxisLabelRotation: 0,
        yAxisMax: 1,
    };
}
// Teleop

export const teleopCoralByMatchConfig = (scoutingData, teamNumber) => {
    return {
        data: specificTeamFunctions.teleopAverageByMatch(scoutingData, teamNumber),
        title: `Teleop Coral by Match for Team ${teamNumber}`,
        scoringTypes: [
            {
                key: 'l1Score',
                label: 'Coral Scored',
                color: '#91101f',
                name: 'L1 Scored',
                stacked: true,
            },
            {
                key: 'l2Score',
                label: 'Algae Scored',
                color: '#c4162a',
                name: 'L2 Scored',
                stacked: true,
            },
            {
                key: 'l3Score',
                label: 'Coral Scored',
                color: '#e67e22',
                name: 'L3 Scored',
                stacked: true,
            },
            {
                key: 'l4Score',
                label: 'Algae Scored',
                color: '#f4c20d',
                name: 'L4 Scored',
                stacked: true,
            }
        ],
        xKey: 'matchNumber',
        yKey: 'totalScore',
        xAxisLabel: 'Match Number',
        sortDataBy: 'xKey',
        yAxisLabel: 'Total Scored',
        sortOrder: 'ascending',
        xAxisLabelRotation: 0,
        showDataLabels: true,
        dataLabelPosition: 'inside',
        dataLabelRotation: 0,
    };
}

export const teleopAlgaeByMatchConfig = (scoutingData, teamNumber) => {
    return {
        data: specificTeamFunctions.teleopAverageByMatch(scoutingData, teamNumber),
        title: `Teleop Algae by Match for Team ${teamNumber}`,
        scoringTypes: [
            {
                key: 'AlgaeBargeScore',
                label: 'Algae Barge Scored',
                color: '#1ed760',
                name: 'Algae Barge Scored',
                stacked: true,
            },
            {
                key: 'AlgaeProcessorScore',
                label: 'Algae Processor Scored',
                color: '#0f6f32',
                name: 'Algae Processor Scored',
                stacked: true,
            }
        ],
        xKey: 'matchNumber',
        yKey: 'totalScore',
        xAxisLabel: 'Match Number',
        sortDataBy: 'xKey',
        yAxisLabel: 'Total Scored',
        sortOrder: 'ascending',
        xAxisLabelRotation: 0,
        showDataLabels: true,
        dataLabelPosition: 'inside',
        dataLabelRotation: 0,
    };
}

export const teleopCoralPrecentInConfig = (scoutingData, teamNumber) => {
    return {
        data: specificTeamFunctions.teleopPercentagesByMatch(scoutingData, teamNumber),
        title: `Teleop Coral Percent In for Team ${teamNumber}`,
        scoringTypes: [
            {
                key: 'overallPrecent',
                label: 'Coral Percent',
                color: '#c4162a',
                name: 'Coral Percent',
                stacked: false,
            }
        ],
        xKey: 'roundNumber',
        yKey: 'coralL1Precent',
        xAxisLabel: 'Match Number',
        sortDataBy: 'xKey',
        yAxisLabel: 'Precent In',
        sortOrder: 'ascending',
        xAxisLabelRotation: 0,
        yAxisMax: 100,
        showDataLabels: true,
        dataLabelPosition: 'top',
        dataLabelRotation: 0,
    };
}

export const teleopSummeryConfig = (scoutingData, teamNumber) => {
    const averageCoralScore = specificTeamFunctions.teleopSummery(scoutingData, teamNumber).averageCoralScore;
    const averageAlgaeScore = specificTeamFunctions.teleopSummery(scoutingData, teamNumber).averageAlgaeScore;
    const maxCoralScore = specificTeamFunctions.teleopSummery(scoutingData, teamNumber).maxCoralScore;
    const maxAlgaeScore = specificTeamFunctions.teleopSummery(scoutingData, teamNumber).maxAlgaeScore;

    const averageAlgaeRemovedFromReef = specificTeamFunctions.teleopSummery(scoutingData, teamNumber).averageAlgaeRemovedFromReef;
    const maxAlgaeRemovedFromReef = specificTeamFunctions.teleopSummery(scoutingData, teamNumber).maxAlgaeRemovedFromReef;
    const averageCoralPrecent = specificTeamFunctions.teleopSummery(scoutingData, teamNumber).averageCoralPrecent;
    const maxCoralPrecent = specificTeamFunctions.teleopSummery(scoutingData, teamNumber).maxCoralPrecent;

    return {
        mainTitle: `Teleop Stats for Team ${teamNumber}`,
        values: [
            {
                color: '#c4162a',
                title: 'Average / Max Coral Scored',
                min: 0,
                max: maxCoralScore,
                value: averageCoralScore,
            },
            {
                color: '#6e93cc',
                title: 'Average / Max Coral Percent In',
                min: 0,
                max: maxCoralPrecent,
                value: averageCoralPrecent,
            },
            {
                color: '#1ed760',
                title: 'Average / Max Algae Scored',
                min: 0,
                max: maxAlgaeScore,
                value: averageAlgaeScore,
            },
            {
                color: '#9c1ee9',
                title: 'Average / Max Algae Removed From Reef',
                min: 0,
                max: maxAlgaeRemovedFromReef,
                value: averageAlgaeRemovedFromReef,
            }
        ],
    };
}

export const teleopCoralLevelsSummeryConfig = (scoutingData, teamNumber) => {
    const averageCoralL1Score = specificTeamFunctions.teleopCoralSummery(scoutingData, teamNumber).averageL1Score;
    const averageCoralL2Score = specificTeamFunctions.teleopCoralSummery(scoutingData, teamNumber).averageL2Score;
    const averageCoralL3Score = specificTeamFunctions.teleopCoralSummery(scoutingData, teamNumber).averageL3Score;
    const averageCoralL4Score = specificTeamFunctions.teleopCoralSummery(scoutingData, teamNumber).averageL4Score;

    const maxCoralL1Score = specificTeamFunctions.teleopCoralSummery(scoutingData, teamNumber).maxL1Score;
    const maxCoralL2Score = specificTeamFunctions.teleopCoralSummery(scoutingData, teamNumber).maxL2Score;
    const maxCoralL3Score = specificTeamFunctions.teleopCoralSummery(scoutingData, teamNumber).maxL3Score;
    const maxCoralL4Score = specificTeamFunctions.teleopCoralSummery(scoutingData, teamNumber).maxL4Score;

    return {
        mainTitle: `Teleop Average / Max Coral Levels Stats for Team ${teamNumber}`,
        values: [
            {
                color: '#91101f',
                title: 'L1',
                min: 0,
                max: maxCoralL1Score,
                value: averageCoralL1Score,
            },
            {
                color: '#c4162a',
                title: 'L2',
                min: 0,
                max: maxCoralL2Score,
                value: averageCoralL2Score,
            },
            {
                color: '#e67e22',
                title: 'L3',
                min: 0,
                max: maxCoralL3Score,
                value: averageCoralL3Score,
            },
            {
                color: '#f4c20d',
                title: 'L4',
                min: 0,
                max: maxCoralL4Score,
                value: averageCoralL4Score,
            }
        ],
    };
}

// Endgame

export const endgameClimbDataPerRoundConfig = (scoutingData, teamNumber) => ({
    data: specificTeamFunctions.endgameClimbDataPerRound(scoutingData, teamNumber),
    title: `Endgame Climb Data by Round for Team ${teamNumber}`,
    scoringTypes: [
        {
            key: 'No',
            label: 'No Climb',
            color: '#ff4444',
            stacked: true,
            name: 'No Climb',
        },
        {
            key: 'P',
            label: 'Parked',
            color: '#ff8042',
            stacked: true,
            name: 'Parked',
        },
        {
            key: 'Fs',
            label: 'Failed Shallow Climb',
            color: '#ffc658',
            stacked: true,
            name: 'Failed Shallow Climb',
        },
        {
            key: 'Fd',
            label: 'Failed Deep Climb',
            color: '#8884d8',
            stacked: true,
            name: 'Failed Deep Climb',
        },
        {
            key: 'Sc',
            label: 'Shallow Climb',
            color: '#01a2f0',
            stacked: true,
            name: 'Shallow Climb',
        },
        {
            key: 'Dc',
            label: 'Deep Climb',
            color: '#82ca9d',
            stacked: true,
            name: 'Deep Climb',
        },
    ],
    xKey: 'roundNumber',
    yAxisLabel: 'Climb Status',
    yAxisMin: 0,
    yAxisMax: 1,
    xAxisLabelRotation: 0,
    xAxisLabel: 'Match Number',
    sortOrder: 'ascending',
});

export const endgameClimbUsagePieConfig = (scoutingData, teamNumber) => ({
    data: specificTeamFunctions.endgameClimbPieData(scoutingData, teamNumber),
    title: `Endgame Climb Usage Percentages for Team ${teamNumber}`,
    scoringTypes: [
        {
            key: 'No',
            label: 'No Climb',
            color: '#ff4444',
            name: 'No Climb',
        },
        {
            key: 'P',
            label: 'Parked',
            color: '#ff8042',
            name: 'Parked',
        },
        {
            key: 'Fs',
            label: 'Failed Shallow Climb',
            color: '#ffc658',
            name: 'Failed Shallow Climb',
        },
        {
            key: 'Fd',
            label: 'Failed Deep Climb',
            color: '#8884d8',
            name: 'Failed Deep Climb',
        },
        {
            key: 'Sc',
            label: 'Shallow Climb',
            color: '#01a2f0',
            name: 'Shallow Climb',
        },
        {
            key: 'Dc',
            label: 'Deep Climb',
            color: '#82ca9d',
            name: 'Deep Climb',
        },
    ],
    chartSettings: {
        showTooltip: true,
    },
});

// Summery

export const teamPerformanceRadarConfig = (scoutingData, teamNumber) => {
    const maxEndPosition = 5;

    // Calculate the specific team's stats (averages)
    const averageCoralScore = specificTeamFunctions.generalSummery(scoutingData, teamNumber).averageCoralScore;
    const averageCoralPrecent = specificTeamFunctions.generalSummery(scoutingData, teamNumber).averageCoralPercent;
    const averageAlgaeBarge = specificTeamFunctions.generalSummery(scoutingData, teamNumber).averageAlgaeBarge;
    const averageAlgaeProcessor = specificTeamFunctions.generalSummery(scoutingData, teamNumber).averageAlgaeProcessor;
    const averageAlgaeRemovedFromReef = specificTeamFunctions.generalSummery(scoutingData, teamNumber).averageAlgaeRemovedFromReef;
    const averageEndPosition = specificTeamFunctions.generalSummery(scoutingData, teamNumber).averageEndPosition;

    // Calculate the max values for the specific team max for each category
    const maxCoralScore = specificTeamFunctions.generalSummery(scoutingData, teamNumber).maxCoralScore;
    const maxCoralPrecent = specificTeamFunctions.generalSummery(scoutingData, teamNumber).maxCoralPercent;
    const maxAlgaeBarge = specificTeamFunctions.generalSummery(scoutingData, teamNumber).maxAlgaeBarge;
    const maxAlgaeProcessor = specificTeamFunctions.generalSummery(scoutingData, teamNumber).maxAlgaeProcessor;
    const maxAlgaeRemovedFromReef = specificTeamFunctions.generalSummery(scoutingData, teamNumber).maxAlgaeRemovedFromReef;

    // Calculate competition-wide averages
    const allAverageCoralScore = allTeamsFunctions.generalSummeryCompetition(scoutingData).averageCoralScore;
    const allAverageCoralPrecent = allTeamsFunctions.generalSummeryCompetition(scoutingData).averageCoralPrecent;
    const allAverageAlgaeBarge = allTeamsFunctions.generalSummeryCompetition(scoutingData).averageAlgaeBarge;
    const allAverageAlgaeProcessor = allTeamsFunctions.generalSummeryCompetition(scoutingData).averageAlgaeProcessor;
    const allAverageAlgaeRemovedFromReef = allTeamsFunctions.generalSummeryCompetition(scoutingData).averageAlgaeRemovedFromReef;
    const allAverageEndPosition = allTeamsFunctions.generalSummeryCompetition(scoutingData).averageEndPosition;

    // Calculate the all teams max for each category
    const allMaxCoralScore = allTeamsFunctions.generalSummeryCompetition(scoutingData).maxCoralScore;
    const allMaxCoralPrecent = allTeamsFunctions.generalSummeryCompetition(scoutingData).maxCoralPrecent;
    const allMaxAlgaeBarge = allTeamsFunctions.generalSummeryCompetition(scoutingData).maxAlgaeBarge;
    const allMaxAlgaeProcessor = allTeamsFunctions.generalSummeryCompetition(scoutingData).maxAlgaeProcessor;
    const allMaxAlgaeRemovedFromReef = allTeamsFunctions.generalSummeryCompetition(scoutingData).maxAlgaeRemovedFromReef;

    // Normalize each category's data to its own maximum value
    const normalizeValue = (value, max) => max > 0 ? (value / max) * 100 : 0;

    const data = [
        {
            subject: 'Coral Scored',
            [`Team ${teamNumber} Average`]: normalizeValue(averageCoralScore, allMaxCoralScore),
            'Competition Average': normalizeValue(allAverageCoralScore, allMaxCoralScore),
            [`Team ${teamNumber} Max`]: normalizeValue(maxCoralScore, allMaxCoralScore),
        },
        {
            subject: 'Coral Precent Accuracy',
            [`Team ${teamNumber} Average`]: normalizeValue(averageCoralPrecent, allMaxCoralPrecent),
            'Competition Average': normalizeValue(allAverageCoralPrecent, allMaxCoralPrecent),
            [`Team ${teamNumber} Max`]: normalizeValue(maxCoralPrecent, allMaxCoralPrecent),
        },
        {
            subject: 'Algae Barge',
            [`Team ${teamNumber} Average`]: normalizeValue(averageAlgaeBarge, allMaxAlgaeBarge),
            'Competition Average': normalizeValue(allAverageAlgaeBarge, allMaxAlgaeBarge),
            [`Team ${teamNumber} Max`]: normalizeValue(maxAlgaeBarge, allMaxAlgaeBarge),
        },
        {
            subject: 'Algae Processor',
            [`Team ${teamNumber} Average`]: normalizeValue(averageAlgaeProcessor, allMaxAlgaeProcessor),
            'Competition Average': normalizeValue(allAverageAlgaeProcessor, allMaxAlgaeProcessor),
            [`Team ${teamNumber} Max`]: normalizeValue(maxAlgaeProcessor, allMaxAlgaeProcessor),
        },
        {
            subject: 'Algae Removed From Reef',
            [`Team ${teamNumber} Average`]: normalizeValue(averageAlgaeRemovedFromReef, allMaxAlgaeRemovedFromReef),
            'Competition Average': normalizeValue(allAverageAlgaeRemovedFromReef, allMaxAlgaeRemovedFromReef),
            [`Team ${teamNumber} Max`]: normalizeValue(maxAlgaeRemovedFromReef, allMaxAlgaeRemovedFromReef),
        },
        {
            subject: 'End Position',
            [`Team ${teamNumber} Average`]: normalizeValue(averageEndPosition, maxEndPosition),
            'Competition Average': normalizeValue(allAverageEndPosition, maxEndPosition),
            [`Team ${teamNumber} Max`]: normalizeValue(maxEndPosition, maxEndPosition),
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
        showRadiusAxis: false,
        customLabels: {
            'Autonomous Speaker Scored': 'Autonomous Speaker',
            'Teleop Speaker Scored': 'Teleop Speaker',
            'Teleop Amp Scored': 'Teleop Amp',
            'Feeder Interactions': 'Feeder Interactions',
            'End Position': 'End Position',
            'Teleop Speaker Accuracy': 'Teleop Speaker Accuracy',
        },
        gridType: 'polygon',
        showTooltip: false,
        title: 'Team Performance Comparison',
    };
};

export const teamsAverageRadarConfig = (scoutingData, team1Number, team2Number) => {
    const maxEndPosition = 5;

    // Calculate the first specific team's stats (averages)
    const averageCoralScore = specificTeamFunctions.generalSummery(scoutingData, team1Number).averageCoralScore;
    const averageCoralPrecent = specificTeamFunctions.generalSummery(scoutingData, team1Number).averageCoralPercent;
    const averageAlgaeBarge = specificTeamFunctions.generalSummery(scoutingData, team1Number).averageAlgaeBarge;
    const averageAlgaeProcessor = specificTeamFunctions.generalSummery(scoutingData, team1Number).averageAlgaeProcessor;
    const averageAlgaeRemovedFromReef = specificTeamFunctions.generalSummery(scoutingData, team1Number).averageAlgaeRemovedFromReef;
    const averageEndPosition = specificTeamFunctions.generalSummery(scoutingData, team1Number).averageEndPosition;

    // Calculate the second specific team's stats (averages)
    const averageCoralScore2 = specificTeamFunctions.generalSummery(scoutingData, team2Number).averageCoralScore;
    const averageCoralPrecent2 = specificTeamFunctions.generalSummery(scoutingData, team2Number).averageCoralPercent;
    const averageAlgaeBarge2 = specificTeamFunctions.generalSummery(scoutingData, team2Number).averageAlgaeBarge;
    const averageAlgaeProcessor2 = specificTeamFunctions.generalSummery(scoutingData, team2Number).averageAlgaeProcessor;
    const averageAlgaeRemovedFromReef2 = specificTeamFunctions.generalSummery(scoutingData, team2Number).averageAlgaeRemovedFromReef;
    const averageEndPosition2 = specificTeamFunctions.generalSummery(scoutingData, team2Number).averageEndPosition;

    // Calculate the all teams max for each category
    const allMaxCoralScore = allTeamsFunctions.generalSummeryCompetition(scoutingData).maxCoralScore;
    const allMaxCoralPrecent = allTeamsFunctions.generalSummeryCompetition(scoutingData).maxCoralPrecent;
    const allMaxAlgaeBarge = allTeamsFunctions.generalSummeryCompetition(scoutingData).maxAlgaeBarge;
    const allMaxAlgaeProcessor = allTeamsFunctions.generalSummeryCompetition(scoutingData).maxAlgaeProcessor;
    const allMaxAlgaeRemovedFromReef = allTeamsFunctions.generalSummeryCompetition(scoutingData).maxAlgaeRemovedFromReef;

    // Normalize each category's data to its own maximum value
    const normalizeValue = (value, max) => max > 0 ? (value / max) * 100 : 0;

    const data = [
        {
            subject: 'Coral Scored',
            [`Team ${team1Number} Average`]: normalizeValue(averageCoralScore, allMaxCoralScore),
            [`Team ${team2Number} Average`]: normalizeValue(averageCoralScore2, allMaxCoralScore),
        },
        {
            subject: 'Coral Precent Accuracy',
            [`Team ${team1Number} Average`]: normalizeValue(averageCoralPrecent, allMaxCoralPrecent),
            [`Team ${team2Number} Average`]: normalizeValue(averageCoralPrecent2, allMaxCoralPrecent),
        },
        {
            subject: 'Algae Barge',
            [`Team ${team1Number} Average`]: normalizeValue(averageAlgaeBarge, allMaxAlgaeBarge),
            [`Team ${team2Number} Average`]: normalizeValue(averageAlgaeBarge2, allMaxAlgaeBarge),
        },
        {
            subject: 'Algae Processor',
            [`Team ${team1Number} Average`]: normalizeValue(averageAlgaeProcessor, allMaxAlgaeProcessor),
            [`Team ${team2Number} Average`]: normalizeValue(averageAlgaeProcessor2, allMaxAlgaeProcessor),
        },
        {
            subject: 'Algae Removed From Reef',
            [`Team ${team1Number} Average`]: normalizeValue(averageAlgaeRemovedFromReef, allMaxAlgaeRemovedFromReef),
            [`Team ${team2Number} Average`]: normalizeValue(averageAlgaeRemovedFromReef2, allMaxAlgaeRemovedFromReef),
        },
        {
            subject: 'End Position',
            [`Team ${team1Number} Average`]: normalizeValue(averageEndPosition, maxEndPosition),
            [`Team ${team2Number} Average`]: normalizeValue(averageEndPosition2, maxEndPosition),
        },
    ];

    return {
        data,
        radars: [
            {
                key: `Team ${team1Number} Average`,
                label: `Team ${team1Number} Average`,
                color: '#aee5ff',
            },
            {
                key: `Team ${team2Number} Average`,
                label: `Team ${team2Number} Average`,
                color: '#e74c3c',
            },
        ],
        showRadiusAxis: false,
        customLabels: {
            'Autonomous Speaker Scored': 'Autonomous Speaker',
            'Teleop Speaker Scored': 'Teleop Speaker',
            'Teleop Amp Scored': 'Teleop Amp',
            'Feeder Interactions': 'Feeder Interactions',
            'End Position': 'End Position',
            'Teleop Speaker Accuracy': 'Teleop Speaker Accuracy',
        },
        gridType: 'polygon',
        showTooltip: false,
        title: 'Team Average Performance Comparison',
    };
};

export const teamMaxRadarConfig = (scoutingData, team1Number, team2Number) => {
    const maxEndPosition = 5;

    // Calculate the max values for the first specific team max for each category
    const maxCoralScore = specificTeamFunctions.generalSummery(scoutingData, team1Number).maxCoralScore;
    const maxCoralPrecent = specificTeamFunctions.generalSummery(scoutingData, team1Number).maxCoralPercent;
    const maxAlgaeBarge = specificTeamFunctions.generalSummery(scoutingData, team1Number).maxAlgaeBarge;
    const maxAlgaeProcessor = specificTeamFunctions.generalSummery(scoutingData, team1Number).maxAlgaeProcessor;
    const maxAlgaeRemovedFromReef = specificTeamFunctions.generalSummery(scoutingData, team1Number).maxAlgaeRemovedFromReef;

    // Calculate the max values for the second specific team max for each category
    const maxCoralScore2 = specificTeamFunctions.generalSummery(scoutingData, team2Number).maxCoralScore;
    const maxCoralPrecent2 = specificTeamFunctions.generalSummery(scoutingData, team2Number).maxCoralPercent;
    const maxAlgaeBarge2 = specificTeamFunctions.generalSummery(scoutingData, team2Number).maxAlgaeBarge;
    const maxAlgaeProcessor2 = specificTeamFunctions.generalSummery(scoutingData, team2Number).maxAlgaeProcessor;
    const maxAlgaeRemovedFromReef2 = specificTeamFunctions.generalSummery(scoutingData, team2Number).maxAlgaeRemovedFromReef;

    // Calculate the all teams max for each category
    const allMaxCoralScore = allTeamsFunctions.generalSummeryCompetition(scoutingData).maxCoralScore;
    const allMaxCoralPrecent = allTeamsFunctions.generalSummeryCompetition(scoutingData).maxCoralPrecent;
    const allMaxAlgaeBarge = allTeamsFunctions.generalSummeryCompetition(scoutingData).maxAlgaeBarge;
    const allMaxAlgaeProcessor = allTeamsFunctions.generalSummeryCompetition(scoutingData).maxAlgaeProcessor;
    const allMaxAlgaeRemovedFromReef = allTeamsFunctions.generalSummeryCompetition(scoutingData).maxAlgaeRemovedFromReef;

    // Normalize each category's data to its own maximum value
    const normalizeValue = (value, max) => max > 0 ? (value / max) * 100 : 0;

    const data = [
        {
            subject: 'Coral Scored',
            [`Team ${team1Number} Max`]: normalizeValue(maxCoralScore, allMaxCoralScore),
            [`Team ${team2Number} Max`]: normalizeValue(maxCoralScore2, allMaxCoralScore),
        },
        {
            subject: 'Coral Precent Accuracy',
            [`Team ${team1Number} Max`]: normalizeValue(maxCoralPrecent, allMaxCoralPrecent),
            [`Team ${team2Number} Max`]: normalizeValue(maxCoralPrecent2, allMaxCoralPrecent),
        },
        {
            subject: 'Algae Barge',
            [`Team ${team1Number} Max`]: normalizeValue(maxAlgaeBarge, allMaxAlgaeBarge),
            [`Team ${team2Number} Max`]: normalizeValue(maxAlgaeBarge2, allMaxAlgaeBarge),
        },
        {
            subject: 'Algae Processor',
            [`Team ${team1Number} Max`]: normalizeValue(maxAlgaeProcessor, allMaxAlgaeProcessor),
            [`Team ${team2Number} Max`]: normalizeValue(maxAlgaeProcessor2, allMaxAlgaeProcessor),
        },
        {
            subject: 'Algae Removed From Reef',
            [`Team ${team1Number} Max`]: normalizeValue(maxAlgaeRemovedFromReef, allMaxAlgaeRemovedFromReef),
            [`Team ${team2Number} Max`]: normalizeValue(maxAlgaeRemovedFromReef2, allMaxAlgaeRemovedFromReef),
        },
        {
            subject: 'End Position',
            [`Team ${team1Number} Max`]: normalizeValue(maxEndPosition, maxEndPosition),
            [`Team ${team2Number} Max`]: normalizeValue(maxEndPosition, maxEndPosition),
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
        showRadiusAxis: false,
        customLabels: {
            'Autonomous Speaker Scored': 'Autonomous Speaker',
            'Teleop Speaker Scored': 'Teleop Speaker',
            'Teleop Amp Scored': 'Teleop Amp',
            'Feeder Interactions': 'Feeder Interactions',
            'End Position': 'End Position',
            'Teleop Speaker Accuracy': 'Teleop Speaker Accuracy',
        },
        gridType: 'polygon',
        showTooltip: false,
        title: 'Team Performance Comparison',
    };
};

export const teamCoralHeightRadarConfig = (scoutingData, teamNumber) => {
    // max values for specific team
    const teamL1Max = specificTeamFunctions.teleopCoralSummery(scoutingData, teamNumber).maxL1Score;
    const teamL2Max = specificTeamFunctions.teleopCoralSummery(scoutingData, teamNumber).maxL2Score;
    const teamL3Max = specificTeamFunctions.teleopCoralSummery(scoutingData, teamNumber).maxL3Score;
    const teamL4Max = specificTeamFunctions.teleopCoralSummery(scoutingData, teamNumber).maxL4Score;

    // average values for specific team
    const teamL1Average = specificTeamFunctions.teleopCoralSummery(scoutingData, teamNumber).averageL1Score;
    const teamL2Average = specificTeamFunctions.teleopCoralSummery(scoutingData, teamNumber).averageL2Score;
    const teamL3Average = specificTeamFunctions.teleopCoralSummery(scoutingData, teamNumber).averageL3Score;
    const teamL4Average = specificTeamFunctions.teleopCoralSummery(scoutingData, teamNumber).averageL4Score;

    // max values for all teams
    const allL1Max = allTeamsFunctions.coralHeightSummeryCompetition(scoutingData).maxL1;
    const allL2Max = allTeamsFunctions.coralHeightSummeryCompetition(scoutingData).maxL2;
    const allL3Max = allTeamsFunctions.coralHeightSummeryCompetition(scoutingData).maxL3;
    const allL4Max = allTeamsFunctions.coralHeightSummeryCompetition(scoutingData).maxL4;

    // average values for all teams
    const allL1Average = allTeamsFunctions.coralHeightSummeryCompetition(scoutingData).averageL1;
    const allL2Average = allTeamsFunctions.coralHeightSummeryCompetition(scoutingData).averageL2;
    const allL3Average = allTeamsFunctions.coralHeightSummeryCompetition(scoutingData).averageL3;
    const allL4Average = allTeamsFunctions.coralHeightSummeryCompetition(scoutingData).averageL4;

    // normalize each category's data to its own maximum value
    const normalizeValue = (value, max) => max > 0 ? (value / max) * 100 : 0;
    
    const data = [
        {
            subject: 'L1',
            [`Team ${teamNumber} Average`]: normalizeValue(teamL1Average, allL1Max),
            'Competition Average': normalizeValue(allL1Average, allL1Max),
            [`Team ${teamNumber} Max`]: normalizeValue(teamL1Max, allL1Max),
        },
        {
            subject: 'L2',
            [`Team ${teamNumber} Average`]: normalizeValue(teamL2Average, allL2Max),
            'Competition Average': normalizeValue(allL2Average, allL2Max),
            [`Team ${teamNumber} Max`]: normalizeValue(teamL2Max, allL2Max),
        },
        {
            subject: 'L3',
            [`Team ${teamNumber} Average`]: normalizeValue(teamL3Average, allL3Max),
            'Competition Average': normalizeValue(allL3Average, allL3Max),
            [`Team ${teamNumber} Max`]: normalizeValue(teamL3Max, allL3Max),
        },
        {
            subject: 'L4',
            [`Team ${teamNumber} Average`]: normalizeValue(teamL4Average, allL4Max),
            'Competition Average': normalizeValue(allL4Average, allL4Max),
            [`Team ${teamNumber} Max`]: normalizeValue(teamL4Max, allL4Max),
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
        showRadiusAxis: false,
        customLabels: {
            'L1': 'L1',
            'L2': 'L2',
            'L3': 'L3',
            'L4': 'L4',
        },
        gridType: 'polygon',
        showTooltip: false,
        title: 'Coral Height Comparison',
    };
};

export const compareAlliancesAverageCoralsConfig = (scoutingData, team1Number, team2Number) => {
    // average values for first specific team for the coral levels
    const teamL1Average = specificTeamFunctions.teleopCoralSummery(scoutingData, team1Number).averageL1Score;
    const teamL2Average = specificTeamFunctions.teleopCoralSummery(scoutingData, team1Number).averageL2Score;
    const teamL3Average = specificTeamFunctions.teleopCoralSummery(scoutingData, team1Number).averageL3Score;
    const teamL4Average = specificTeamFunctions.teleopCoralSummery(scoutingData, team1Number).averageL4Score;

    // average values for second specific team for the coral levels
    const teamL1Average2 = specificTeamFunctions.teleopCoralSummery(scoutingData, team2Number).averageL1Score;
    const teamL2Average2 = specificTeamFunctions.teleopCoralSummery(scoutingData, team2Number).averageL2Score;
    const teamL3Average2 = specificTeamFunctions.teleopCoralSummery(scoutingData, team2Number).averageL3Score;
    const teamL4Average2 = specificTeamFunctions.teleopCoralSummery(scoutingData, team2Number).averageL4Score;

    // max values for all teams for the coral levels
    const allL1Max = allTeamsFunctions.coralHeightSummeryCompetition(scoutingData).maxL1;
    const allL2Max = allTeamsFunctions.coralHeightSummeryCompetition(scoutingData).maxL2;
    const allL3Max = allTeamsFunctions.coralHeightSummeryCompetition(scoutingData).maxL3;
    const allL4Max = allTeamsFunctions.coralHeightSummeryCompetition(scoutingData).maxL4;

    // normalize each category's data to its own maximum value
    const normalizeValue = (value, max) => max > 0 ? (value / max) * 100 : 0;

    const data = [
        {
            subject: 'L1',
            [`Team ${team1Number} Average`]: normalizeValue(teamL1Average, allL1Max),
            [`Team ${team2Number} Average`]: normalizeValue(teamL1Average2, allL1Max),
        },
        {
            subject: 'L2',
            [`Team ${team1Number} Average`]: normalizeValue(teamL2Average, allL2Max),
            [`Team ${team2Number} Average`]: normalizeValue(teamL2Average2, allL2Max),
        },
        {
            subject: 'L3',
            [`Team ${team1Number} Average`]: normalizeValue(teamL3Average, allL3Max),
            [`Team ${team2Number} Average`]: normalizeValue(teamL3Average2, allL3Max),
        },
        {
            subject: 'L4',
            [`Team ${team1Number} Average`]: normalizeValue(teamL4Average, allL4Max),
            [`Team ${team2Number} Average`]: normalizeValue(teamL4Average2, allL4Max),
        },
    ];

    return {
        data,
        radars: [
            {
                key: `Team ${team1Number} Average`,
                label: `Team ${team1Number} Average`,
                color: '#aee5ff',
            },
            {
                key: `Team ${team2Number} Average`,
                label: `Team ${team2Number} Average`,
                color: '#e74c3c',
            },
        ],
        showRadiusAxis: false,
        customLabels: {
            'L1': 'L1',
            'L2': 'L2',
            'L3': 'L3',
            'L4': 'L4',
        },
        gridType: 'polygon',
        showTooltip: false,
        title: 'Coral Height Comparison',
    };
};

export const compareAlliancesMaxCoralsConfig = (scoutingData, team1Number, team2Number) => {
    // max values for first specific team for the coral levels
    const teamL1Max = specificTeamFunctions.teleopCoralSummery(scoutingData, team1Number).maxL1Score;
    const teamL2Max = specificTeamFunctions.teleopCoralSummery(scoutingData, team1Number).maxL2Score;
    const teamL3Max = specificTeamFunctions.teleopCoralSummery(scoutingData, team1Number).maxL3Score;
    const teamL4Max = specificTeamFunctions.teleopCoralSummery(scoutingData, team1Number).maxL4Score;

    // max values for second specific team for the coral levels
    const teamL1Max2 = specificTeamFunctions.teleopCoralSummery(scoutingData, team2Number).maxL1Score;
    const teamL2Max2 = specificTeamFunctions.teleopCoralSummery(scoutingData, team2Number).maxL2Score;
    const teamL3Max2 = specificTeamFunctions.teleopCoralSummery(scoutingData, team2Number).maxL3Score;
    const teamL4Max2 = specificTeamFunctions.teleopCoralSummery(scoutingData, team2Number).maxL4Score;

    // max values for all teams for the coral levels
    const allL1Max = allTeamsFunctions.coralHeightSummeryCompetition(scoutingData).maxL1;
    const allL2Max = allTeamsFunctions.coralHeightSummeryCompetition(scoutingData).maxL2;
    const allL3Max = allTeamsFunctions.coralHeightSummeryCompetition(scoutingData).maxL3;
    const allL4Max = allTeamsFunctions.coralHeightSummeryCompetition(scoutingData).maxL4;

    // normalize each category's data to its own maximum value
    const normalizeValue = (value, max) => max > 0 ? (value / max) * 100 : 0;

    const data = [
        {
            subject: 'L1',
            [`Team ${team1Number} Max`]: normalizeValue(teamL1Max, allL1Max),
            [`Team ${team2Number} Max`]: normalizeValue(teamL1Max2, allL1Max),
        },
        {
            subject: 'L2',
            [`Team ${team1Number} Max`]: normalizeValue(teamL2Max, allL2Max),
            [`Team ${team2Number} Max`]: normalizeValue(teamL2Max2, allL2Max),
        },
        {
            subject: 'L3',
            [`Team ${team1Number} Max`]: normalizeValue(teamL3Max, allL3Max),
            [`Team ${team2Number} Max`]: normalizeValue(teamL3Max2, allL3Max),
        },
        {
            subject: 'L4',
            [`Team ${team1Number} Max`]: normalizeValue(teamL4Max, allL4Max),
            [`Team ${team2Number} Max`]: normalizeValue(teamL4Max2, allL4Max),
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
        showRadiusAxis: false,
        customLabels: {
            'L1': 'L1',
            'L2': 'L2',
            'L3': 'L3',
            'L4': 'L4',
        },
        gridType: 'polygon',
        showTooltip: false,
        title: 'Coral Height Comparison',
    };
};

// =======================================================================

// princess functions

export const princessTableConfig = (princessData, teamNumber) => {
    return {
        data: specificTeamFunctions.princessTable(princessData, teamNumber),
        title: `Princess Data for Team ${teamNumber}`,
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
                label: 'Princess Name',
            },
            {
                key: 'comment',
                label: 'Text',
            },
        ],
        tableSettings: {
            showGridlines: true,
            responsive: true,
            maintainAspectRatio: true,
            enableSorting: true, 
            sortBy: 'matchNumber', 
            sortOrder: 'ascending',
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
}
import * as functions from './functions.js';

// general chart configs

export const averageMatchScoreConfig = (scoutingData) => ({
    data: functions.matchTeamAverages(scoutingData),
    title: 'Match Averages by Team',
    scoringTypes: [
        {
            key: 'averageCoralScore',
            label: 'Average Coral Scored',
            color: '#3498db',
            stacked: true,
            name: 'Match Coral Scored',
        },
        {
            key: 'averageAlgaeScore',
            label: 'Average Algae Scored',
            color: '#1ed760',
            stacked: true,
            name: 'Match Average Algae Scored',
        }
    ],
    xKey: 'teamNumber',
    yKey: 'averageScore',
    xAxisLabel: 'Team Number',
    yAxisLabel: 'Average Scored',
});

export const maxMatchScoreConfig = (scoutingData) => ({
    data: functions.matchTeamMax(scoutingData),
    title: 'Match Maxes by Team',
    scoringTypes: [
        {
            key: 'maxCoralScore',
            label: 'Max Coral Scored',
            color: '#e74c3c',
            stacked: true,
            name: 'Match Max Coral Scored',
        },
        {
            key: 'maxAlgaeScore',
            label: 'Max Algae Scored',
            color: '#c652b8',
            stacked: true,
            name: 'Match Max Algae Scored',
        }
    ],
    xKey: 'teamNumber',
    yKey: 'maxScore',
    xAxisLabel: 'Team Number',
    yAxisLabel: 'Max Scored',
});

// autonomous chart configs

export const autoCoralAveragesConfig = (scoutingData) => ({
    data: functions.autoAveragesCoral(scoutingData),
    title: 'Autonomous Coral Averages by Team',
    scoringTypes: [
        {
            key: 'averageCoralL4Score',
            label: 'Average Coral Scored',
            color: '#080660',
            stacked: true,
            name: 'Autonomous Coral L4 Scored',
        },
        {
            key: 'averageCoralL3Score',
            label: 'Average Coral Scored',
            color: '#415a81',
            stacked: true,
            name: 'Autonomous Coral L3 Scored',
        },
        {
            key: 'averageCoralL2Score',
            label: 'Average Coral Scored',
            color: '#2878b8',
            stacked: true,
            name: 'Autonomous Coral L2 Scored',
        },
        {
            key: 'averageCoralL1Score',
            label: 'Average Coral Scored',
            color: '#9ae0f0',
            stacked: true,
            name: 'Autonomous Coral L1 Scored',
        }
    ],
    xKey: 'teamNumber',
    yKey: 'averageScore',
    xAxisLabel: 'Team Number',
    yAxisLabel: 'Average Scored',
});

export const autoCoralMaxesConfig = (scoutingData) => ({
    data: functions.autoMaxesCoral(scoutingData),
    title: 'Autonomous Coral Maxes by Team',
    scoringTypes: [
        {
            key: 'maxCoralL4Score',
            label: 'Max Coral L4 Scored',
            color: '#f1c40f',
            stacked: true,
            name: 'Autonomous Max L4 Coral Scored',
        },
        {
            key: 'maxCoralL3Score',
            label: 'Max Coral L3 Scored',
            color: '#e67e22',
            stacked: true,
            name: 'Autonomous Max L3 Coral Scored',
        },
        {
            key: 'maxCoralL2Score',
            label: 'Max Coral L2 Scored',
            color: '#e74c3c',
            stacked: true,
            name: 'Autonomous Max L2 Coral Scored',
        },
        {
            key: 'maxCoralL1Score',
            label: 'Max Coral L1 Scored',
            color: '#b33b2e',
            stacked: true,
            name: 'Autonomous Max L1 Coral Scored',
        }
    ],
    xKey: 'teamNumber',
    yKey: 'maxScore',
    xAxisLabel: 'Team Number',
    yAxisLabel: 'Max Scored',
});

export const autoAlgaeAveragesConfig = (scoutingData) => ({
    data: functions.autoAveragesAlgae(scoutingData),
    title: 'Autonomous Algae Averages by Team',
    scoringTypes: [
        {
            key: 'averageAlgaeScore',
            label: 'Average auto Algae Scored',
            color: '#1ed760',
            stacked: true,
            name: 'Average auto Algae Scored',
        }
    ],
    xKey: 'teamNumber',
    yKey: 'averageAlgaeScore',
    xAxisLabel: 'Team Number',
    yAxisLabel: 'Average Scored',
});

export const autoAlgaeMaxesConfig = (scoutingData) => ({
    data: functions.autoMaxesAlgae(scoutingData),
    title: 'Autonomous Algae Maxes by Team',
    scoringTypes: [
        {
            key: 'maxAlgaeScore',
            label: 'Max Algae Scored',
            color: '#c652b8',
            stacked: true,
            name: 'Max Algae Scored',
        }
    ],
    xKey: 'teamNumber',
    yKey: 'maxAlgaeScore',
    xAxisLabel: 'Team Number',
    yAxisLabel: 'Max Scored',
});

export const autoCoralScorePercentageConfig = (scoutingData) => ({
    data: functions.autoCoralScorePrecentage(scoutingData),
    title: 'Autonomous Coral Scored Percentage by Team',
    scoringTypes: [
        {
            key: 'precentInAuto',
            label: 'Coral Scored Percentage',
            color: '#3498db',
            stacked: true,
            name: 'Coral Scored Percentage',
        }
    ],
    xKey: 'teamNumber',
    yKey: 'precentInAuto',
    xAxisLabel: 'Team Number',
    yAxisLabel: 'Percentage',
    yAxisMax: 100,
});

export const autoLeftStartingLineConfig = (scoutingData) => ({
    data: functions.autoLeftStartingLine(scoutingData),
    title: 'Autonomous Left Starting Line Percentage by Team',
    scoringTypes: [
        {
            key: 'moved',
            label: 'Left Starting Line',
            color: '#e67e22',
            stacked: true,
            name: 'Left Starting Line',
        }
    ],
    xKey: 'teamNumber',
    yKey: 'moved',
    xAxisLabel: 'Team Number',
    yAxisLabel: 'Percentage',
    yAxisMax: 100,
});

// teleop chart configs

export const teleopCoralAveragesConfig = (scoutingData) => ({
    data: functions.teleopAverageCoral(scoutingData),
    title: 'Teleop Coral Averages by Team',
    scoringTypes: [
        {
            key: 'averageCoralL4Score',
            label: 'Average Coral Scored',
            color: '#aee5ff',
            stacked: true,
            name: 'Teleop Coral L4 Scored',
        },
        {
            key: 'averageCoralL3Score',
            label: 'Average Coral Scored',
            color: '#82ccdd',
            stacked: true,
            name: 'Teleop Coral L3 Scored',
        },
        {
            key: 'averageCoralL2Score',
            label: 'Average Coral Scored',
            color: '#6e93cc',
            stacked: true,
            name: 'Teleop Coral L2 Scored',
        },
        {
            key: 'averageCoralL1Score',
            label: 'Average Coral Scored',
            color: '#526e99',
            stacked: true,
            name: 'Teleop Coral L1 Scored',
        }
    ],
    xKey: 'teamNumber',
    yKey: 'averageScore',
    xAxisLabel: 'Team Number',
    yAxisLabel: 'Average Scored',
});

export const teleopCoralMaxesConfig = (scoutingData) => ({
    data: functions.teleopMaxCoral(scoutingData),
    title: 'Teleop Coral Maxes by Team',
    scoringTypes: [
        {
            key: 'maxCoralL4Score',
            label: 'Max Coral L4 Scored',
            color: '#f1c40f',
            stacked: true,
            name: 'Teleop Max L4 Coral Scored',
        },
        {
            key: 'maxCoralL3Score',
            label: 'Max Coral L3 Scored',
            color: '#e67e22',
            stacked: true,
            name: 'Teleop Max L3 Coral Scored',
        },
        {
            key: 'maxCoralL2Score',
            label: 'Max Coral L2 Scored',
            color: '#e74c3c',
            stacked: true,
            name: 'Teleop Max L2 Coral Scored',
        },
        {
            key: 'maxCoralL1Score',
            label: 'Max Coral L1 Scored',
            color: '#b33b2e',
            stacked: true,
            name: 'Teleop Max L1 Coral Scored',
        }
    ],
    xKey: 'teamNumber',
    yKey: 'maxScore',
    xAxisLabel: 'Team Number',
    yAxisLabel: 'Max Scored',
});

export const teleopAlgaeAveragesConfig = (scoutingData) => ({
    data: functions.teleopAverageAlgae(scoutingData),
    title: 'Teleop Algae Averages by Team',
    scoringTypes: [
        {
            key: 'averageAlgaeProcessorScore',
            label: 'Average Algae Processor Scored',
            color: '#138a3d',
            stacked: true,
            name: 'Teleop Algae Processor Scored',
        },
        {
            key: 'averageAlgaeBargeScore',
            label: 'Average Algae Barge Scored',
            color: '#1ed760',
            stacked: true,
            name: 'Teleop Algae Barge Scored',
        }
    ],
    xKey: 'teamNumber',
    yKey: 'averageAlgaeScore',
    xAxisLabel: 'Team Number',
    yAxisLabel: 'Average Scored',
});

export const teleopAlgaeMaxesConfig = (scoutingData) => ({
    data: functions.teleopMaxAlgae(scoutingData),
    title: 'Teleop Algae Maxes by Team',
    scoringTypes: [
        {
            key: 'maxAlgaeProcessorScore',
            label: 'Max Algae Processor Scored',
            color: '#138a3d',
            stacked: true,
            name: 'Teleop Max Algae Processor Scored',
        },
        {
            key: 'maxAlgaeBargeScore',
            label: 'Max Algae Barge Scored',
            color: '#1ed760',
            stacked: true,
            name: 'Teleop Max Algae Barge Scored',
        }
    ],
    xKey: 'teamNumber',
    yKey: 'maxAlgaeScore',
    xAxisLabel: 'Team Number',
    yAxisLabel: 'Max Scored',
});

export const teleopCoralScorePercentageConfig = (scoutingData) => ({
    data: functions.teleopCoralScorePrecentage(scoutingData),
    title: 'Teleop Coral Scored Percentage by Team (No L1)',
    scoringTypes: [
        {
            key: 'precentInTeleop',
            label: 'Coral Scored Percentage',
            color: '#3498db',
            stacked: true,
            name: 'Coral Scored Percentage',
        }
    ],
    xKey: 'teamNumber',
    yKey: 'precentInTeleop',
    xAxisLabel: 'Team Number',
    yAxisLabel: 'Percentage',
    yAxisMax: 100,
});

export const teleopRemovedAlgaeFromReefConfig = (scoutingData) => ({
    data: functions.teleopRemovedAlgaeFromReef(scoutingData),
    title: 'Algae Removed from Reef by Team',
    scoringTypes: [
        {
            key: 'removedAlgaeFromReef',
            label: 'Algae Removed',
            color: '#1ed760',
            name: 'Algae Removed',
        }
    ],
    xKey: 'teamNumber',
    yKey: 'removedAlgaeFromReef',
    xAxisLabel: 'Team Number',
    yAxisLabel: 'Algae Removed',
});

export const teleopSummeryConfig = (scoutingData) => {
    const {
        averageCoralScore,
        averageAlgaeScore,
        maxCoralScore,
        maxAlgaeScore,
        averageAlgaeRemovedFromReef,
        maxAlgaeRemovedFromReef,
        averageCoralPrecent,
        maxCoralPrecent,
    } = functions.teleopSummeryCompetition(scoutingData);

    return {
        mainTitle: `Teleop Stats Competition Wide`,
        values: [
            {
                color: "#c4162a",
                title: "Average / Max Coral Scored",
                min: 0,
                max: maxCoralScore,
                value: averageCoralScore,
            },
            {
                color: "#6e93cc",
                title: "Average / Max Coral Percent In",
                min: 0,
                max: maxCoralPrecent,
                value: averageCoralPrecent,
            },
            {
                color: "#1ed760",
                title: "Average / Max Algae Scored",
                min: 0,
                max: maxAlgaeScore,
                value: averageAlgaeScore,
            },
            {
                color: "#9c1ee9",
                title: "Average / Max Algae Removed From Reef",
                min: 0,
                max: maxAlgaeRemovedFromReef,
                value: averageAlgaeRemovedFromReef,
            },
        ],
    };
};
// endgame chart configs

export const endgameClimbPercentByTeamConfig = (scoutingData) => ({
    data: functions.endgameClimbData(scoutingData),
    title: 'Endgame Climb Percent By Team',
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
            color: '#fff258',
            stacked: true,
            name: 'Failed Deep Climb',
        },
        {
            key: 'Sc',
            label: 'Shallow Climb',
            color: '#82ca9d',
            stacked: true,
            name: 'Shallow Climb',
        },
        {
            key: 'Dc',
            label: 'Deep Climb',
            color: '#8884d8',
            stacked: true,
            name: 'Deep Climb',
        },
    ],
    xKey: 'teamNumber',
    yKey: 'scoreForSort',
    xAxisLabel: 'Team Number',
    yAxisLabel: 'Percentage',
    yAxisMin: 0,
    yAxisMax: 100,
});

// =======================================================================

// princess functions

export const princessTableConfig = (princessData, teamNumber) => {
    return {
        data: functions.princessTable(princessData),
        title: `Princess Data For All Teams`,
        columns: [
            {
                key: 'submissionTime',
                label: 'Submission Time',
            },
            {
                key: 'teamNumber',
                label: 'Team Number'
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
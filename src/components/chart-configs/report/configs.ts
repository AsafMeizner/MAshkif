import * as reportFunctions from './functions';

export const allianceFocusPoints = (scoutingData, teamNumbers, title, color) => {
    const allianceMaxPoints = reportFunctions.allianceMaxPoints(scoutingData, teamNumbers[0], teamNumbers[1], teamNumbers[2]);
    const allianceRpPoints = reportFunctions.allianceRpFocusPoints(scoutingData, teamNumbers[0], teamNumbers[1], teamNumbers[2]);

    const maxPoints = Math.max(allianceMaxPoints, allianceRpPoints);

    return {
        mainTitle: title,
        showPercentage: true,
        showOutOf: false,
        values: [
            {
                color: color,
                title: 'Alliance Max Points',
                min: 0,
                max: Math.round(maxPoints * 100) / 100,
                value: Math.round(allianceMaxPoints * 100) / 100,
            },
            {
                color: color,
                title: 'Alliance RP Focus Points',
                min: 0,
                max: Math.round(maxPoints * 100) / 100,
                value: Math.round(allianceRpPoints * 100) / 100,
            }
        ],
    }
}

export const averageAutoCoral = (scoutingData, teamNumbers, title, color) => {
    const team1Average = reportFunctions.averageAutonomousCoralScore(scoutingData, teamNumbers[0]);
    const team2Average = reportFunctions.averageAutonomousCoralScore(scoutingData, teamNumbers[1]);
    const team3Average = reportFunctions.averageAutonomousCoralScore(scoutingData, teamNumbers[2]);
    const alianceAverage = (team1Average + team2Average + team3Average);

    const team1Max = reportFunctions.maxAutonomousCoralScore(scoutingData, teamNumbers[0]);
    const team2Max = reportFunctions.maxAutonomousCoralScore(scoutingData, teamNumbers[1]);
    const team3Max = reportFunctions.maxAutonomousCoralScore(scoutingData, teamNumbers[2]);
    const alianceMax = team1Max + team2Max + team3Max;

    return {
        mainTitle: title,
        values: [
            {
                color: color,
                title: 'Aliance',
                min: 0,
                max: Math.round(alianceMax * 100) / 100,
                value: Math.round(alianceAverage * 100) / 100,
            },
            {
                color: color,
                title: teamNumbers[0].toString(),
                min: 0,
                max: Math.round(team1Max * 100) / 100,
                value: Math.round(team1Average * 100) / 100,
            },
            {
                color: color,
                title: teamNumbers[1].toString(),
                min: 0,
                max: Math.round(team2Max * 100) / 100,
                value: Math.round(team2Average * 100) / 100,
            },
            {
                color: color,
                title: teamNumbers[2].toString(),
                min: 0,
                max: Math.round(team3Max * 100) / 100,
                value: Math.round(team3Average * 100) / 100,
            },
        ],
    }
}

export const averageTeleopCoral = (scoutingData, teamNumbers, title, color) => {
    const team1Average = reportFunctions.averageTeleopCoralScore(scoutingData, teamNumbers[0]);
    const team2Average = reportFunctions.averageTeleopCoralScore(scoutingData, teamNumbers[1]);
    const team3Average = reportFunctions.averageTeleopCoralScore(scoutingData, teamNumbers[2]);
    const alianceAverage = (team1Average + team2Average + team3Average);

    const team1Max = reportFunctions.maxTeleopCoralScore(scoutingData, teamNumbers[0]);
    const team2Max = reportFunctions.maxTeleopCoralScore(scoutingData, teamNumbers[1]);
    const team3Max = reportFunctions.maxTeleopCoralScore(scoutingData, teamNumbers[2]);
    const alianceMax = team1Max + team2Max + team3Max;

    return {
        mainTitle: title,
        values: [
            {
                color: color,
                title: 'Aliance',
                min: 0,
                max: Math.round(alianceMax * 100) / 100,
                value: Math.round(alianceAverage * 100) / 100,
            },
            {
                color: color,
                title: teamNumbers[0].toString(),
                min: 0,
                max: Math.round(team1Max * 100) / 100,
                value: Math.round(team1Average * 100) / 100,
            },
            {
                color: color,
                title: teamNumbers[1].toString(),
                min: 0,
                max: Math.round(team2Max * 100) / 100,
                value: Math.round(team2Average * 100) / 100,
            },
            {
                color: color,
                title: teamNumbers[2].toString(),
                min: 0,
                max: Math.round(team3Max * 100) / 100,
                value: Math.round(team3Average * 100) / 100,
            },
        ],
    }
}

export const alliancePerHeightAverages = (scoutingData, teamNumbers, title, color1, color2, color3) => {
    const heightAverages = reportFunctions.averageCoralPerHeight(scoutingData, teamNumbers[0], teamNumbers[1], teamNumbers[2]);
    const team1Averages = heightAverages[0];
    const team2Averages = heightAverages[1];
    const team3Averages = heightAverages[2];

    return {
        mainTitle: title,
        pieCharts: [
            {
                title: "L1",
                data: [
                    { name: teamNumbers[0], value: team1Averages[0] },
                    { name: teamNumbers[1], value: team2Averages[0] },
                    { name: teamNumbers[2], value: team3Averages[0] },
                ],
                scoringTypes: [
                    { key: teamNumbers[0], label: teamNumbers[0], color: color1, name: teamNumbers[0] },
                    { key: teamNumbers[1], label: teamNumbers[1], color: color2, name: teamNumbers[1] },
                    { key: teamNumbers[2], label: teamNumbers[2], color: color3, name: teamNumbers[2] },
                ],
            },
            {
                title: "L2",
                data: [
                    { name: teamNumbers[0], value: team1Averages[1] },
                    { name: teamNumbers[1], value: team2Averages[1] },
                    { name: teamNumbers[2], value: team3Averages[1] },
                ],
                scoringTypes: [
                    { key: teamNumbers[0], label: teamNumbers[0], color: color1, name: teamNumbers[0] },
                    { key: teamNumbers[1], label: teamNumbers[1], color: color2, name: teamNumbers[1] },
                    { key: teamNumbers[2], label: teamNumbers[2], color: color3, name: teamNumbers[2] },
                ],
            },
            {
                title: "L3",
                data: [
                    { name: teamNumbers[0], value: team1Averages[2] },
                    { name: teamNumbers[1], value: team2Averages[2] },
                    { name: teamNumbers[2], value: team3Averages[2] },
                ],
                scoringTypes: [
                    { key: teamNumbers[0], label: teamNumbers[0], color: color1, name: teamNumbers[0] },
                    { key: teamNumbers[1], label: teamNumbers[1], color: color2, name: teamNumbers[1] },
                    { key: teamNumbers[2], label: teamNumbers[2], color: color3, name: teamNumbers[2] },
                ],
            },
            {
                title: "L4",
                data: [
                    { name: teamNumbers[0], value: team1Averages[3] },
                    { name: teamNumbers[1], value: team2Averages[3] },
                    { name: teamNumbers[2], value: team3Averages[3] },
                ],
                scoringTypes: [
                    { key: teamNumbers[0], label: teamNumbers[0], color: color1, name: teamNumbers[0] },
                    { key: teamNumbers[1], label: teamNumbers[1], color: color2, name: teamNumbers[1] },
                    { key: teamNumbers[2], label: teamNumbers[2], color: color3, name: teamNumbers[2] },
                ],
            },
        ],
    }
};

export const averageTeleopAlgae = (scoutingData, teamNumbers, title, color) => {
    const team1Average = reportFunctions.AlgaeTeleOpAverage(scoutingData, teamNumbers[0]);
    const team2Average = reportFunctions.AlgaeTeleOpAverage(scoutingData, teamNumbers[1]);
    const team3Average = reportFunctions.AlgaeTeleOpAverage(scoutingData, teamNumbers[2]);
    const alianceAverage = (team1Average + team2Average + team3Average);

    const team1Max = reportFunctions.AlgaeTeleOpMax(scoutingData, teamNumbers[0]);
    const team2Max = reportFunctions.AlgaeTeleOpMax(scoutingData, teamNumbers[1]);
    const team3Max = reportFunctions.AlgaeTeleOpMax(scoutingData, teamNumbers[2]);
    const alianceMax = team1Max + team2Max + team3Max;

    return {
        mainTitle: title,
        values: [
            {
                color: color,
                title: 'Aliance',
                min: 0,
                max: Math.round(alianceMax * 100) / 100,
                value: Math.round(alianceAverage * 100) / 100,
            },
            {
                color: color,
                title: teamNumbers[0].toString(),
                min: 0,
                max: Math.round(team1Max * 100) / 100,
                value: Math.round(team1Average * 100) / 100,
            },
            {
                color: color,
                title: teamNumbers[1].toString(),
                min: 0,
                max: Math.round(team2Max * 100) / 100,
                value: Math.round(team2Average * 100) / 100,
            },
            {
                color: color,
                title: teamNumbers[2].toString(),
                min: 0,
                max: Math.round(team3Max * 100) / 100,
                value: Math.round(team3Average * 100) / 100,
            },
        ],
    }
}

export const averageClimbPoints = (scoutingData, teamNumbers, title, color) => {
    const team1Average = reportFunctions.averageClimbPoints(scoutingData, teamNumbers[0]);
    const team2Average = reportFunctions.averageClimbPoints(scoutingData, teamNumbers[1]);
    const team3Average = reportFunctions.averageClimbPoints(scoutingData, teamNumbers[2]);
    const alianceAverage = (team1Average + team2Average + team3Average);

    const team1Max = reportFunctions.maxClimbPoints(scoutingData, teamNumbers[0]);
    const team2Max = reportFunctions.maxClimbPoints(scoutingData, teamNumbers[1]);
    const team3Max = reportFunctions.maxClimbPoints(scoutingData, teamNumbers[2]);
    const alianceMax = team1Max + team2Max + team3Max;

    return {
        mainTitle: title,
        values: [
            {
                color: color,
                title: 'Aliance',
                min: 0,
                max: Math.round(alianceMax * 100) / 100,
                value: Math.round(alianceAverage * 100) / 100,
            },
            {
                color: color,
                title: teamNumbers[0].toString(),
                min: 0,
                max: Math.round(team1Max * 100) / 100,
                value: Math.round(team1Average * 100) / 100,
            },
            {
                color: color,
                title: teamNumbers[1].toString(),
                min: 0,
                max: Math.round(team2Max * 100) / 100,
                value: Math.round(team2Average * 100) / 100,
            },
            {
                color: color,
                title: teamNumbers[2].toString(),
                min: 0,
                max: Math.round(team3Max * 100) / 100,
                value: Math.round(team3Average * 100) / 100,
            },
        ],
    }
}
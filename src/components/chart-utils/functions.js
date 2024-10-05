export const teleopTeamAverages = (scoutingData) => {
    const teamScores = scoutingData.reduce((acc, entry) => {
        const team = entry.teamNumber;

        if (!acc[team]) {
            acc[team] = { teamNumber: team, totalScore: 0, count: 0 };
        }

        const totalScore = entry.tsc + entry.tamps;

        acc[team].totalScore += totalScore;
        acc[team].count += 1;

        return acc;
    }, {});

    return Object.values(teamScores).map(team => ({
        teamNumber: team.teamNumber,
        averageScore: Math.round((team.totalScore / team.count) * 100) / 100
    }));
};

export const teleopTeamMax = (scoutingData) => {
    const teamScores = scoutingData.reduce((acc, entry) => {
        const team = entry.teamNumber;

        if (!acc[team]) {
            acc[team] = { teamNumber: team, maxScore: 0 };
        }

        const totalScore = entry.tsc + entry.tamps;
        acc[team].maxScore = Math.max(acc[team].maxScore, totalScore); 

        return acc;
    }, {});

    return Object.values(teamScores).map(team => ({
        teamNumber: team.teamNumber,
        maxScore: team.maxScore,
    }));
};

export const matchTeamAverages = (scoutingData) => {
    const teamScores = scoutingData.reduce((acc, entry) => {
        const team = entry.teamNumber;

        if (!acc[team]) {
            acc[team] = { teamNumber: team, totalScore: 0, count: 0 };
        }

        const totalScore = entry.tsc + entry.tamps + entry.ausc;

        acc[team].totalScore += totalScore;
        acc[team].count += 1;

        return acc;
    }, {});

    return Object.values(teamScores).map(team => ({
        teamNumber: team.teamNumber,
        averageScore: Math.round((team.totalScore / team.count) * 100) / 100
    }));
};

export const matchTeamMax = (scoutingData) => {
    const teamScores = scoutingData.reduce((acc, entry) => {
        const team = entry.teamNumber;

        if (!acc[team]) {
            acc[team] = { teamNumber: team, maxScore: 0 };
        }

        const totalScore = entry.tsc + entry.tamps + entry.ausc;
        acc[team].maxScore = Math.max(acc[team].maxScore, totalScore); 

        return acc;
    }, {});

    return Object.values(teamScores).map(team => ({
        teamNumber: team.teamNumber,
        maxScore: team.maxScore,
    }));
};

export const autonomousSpeakerTeamAverages = (scoutingData) => {
    const teamScores = scoutingData.reduce((acc, entry) => {
        const team = entry.teamNumber;

        if (!acc[team]) {
            acc[team] = { teamNumber: team, totalScore: 0, count: 0 };
        }

        const totalScore = entry.ausc;

        acc[team].totalScore += totalScore;
        acc[team].count += 1;

        return acc;
    }
    , {});

    return Object.values(teamScores).map(team => ({
        teamNumber: team.teamNumber,
        averageScore: Math.round((team.totalScore / team.count) * 100) / 100
    }));
};

export const autonomousSpeakerTeamMax = (scoutingData) => {
    const teamScores = scoutingData.reduce((acc, entry) => {
        const team = entry.teamNumber;

        if (!acc[team]) {
            acc[team] = { teamNumber: team, maxScore: 0 };
        }

        const totalScore = entry.ausc;
        acc[team].maxScore = Math.max(acc[team].maxScore, totalScore); 

        return acc;
    }, {});

    return Object.values(teamScores).map(team => ({
        teamNumber: team.teamNumber,
        maxScore: team.maxScore,
    }));
};

export const autonomousMovedTeamAverages = (scoutingData) => {
    const teamScores = scoutingData.reduce((acc, entry) => {
        const team = entry.teamNumber;

        if (!acc[team]) {
            acc[team] = { teamNumber: team, totalScore: 0, count: 0 };
        }

        const totalScore = entry.Mved ? 1 : 0; 

        acc[team].totalScore += totalScore;
        acc[team].count += 1;

        return acc;
    }, {});

    return Object.values(teamScores).map(team => ({
        teamNumber: team.teamNumber,
        averageScore: Math.round((team.totalScore / team.count) * 100) / 100 
    }));
};

export const autonomousFoulTeamAverages = (scoutingData) => {
    const teamScores = scoutingData.reduce((acc, entry) => {
        const team = entry.teamNumber;

        if (!acc[team]) {
            acc[team] = { teamNumber: team, totalScore: 0, count: 0 };
        }

        const totalScore = entry.auf;

        acc[team].totalScore += totalScore;
        acc[team].count += 1;

        return acc;
    }, {});

    return Object.values(teamScores).map(team => ({
        teamNumber: team.teamNumber,
        averageScore: Math.round((team.totalScore / team.count) * 100) / 100
    }));
}

export const autonomousFoulTeamMax = (scoutingData) => {
    const teamScores = scoutingData.reduce((acc, entry) => {
        const team = entry.teamNumber;

        if (!acc[team]) {
            acc[team] = { teamNumber: team, maxScore: 0 };
        }

        const totalScore = entry.auf;
        acc[team].maxScore = Math.max(acc[team].maxScore, totalScore); 

        return acc;
    }, {});

    return Object.values(teamScores).map(team => ({
        teamNumber: team.teamNumber,
        maxScore: team.maxScore,
    }));
};

export const autonomousSpeakerAccuracyTeamAverages = (scoutingData) => {
    // percent of shots made, auskpm = missed shots, ausc = made shots
    const teamScores = scoutingData.reduce((acc, entry) => {
        const team = entry.teamNumber;

        if (!acc[team]) {
            acc[team] = { teamNumber: team, totalScore: 0, count: 0 };
        }

        const totalAttempts = entry.ausc + entry.auskpm;

        // Only calculate score if there were any attempts
        if (totalAttempts > 0) {
            const totalScore = entry.ausc / totalAttempts;
            acc[team].totalScore += totalScore;
            acc[team].count += 1;
        }

        return acc;
    }, {});

    return Object.values(teamScores).map(team => ({
        teamNumber: team.teamNumber,
        averageScore: team.count > 0 
            ? Math.round((team.totalScore / team.count) * 100) / 100 
            : 0 // If no valid data, return 0
    }));
};
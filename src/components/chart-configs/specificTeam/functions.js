/*
Pre-Match:

scouter - Scouter Name
matchNumber - Match Number
teamNumber - Team Number
noShow - No Show?
Autonomous:

Mved - Left Starting Line
L1sc - L1 scored auto
L2sc - L2 scored auto
L3sc - L3 scored auto
L4sc - L4 scored auto
L1ms - L1 missed auto
L2ms - L2 missed auto
L3ms - L3 missed auto
L4ms - L4 missed auto
InG - Coral Ground (Collection in auto)
InS - Coral Source (Collection in auto)
RmAr - Algae Reef (Collection in auto)
RmAg - Algae Ground (Collection in auto)
ScAb - Scored Algae in Barge (auto)
ScAp - Scored Algae in Processor (auto)
TeleOp:

tL1sc - L1 scored TeleOp
tL2sc - L2 scored TeleOp
tL3sc - L3 scored TeleOp
tL4sc - L4 scored TeleOp
tL1ms - L1 missed TeleOp
tL2ms - L2 missed TeleOp
tL3ms - L3 missed TeleOp
tL4ms - L4 missed TeleOp
tInG - Coral Ground (Collection in TeleOp)
tInS - Coral Source (Collection in TeleOp)
tRmAr - Algae Reef (Collection in TeleOp)
tRmAg - Algae Ground (Collection in TeleOp)
tScAb - Scored Algae in Barge (TeleOp)
tScAp - Scored Algae in Processor (TeleOp)
Fou - TeleOp fouls (עבירות טלאופ)
End Game:

epo - End State
Post-Match:

dto - Flipped/Fell Over
yc - Yellow/Red Card
co - Notes
*/

// General
export function matchScoreByRound(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((data) => data.teamNumber === teamNumber);

    if (!teamData.length) { return []; }

    const scoresByRound = teamData.map((entry) => {
        const roundNumber = entry.matchNumber;
        const algeeScore = (entry.tScAb || 0) + (entry.tScAp || 0) + (entry.ScAb || 0) + (entry.ScAp || 0);
        const coralScore = (entry.tL1sc || 0) + (entry.tL2sc || 0) + (entry.tL3sc || 0) + (entry.tL4sc || 0) + (entry.L1sc || 0) + (entry.L2sc || 0) + (entry.L3sc || 0) + (entry.L4sc || 0);
        const totalScore = algeeScore + coralScore;

        return {
            roundNumber,
            totalScore,
            algeeScore,
            coralScore
        };
    });
    scoresByRound.sort((a, b) => a.roundNumber - b.roundNumber);

    return scoresByRound;
}

export function scoresSummery(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((entry) => entry.teamNumber === teamNumber);

    if (!teamData.length) { return 0; }

    const totalCoralScore = teamData.reduce((acc, entry) => {
        const matchCoralScore = (entry.L1sc || 0) + (entry.L2sc || 0) + (entry.L3sc || 0) + (entry.L4sc || 0) + (entry.tL1sc || 0) + (entry.tL2sc || 0) + (entry.tL3sc || 0) + (entry.tL4sc || 0);
        return acc + matchCoralScore;
    }, 0);

    const averageCoralScore = totalCoralScore / teamData.length;

    const totalAlgeeScore = teamData.reduce((acc, entry) => {
        const matchAlgeeScore = (entry.ScAb || 0) + (entry.ScAp || 0) + (entry.tScAb || 0) + (entry.tScAp || 0);
        return acc + matchAlgeeScore;
    }, 0);

    const averageAlgeeScore = totalAlgeeScore / teamData.length;

    const maxCoralScore = teamData.reduce((acc, entry) => {
        const matchCoralScore = (entry.L1sc || 0) + (entry.L2sc || 0) + (entry.L3sc || 0) + (entry.L4sc || 0) + (entry.tL1sc || 0) + (entry.tL2sc || 0) + (entry.tL3sc || 0) + (entry.tL4sc || 0);
        return Math.max(acc, matchCoralScore);
    }, 0);

    const maxAlgeeScore = teamData.reduce((acc, entry) => {
        const matchAlgeeScore = (entry.ScAb || 0) + (entry.ScAp || 0) + (entry.tScAb || 0) + (entry.tScAp || 0);
        return Math.max(acc, matchAlgeeScore);
    }, 0);

    const totalFouls = teamData.reduce((acc, entry) => {
        return acc + (entry.fouls || 0);
    }, 0);

    const averageFouls = totalFouls / teamData.length;

    const maxFouls = teamData.reduce((acc, entry) => {
        return Math.max(acc, entry.fouls || 0);
    }, 0);

    return {
        averageCoralScore,
        averageAlgeeScore,
        maxCoralScore,
        maxAlgeeScore,
        averageFouls,
        maxFouls
    }
}

export function generalPerTeamTable(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((data) => data.teamNumber === teamNumber);

    if (!teamData.length) {
        return [];
    }

    const formattedData = teamData.map((entry) => ({
        submissionTime: new Date(entry.submissionTime).toLocaleString(),
        matchNumber: entry.matchNumber,
        scouter: entry.scouter,
        comment: entry.co || 'No Comment',
        fouls: entry.fouls || 0,
        showedUp: entry.noShow ? 'No' : 'Yes',
        diedOrTippedOver: entry.dto ? 'Yes' : 'No',
    }));

    formattedData.sort((a, b) => a.matchNumber - b.matchNumber);

    return formattedData;
}

// Autonomous

export function autonomousAverageByMatch(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((data) => data.teamNumber === teamNumber);

    if (!teamData.length) { return []; }

    const autonomousData = teamData.map((entry) => {
        const matchNumber = entry.matchNumber;
        const algeeScore = (entry.ScAb || 0) + (entry.ScAp || 0);
        const algeeProcessorScore = (entry.ScAp || 0);
        const algeeBargeScore = (entry.ScAb || 0);
        const coralScore = (entry.L1sc || 0) + (entry.L2sc || 0) + (entry.L3sc || 0) + (entry.L4sc || 0);
        const l1Score = (entry.L1sc || 0);
        const l2Score = (entry.L2sc || 0);
        const l3Score = (entry.L3sc || 0);
        const l4Score = (entry.L4sc || 0);
        const totalScore = algeeScore + coralScore;

        return {
            matchNumber,
            totalScore,
            algeeScore,
            algeeProcessorScore,
            algeeBargeScore,
            coralScore,
            l1Score,
            l2Score,
            l3Score,
            l4Score
        };
    });

    autonomousData.sort((a, b) => a.matchNumber - b.matchNumber);

    return autonomousData;
}

export function autonomousSummery(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((entry) => entry.teamNumber === teamNumber);

    if (!teamData.length) { return 0; }

    const totalCoralScore = teamData.reduce((acc, entry) => {
        const matchCoralScore = (entry.L1sc || 0) + (entry.L2sc || 0) + (entry.L3sc || 0) + (entry.L4sc || 0);
        return acc + matchCoralScore;
    }, 0);

    const averageCoralScore = totalCoralScore / teamData.length;

    const totalAlgeeScore = teamData.reduce((acc, entry) => {
        const matchAlgeeScore = (entry.ScAb || 0) + (entry.ScAp || 0);
        return acc + matchAlgeeScore;
    }, 0);

    const averageAlgeeScore = totalAlgeeScore / teamData.length;

    const maxCoralScore = teamData.reduce((acc, entry) => {
        const matchCoralScore = (entry.L1sc || 0) + (entry.L2sc || 0) + (entry.L3sc || 0) + (entry.L4sc || 0);
        return Math.max(acc, matchCoralScore);
    }, 0);

    const maxAlgeeScore = teamData.reduce((acc, entry) => {
        const matchAlgeeScore = (entry.ScAb || 0) + (entry.ScAp || 0);
        return Math.max(acc, matchAlgeeScore);
    }, 0);

    return {
        averageCoralScore,
        averageAlgeeScore,
        maxCoralScore,
        maxAlgeeScore
    }
}

export function autonomousCoralPrecentIn(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((data) => data.teamNumber === teamNumber);

    if (!teamData.length) { return []; }

    const scoresByRound = teamData.map((entry) => {
        const roundNumber = entry.matchNumber;
        const coralL1Precent = entry.L1sc ? ((entry.L1sc || 0) / ((entry.L1sc || 0) + (entry.L1ms || 0))) * 100 : 0;
        const coralL2Precent = entry.L2sc ? ((entry.L2sc || 0) / ((entry.L2sc || 0) + (entry.L2ms || 0))) * 100 : 0;
        const coralL3Precent = entry.L3sc ? ((entry.L3sc || 0) / ((entry.L3sc || 0) + (entry.L3ms || 0))) * 100 : 0;
        const coralL4Precent = entry.L4sc ? ((entry.L4sc || 0) / ((entry.L4sc || 0) + (entry.L4ms || 0))) * 100 : 0;

        return {
            roundNumber,
            coralL1Precent,
            coralL2Precent,
            coralL3Precent,
            coralL4Precent
        };
    });
    scoresByRound.sort((a, b) => a.roundNumber - b.roundNumber);

    return scoresByRound;
}

export function autonomousLeftStartingLine(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((data) => data.teamNumber === teamNumber);

    if (!teamData.length) { return []; }

    const scoresByRound = teamData.map((entry) => {
        const roundNumber = entry.matchNumber;
        const leftStartingLine = entry.Mved ? 1 : 0;

        return {
            roundNumber,
            leftStartingLine
        };
    });

    scoresByRound.sort((a, b) => a.roundNumber - b.roundNumber);

    return scoresByRound;
}

// Teleop

export function teleopAverageByMatch(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((data) => data.teamNumber === teamNumber);

    if (!teamData.length) { return []; }

    const autonomousData = teamData.map((entry) => {
        const matchNumber = entry.matchNumber;
        const algeeScore = (entry.tScAb || 0) + (entry.tScAp || 0);
        const algeeProcessorScore = (entry.tScAp || 0);
        const algeeBargeScore = (entry.tScAb || 0);
        const coralScore = (entry.tL1sc || 0) + (entry.tL2sc || 0) + (entry.tL3sc || 0) + (entry.tL4sc || 0);
        const l1Score = (entry.tL1sc || 0);
        const l2Score = (entry.tL2sc || 0);
        const l3Score = (entry.tL3sc || 0);
        const l4Score = (entry.tL4sc || 0);
        const totalScore = algeeScore + coralScore;

        return {
            matchNumber,
            totalScore,
            algeeScore,
            algeeProcessorScore,
            algeeBargeScore,
            coralScore,
            l1Score,
            l2Score,
            l3Score,
            l4Score
        };
    });

    autonomousData.sort((a, b) => a.matchNumber - b.matchNumber);

    return autonomousData;
}

export function teleopSummery(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((entry) => entry.teamNumber === teamNumber);

    if (!teamData.length) { return 0; }

    const averageCoralScore = teamData.reduce((acc, entry) => {
        const matchCoralScore = (entry.tL1sc || 0) + (entry.tL2sc || 0) + (entry.tL3sc || 0) + (entry.tL4sc || 0);
        return acc + matchCoralScore;
    }, 0) / teamData.length;

    const maxCoralScore = teamData.reduce((acc, entry) => {
        const matchCoralScore = (entry.tL1sc || 0) + (entry.tL2sc || 0) + (entry.tL3sc || 0) + (entry.tL4sc || 0);
        return Math.max(acc, matchCoralScore);
    }, 0);

    const averageAlgeeScore = teamData.reduce((acc, entry) => {
        const matchAlgeeScore = (entry.tScAb || 0) + (entry.tScAp || 0);
        return acc + matchAlgeeScore;
    }, 0) / teamData.length;

    const maxAlgeeScore = teamData.reduce((acc, entry) => {
        const matchAlgeeScore = (entry.tScAb || 0) + (entry.tScAp || 0);
        return Math.max(acc, matchAlgeeScore);
    }, 0);

    const maxAlgeeRemovedFromReef = teamData.reduce((acc, entry) => {
        const matchAlgeeScore = (entry.tRmAr || 0) + (entry.tRmAg || 0);
        return Math.max(acc, matchAlgeeScore);
    }, 0);

    const averageAlgeeRemovedFromReef = (teamData.reduce((acc, entry) => {
        const matchAlgeeScore = (entry.tRmAr || 0) + (entry.tRmAg || 0);
        return acc + matchAlgeeScore;
    }, 0) / teamData.length);

    const maxCoralPrecent = teamData.reduce((acc, entry) => {
        const matchCoralPrecent = (entry.tL1sc + entry.tL2sc + entry.tL3sc + entry.tL4sc) ? ((((entry.tL1sc || 0) + (entry.tL2sc || 0) + (entry.tL3sc || 0) + (entry.tL4sc || 0)) / ((entry.tL1sc || 0) + (entry.tL1ms || 0) + (entry.tL2sc || 0) + (entry.tL2ms || 0) + (entry.tL3sc || 0) + (entry.tL3ms || 0) + (entry.tL4sc || 0) + (entry.tL4ms || 0))) * 100).toFixed(1) : 0;
        return Math.max(acc, matchCoralPrecent);
    }, 0);

    const averageCoralPrecent = teamData.reduce((acc, entry) => {
        const numerator = (entry.tL1sc || 0) + (entry.tL2sc || 0) + (entry.tL3sc || 0) + (entry.tL4sc || 0);
        const denominator = (entry.tL1sc || 0) + (entry.tL1ms || 0) + (entry.tL2sc || 0) + (entry.tL2ms || 0) + (entry.tL3sc || 0) + (entry.tL3ms || 0) + (entry.tL4sc || 0) + (entry.tL4ms || 0);
        const matchCoralPrecent = denominator ? parseFloat(((numerator / denominator) * 100).toFixed(1)) : 0;
        return acc + matchCoralPrecent;
    }, 0) / teamData.length;

    return {
        averageCoralScore,
        averageAlgeeScore,
        maxCoralScore,
        maxAlgeeScore,
        averageCoralPrecent,
        maxCoralPrecent,
        averageAlgeeRemovedFromReef,
        maxAlgeeRemovedFromReef
    }
}

export function teleopCoralSummery(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((entry) => entry.teamNumber === teamNumber);

    if (!teamData.length) { return 0; }

    const averageL1Score = teamData.reduce((acc, entry) => {
        const matchCoralScore = (entry.tL1sc || 0);
        return acc + matchCoralScore;
    }, 0) / teamData.length;

    const maxL1Score = teamData.reduce((acc, entry) => {
        const matchCoralScore = (entry.tL1sc || 0);
        return Math.max(acc, matchCoralScore);
    }, 0);

    const averageL2Score = teamData.reduce((acc, entry) => {
        const matchCoralScore = (entry.tL2sc || 0);
        return acc + matchCoralScore;
    }, 0) / teamData.length;

    const maxL2Score = teamData.reduce((acc, entry) => {
        const matchCoralScore = (entry.tL2sc || 0);
        return Math.max(acc, matchCoralScore);
    }, 0);

    const averageL3Score = teamData.reduce((acc, entry) => {
        const matchCoralScore = (entry.tL3sc || 0);
        return acc + matchCoralScore;
    }, 0) / teamData.length;

    const maxL3Score = teamData.reduce((acc, entry) => {
        const matchCoralScore = (entry.tL3sc || 0);
        return Math.max(acc, matchCoralScore);
    }, 0);

    const averageL4Score = teamData.reduce((acc, entry) => {
        const matchCoralScore = (entry.tL4sc || 0);
        return acc + matchCoralScore;
    }, 0) / teamData.length;

    const maxL4Score = teamData.reduce((acc, entry) => {
        const matchCoralScore = (entry.tL4sc || 0);
        return Math.max(acc, matchCoralScore);
    }, 0);

    return {
        averageL1Score,
        maxL1Score,
        averageL2Score,
        maxL2Score,
        averageL3Score,
        maxL3Score,
        averageL4Score,
        maxL4Score
    }
}

export function teleopPercentagesByMatch(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((data) => data.teamNumber === teamNumber);

    if (!teamData.length) { return []; }

    const scoresByRound = teamData.map((entry) => {
        const roundNumber = entry.matchNumber;
        const coralL1Precent = entry.tL1sc ? (((entry.tL1sc || 0) / ((entry.tL1sc || 0) + (entry.tL1ms || 0))) * 100).toFixed(1) : 0;
        const coralL2Precent = entry.tL2sc ? (((entry.tL2sc || 0) / ((entry.tL2sc || 0) + (entry.tL2ms || 0))) * 100).toFixed(1) : 0;
        const coralL3Precent = entry.tL3sc ? (((entry.tL3sc || 0) / ((entry.tL3sc || 0) + (entry.tL3ms || 0))) * 100).toFixed(1) : 0;
        const coralL4Precent = entry.tL4sc ? (((entry.tL4sc || 0) / ((entry.tL4sc || 0) + (entry.tL4ms || 0))) * 100).toFixed(1) : 0;
        const overallPrecent = (entry.tL1sc + entry.tL2sc + entry.tL3sc + entry.tL4sc) ? ((((entry.tL1sc || 0) + (entry.tL2sc || 0) + (entry.tL3sc || 0) + (entry.tL4sc || 0)) / ((entry.tL1sc || 0) + (entry.tL1ms || 0) + (entry.tL2sc || 0) + (entry.tL2ms || 0) + (entry.tL3sc || 0) + (entry.tL3ms || 0) + (entry.tL4sc || 0) + (entry.tL4ms || 0))) * 100).toFixed(1) : 0;

        return {
            roundNumber,
            coralL1Precent,
            coralL2Precent,
            coralL3Precent,
            coralL4Precent,
            overallPrecent
        };
    });
    scoresByRound.sort((a, b) => a.roundNumber - b.roundNumber);

    return scoresByRound;
}

// Endgame

export function endgameClimbDataPerRound(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((entry) => entry.teamNumber === teamNumber);

    if (!teamData.length) { return []; }

    const climbData = teamData.map((entry) => {
        const roundNumber = entry.matchNumber;
        return {
            roundNumber,
            No: entry.epo === "No" ? 1 : 0,
            P: entry.epo === "P" ? 1 : 0,
            Fs: entry.epo === "Fs" ? 1 : 0,
            Fd: entry.epo === "Fd" ? 1 : 0,
            Sc: entry.epo === "Sc" ? 1 : 0,
            Dc: entry.epo === "Dc" ? 1 : 0,
        };
    });

    climbData.sort((a, b) => a.roundNumber - b.roundNumber);

    return climbData;
}

export function endgameClimbPieData(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((entry) => entry.teamNumber === teamNumber);

    if (!teamData.length) {
        return [];
    }

    const climbCounts = {
        No: 0,
        P: 0,
        Fs: 0,
        Fd: 0,
        Sc: 0,
        Dc: 0,
    };

    teamData.forEach((entry) => {
        climbCounts.No += entry.epo === "No" ? 1 : 0;
        climbCounts.P += entry.epo === "P" ? 1 : 0;
        climbCounts.Fs += entry.epo === "Fs" ? 1 : 0;
        climbCounts.Fd += entry.epo === "Fd" ? 1 : 0;
        climbCounts.Sc += entry.epo === "Sc" ? 1 : 0;
        climbCounts.Dc += entry.epo === "Dc" ? 1 : 0;
    });

    return Object.keys(climbCounts).map((climbKey) => ({
        name: climbKey,
        value: climbCounts[climbKey],
    }));
}

// Summery

export function generalSummery(scoutingData, teamNumber) {
    const teamData = scoutingData.filter((entry) => entry.teamNumber === teamNumber);

    if (!teamData.length) { return 0; }

    const averageCoralScore = teamData.reduce((acc, entry) => {
        const matchCoralScore = (entry.L1sc || 0) + (entry.L2sc || 0) + (entry.L3sc || 0) + (entry.L4sc || 0) + (entry.tL1sc || 0) + (entry.tL2sc || 0) + (entry.tL3sc || 0) + (entry.tL4sc || 0);
        return acc + matchCoralScore;
    }, 0) / teamData.length;

    const maxCoralScore = teamData.reduce((acc, entry) => {
        const matchCoralScore = (entry.L1sc || 0) + (entry.L2sc || 0) + (entry.L3sc || 0) + (entry.L4sc || 0) + (entry.tL1sc || 0) + (entry.tL2sc || 0) + (entry.tL3sc || 0) + (entry.tL4sc || 0);
        return Math.max(acc, matchCoralScore);
    }, 0);

    const averageCoralPercent = teamData.reduce((acc, entry) => {
        const numerator = (entry.tL1sc || 0) + (entry.tL2sc || 0) + (entry.tL3sc || 0) + (entry.tL4sc || 0);
        const denominator = (entry.tL1sc || 0) + (entry.tL1ms || 0) + (entry.tL2sc || 0) + (entry.tL2ms || 0) + (entry.tL3sc || 0) + (entry.tL3ms || 0) + (entry.tL4sc || 0) + (entry.tL4ms || 0);
        const matchCoralPrecent = denominator ? parseFloat(((numerator / denominator) * 100).toFixed(1)) : 0;
        return acc + matchCoralPrecent;
    }, 0) / teamData.length;

    const maxCoralPercent = teamData.reduce((acc, entry) => {
        const matchCoralPrecent = (entry.tL1sc + entry.tL2sc + entry.tL3sc + entry.tL4sc) ? ((((entry.tL1sc || 0) + (entry.tL2sc || 0) + (entry.tL3sc || 0) + (entry.tL4sc || 0)) / ((entry.tL1sc || 0) + (entry.tL1ms || 0) + (entry.tL2sc || 0) + (entry.tL2ms || 0) + (entry.tL3sc || 0) + (entry.tL3ms || 0) + (entry.tL4sc || 0) + (entry.tL4ms || 0))) * 100).toFixed(1) : 0;
        return Math.max(acc, matchCoralPrecent);
    }, 0);

    const averageAlgeeBarge = teamData.reduce((acc, entry) => {
        const matchAlgeeScore = (entry.ScAb || 0) + (entry.tScAb || 0);
        return acc + matchAlgeeScore;
    }, 0) / teamData.length;

    const maxAlgeeBarge = teamData.reduce((acc, entry) => {
        const matchAlgeeScore = (entry.ScAb || 0) + (entry.tScAb || 0);
        return Math.max(acc, matchAlgeeScore);
    }, 0);

    const averageAlgeeProcessor = teamData.reduce((acc, entry) => {
        const matchAlgeeScore = (entry.ScAp || 0) + (entry.tScAp || 0);
        return acc + matchAlgeeScore;
    }, 0) / teamData.length;

    const maxAlgeeProcessor = teamData.reduce((acc, entry) => {
        const matchAlgeeScore = (entry.ScAp || 0) + (entry.tScAp || 0);
        return Math.max(acc, matchAlgeeScore);
    }, 0);

    const averageAlgeeRemovedFromReef = teamData.reduce((acc, entry) => {
        const matchAlgeeScore = (entry.tRmAr || 0) + (entry.tRmAg || 0);
        return acc + matchAlgeeScore;
    }, 0) / teamData.length;

    const maxAlgeeRemovedFromReef = teamData.reduce((acc, entry) => {
        const matchAlgeeScore = (entry.tRmAr || 0) + (entry.tRmAg || 0);
        return Math.max(acc, matchAlgeeScore);
    }, 0);

    const endPositionCounts = {
        No: 0,
        P: 0,
        Fs: 0,
        Fd: 0,
        Sc: 0,
        Dc: 0,
    };

    teamData.forEach((entry) => {
        endPositionCounts.No += entry.epo === "No" ? 1 : 0;
        endPositionCounts.P += entry.epo === "P" ? 1 : 0;
        endPositionCounts.Fs += entry.epo === "Fs" ? 1 : 0;
        endPositionCounts.Fd += entry.epo === "Fd" ? 1 : 0;
        endPositionCounts.Sc += entry.epo === "Sc" ? 1 : 0;
        endPositionCounts.Dc += entry.epo === "Dc" ? 1 : 0;
    });

    const maxEndPosition = Object.keys(endPositionCounts).reduce((acc, key) => {
        return Math.max(acc, endPositionCounts[key] * (key === "Dc" ? 5 : key === "Sc" ? 4 : key === "Fd" ? 3 : key === "Fs" ? 2 : 1));
    }, 0);

    const averageEndPosition = Object.keys(endPositionCounts).reduce((acc, key) => {
        return acc + endPositionCounts[key] * (key === "Dc" ? 5 : key === "Sc" ? 4 : key === "Fd" ? 3 : key === "Fs" ? 2 : 1);
    }, 0) / teamData.length;

    return {
        averageCoralScore,
        maxCoralScore,
        averageCoralPercent,
        maxCoralPercent,
        averageAlgeeBarge,
        maxAlgeeBarge,
        averageAlgeeProcessor,
        maxAlgeeProcessor,
        averageAlgeeRemovedFromReef,
        maxAlgeeRemovedFromReef,
        averageEndPosition,
        maxEndPosition
    }
}
export function calculateEstemaitedMaxPoints(data, team1number, team2number, team3number) {
    const team1totalAvgCycle = calaculateAvgCycle(data, team1number);
    const team2totalAvgCycle = calaculateAvgCycle(data, team2number);
    const team3totalAvgCycle = calaculateAvgCycle(data, team3number);
    const totalAvgCycle = team1totalAvgCycle + team2totalAvgCycle + team3totalAvgCycle;

    const a4 = Math.min(12, totalAvgCycle);
    const a3 = Math.min(12, totalAvgCycle - a4);

    var total = 0;
    if (canScoreL3orL4(data, team2number)) { total += calaculateAvgCycle(data, team2number); }
    if (canScoreL3orL4(data, team3number)) { total += calaculateAvgCycle(data, team3number); }
    const S1 = total;
    let r1 = Math.min(9 - 0, Math.ceil(team1totalAvgCycle - Math.max(0, a4 + a3 - S1)));
    if (ifCanDoNet(data, team1number)) { r1 = 0; }

    total = 0;
    if (canScoreL3orL4(data, team1number)) { total += calaculateAvgCycle(data, team1number); }
    if (canScoreL3orL4(data, team3number)) { total += calaculateAvgCycle(data, team3number); }
    const S2 = total - (r1 * (canScoreL3orL4(data, team1number) ? 1 : 0));
    let r2 = Math.min(9 - r1, Math.ceil(team2totalAvgCycle - Math.max(0, a4 + a3 - S2)));
    if (!ifCanDoNet(data, team2number)) { r2 = 0; }

    total = 0;
    if (canScoreL3orL4(data, team1number)) { total += calaculateAvgCycle(data, team1number); }
    if (canScoreL3orL4(data, team2number)) { total += calaculateAvgCycle(data, team2number); }
    const S3 = total - (r1 * (canScoreL3orL4(data, team1number) ? 1 : 0)) + (r2 * (canScoreL3orL4(data, team2number) ? 1 : 0));
    let r3 = Math.min(9 - r1 - r2, Math.ceil(team3totalAvgCycle - Math.max(0, a4 + a3 - S3)));
    if (!ifCanDoNet(data, team3number)) { r3 = 0; }

    const Rtotal = r1 + r2 + r3;
    const a2 = Math.min(12, totalAvgCycle - a4 - a3 - Math.floor(Rtotal / 0.75));
    const a1 = Math.min(12, totalAvgCycle - a4 - a3 - a2 - Math.floor(Rtotal / 0.75));

    const scoreDict = {
        L1: 2,
        L2: 3,
        L3: 4,
        L4: 5,
        N: 4
    };

    return a1 * scoreDict.L1 + a2 * scoreDict.L2 + a3 * scoreDict.L3 + a4 * scoreDict.L4
        + Rtotal * scoreDict.N
        + 2 * (averageAutoCycles(data, team1number) + averageAutoCycles(data, team2number) + averageAutoCycles(data, team3number))
        + averageEndGamePoints(data, team1number) + averageEndGamePoints(data, team2number) + averageEndGamePoints(data, team3number);
}

export function calculateEstimatedMaxRP(data, team1number, team2number, team3number) {
    const team1Avg = calaculateAvgCycle(data, team1number);
    const team2Avg = calaculateAvgCycle(data, team2number);
    const team3Avg = calaculateAvgCycle(data, team3number);
    const totalAvgCycle = team1Avg + team2Avg + team3Avg;

    const fixedL4 = 5;
    const fixedL3 = 5;
    const fixedL2 = 5;
    const canProcessor = ifCanDoProcessor(data, team1number) ||
        ifCanDoProcessor(data, team2number) ||
        ifCanDoProcessor(data, team3number);
    const fixedL1 = canProcessor ? 0 : 5;
    const fixedSum = fixedL4 + fixedL3 + fixedL2 + fixedL1;

    const remainingCycles = Math.max(0, totalAvgCycle - fixedSum);
    let rem = remainingCycles;

    const add_a4 = Math.min(12 - fixedL4, rem);
    const a4 = fixedL4 + add_a4;
    rem -= add_a4;

    const add_a3 = Math.min(12 - fixedL3, rem);
    const a3 = fixedL3 + add_a3;
    rem -= add_a3;

    let total = 0;
    if (canScoreL3orL4(data, team2number)) { total += team2Avg; }
    if (canScoreL3orL4(data, team3number)) { total += team3Avg; }
    const S1 = total;
    let r1 = Math.min(9, Math.ceil(team1Avg - Math.max(0, a4 + a3 - S1)));
    if (ifCanDoProcessor(data, team1number)) { r1 = 0; }

    total = 0;
    if (canScoreL3orL4(data, team1number)) { total += team1Avg; }
    if (canScoreL3orL4(data, team3number)) { total += team3Avg; }
    const S2 = total - (r1 * (canScoreL3orL4(data, team1number) ? 1 : 0));
    let r2 = Math.min(9 - r1, Math.ceil(team2Avg - Math.max(0, a4 + a3 - S2)));
    if (ifCanDoProcessor(data, team2number)) { r2 = 0; }

    total = 0;
    if (canScoreL3orL4(data, team1number)) { total += team1Avg; }
    if (canScoreL3orL4(data, team2number)) { total += team2Avg; }
    const S3 = total - (r1 * (canScoreL3orL4(data, team1number) ? 1 : 0)) + (r2 * (canScoreL3orL4(data, team2number) ? 1 : 0));
    let r3 = Math.min(9 - r1 - r2, Math.ceil(team3Avg - Math.max(0, a4 + a3 - S3)));
    if (ifCanDoProcessor(data, team3number)) { r3 = 0; }

    const Rtotal = r1 + r2 + r3;

    const add_a2 = Math.min(12 - fixedL2, rem - Math.floor(Rtotal / 0.75));
    const a2 = fixedL2 + add_a2;
    rem = rem - add_a2 - Math.floor(Rtotal / 0.75);

    const add_a1 = Math.min(12 - fixedL1, rem);
    const a1 = fixedL1 + add_a1;
    rem -= add_a1;

    const finalL4 = a4;
    const finalL3 = a3;
    const finalL2 = a2;
    const finalL1 = a1;
    const finalNet = Rtotal;

    const scoreDict = {
        L1: 2,
        L2: 3,
        L3: 4,
        L4: 5,
        N: 4
    };

    const scoringPoints = finalL1 * scoreDict.L1 +
        finalL2 * scoreDict.L2 +
        finalL3 * scoreDict.L3 +
        finalL4 * scoreDict.L4 +
        finalNet * scoreDict.N;

    const autoPoints = 2 * (averageAutoCycles(data, team1number) +
        averageAutoCycles(data, team2number) +
        averageAutoCycles(data, team3number));
    const endGamePoints = averageEndGamePoints(data, team1number) +
        averageEndGamePoints(data, team2number) +
        averageEndGamePoints(data, team3number);

    return scoringPoints + autoPoints + endGamePoints;
}

function averageEndGamePoints(data, teamNumber) {
    const endgameDict = {
        'p': 2,
        'Fs': 0,
        'Fd': 0,
        'Dc': 12,
        'Sc': 6
    };

    const teamData = data.filter((entry) => entry.teamNumber === teamNumber);
    if (!teamData.length) { return 0; }
    return teamData.reduce((acc, entry) => {
        const matchScore = (endgameDict[entry.epo] || 0);
        return acc + matchScore;
    }, 0) / teamData.length;
}

function averageAutoCycles(data, teamNumber) {
    const teamData = data.filter((entry) => entry.teamNumber === teamNumber);
    if (!teamData.length) { return 0; }
    return teamData.reduce((acc, entry) => {
        const matchScore = (entry.L1sc + entry.L2sc + entry.L3sc + entry.L4sc || 0);
        return acc + matchScore;
    }, 0) / teamData.length;
}

function calaculateAvgCycle(data, teamNumber) {
    const teamData = data.filter((entry) => entry.teamNumber === teamNumber);
    if (!teamData.length) { return 0; }
    const totalScore = teamData.reduce((acc, entry) => {
        const matchScore = (entry.L1sc + entry.L2sc + entry.L3sc + entry.L4sc +
            entry.tL1sc + entry.tL2sc + entry.tL3sc + entry.tL4sc +
            entry.tScAb + entry.ScAb || 0);
        return acc + matchScore;
    }, 0);
    return totalScore / teamData.length;
}

function canScoreL3orL4(data, teamNumber) {
    const teamData = data.filter((entry) => entry.teamNumber === teamNumber);
    if (!teamData.length) { return false; }
    return teamData.some((entry) => entry.L3sc || entry.L4sc);
}

function ifCanDoProcessor(data, teamNumber) {
    const teamData = data.filter((entry) => entry.teamNumber === teamNumber);
    if (!teamData.length) { return false; }
    return teamData.some((entry) => entry.tScAp || entry.ScAp);
}

function ifCanDoNet(data, teamNumber) {
    const teamData = data.filter((entry) => entry.teamNumber === teamNumber);

    if (!teamData.length) { return 0; }

    return teamData.some((entry) => entry.tScAb || entry.ScAb);
}

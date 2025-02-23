export function calculateEstimatedMaxRP(data, team1, team2, team3) {
    const cyc1 = calaculateAvgCycle(data, team1);
    const cyc2 = calaculateAvgCycle(data, team2);
    const cyc3 = calaculateAvgCycle(data, team3);
    const totalCycles = cyc1 + cyc2 + cyc3;

    const autoSum = averageAutoCycles(data, team1)
        + averageAutoCycles(data, team2)
        + averageAutoCycles(data, team3);
    const netRP = (autoSum >= 1 && movedAllThree(data, [team1, team2, team3])) ? 1 : 0;

    const end1 = averageEndGamePoints(data, team1);
    const end2 = averageEndGamePoints(data, team2);
    const end3 = averageEndGamePoints(data, team3);
    const sumEndg = end1 + end2 + end3;

    const scoreDict = { L4: 5, L3: 4, L2: 3, L1: 2, N: 6 };

    let rpMode = null;
    let baseThreshold = 0;
    let baseCost = 0;
    if (totalCycles >= 20) {
        rpMode = "5";
        baseThreshold = 5;
        baseCost = 20;
    } else if (totalCycles >= 12) {
        rpMode = "3";
        baseThreshold = 3;
        baseCost = 12;
    }

    let allocation = [0, 0, 0, 0];
    if (rpMode) {
        allocation = [baseThreshold, baseThreshold, baseThreshold, baseThreshold];
    }

    let leftover = totalCycles - baseCost;

    for (let i = 0; i < 4; i++) {
        const availableForLevel = 12 - allocation[i];
        const add = Math.min(availableForLevel, leftover);
        allocation[i] += add;
        leftover -= add;
    }

    const coralPoints = allocation[0] * scoreDict.L4 +
        allocation[1] * scoreDict.L3 +
        allocation[2] * scoreDict.L2 +
        allocation[3] * scoreDict.L1;

    function getBargeRP(barge, endg) {
        return (4 * barge + endg >= 14) ? 1 : 0;
    }

    let bestTotalScore = 0;
    let bestRP = 0;
    let bestBarge = 0;
    let bestDistribution = allocation.slice();

    const coralRP = rpMode ? 1 : 0;

    for (let barge = 0; barge <= 9; barge++) {
        const bargeRP = getBargeRP(barge, sumEndg);
        const currentRP = netRP + coralRP + bargeRP;
        const bargePoints = barge * 4;
        const totalPoints = coralPoints + bargePoints + 2 * autoSum + sumEndg;
        if (currentRP > bestRP || (currentRP === bestRP && totalPoints > bestTotalScore)) {
            bestRP = currentRP;
            bestTotalScore = totalPoints;
            bestBarge = barge;
            bestDistribution = allocation.slice();
        }
    }

    return {
        maxRP: bestRP,
        bestScore: bestTotalScore,
        distribution: {
            L4: bestDistribution[0],
            L3: bestDistribution[1],
            L2: bestDistribution[2],
            L1: bestDistribution[3],
            barge: bestBarge,
            rpMode: rpMode 
        },
        canPass5: rpMode === "5",
        canPass3: rpMode === "3"
    };
}

function calaculateAvgCycle(data, teamNumber) {
    const teamData = data.filter(e => e.teamNumber === teamNumber);
    if (!teamData.length) return 0;
    const totalScore = teamData.reduce((acc, entry) => {
        const sc = (entry.L1sc + entry.L2sc + entry.L3sc + entry.L4sc +
            entry.tL1sc + entry.tL2sc + entry.tL3sc + entry.tL4sc +
            entry.tScAb + entry.ScAb) || 0;
        return acc + sc;
    }, 0);
    return totalScore / teamData.length;
}

function averageAutoCycles(data, teamNumber) {
    const teamData = data.filter(e => e.teamNumber === teamNumber);
    if (!teamData.length) return 0;
    return teamData.reduce((acc, e) => {
        return acc + ((e.L1sc + e.L2sc + e.L3sc + e.L4sc) || 0);
    }, 0) / teamData.length;
}

function averageEndGamePoints(data, teamNumber) {
    const endgameDict = { 'p': 2, 'Fs': 0, 'Fd': 0, 'Dc': 12, 'Sc': 6 };
    const teamData = data.filter(e => e.teamNumber === teamNumber);
    if (!teamData.length) return 0;
    return teamData.reduce((acc, e) => {
        const val = endgameDict[e.epo] || 0;
        return acc + val;
    }, 0) / teamData.length;
}

function movedAllThree(data, teams) {
    return teams.every(tn => {
        const teamData = data.filter(e => e.teamNumber === tn);
        if (!teamData.length) return false;
        const movedCount = teamData.reduce((a, e) => a + (e.Mved ? 1 : 0), 0);
        return (movedCount / teamData.length) >= 0.5;
    });
}

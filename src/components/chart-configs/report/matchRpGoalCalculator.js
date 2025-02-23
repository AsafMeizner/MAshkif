export function calculateEstimatedMaxRP(data, team1, team2, team3) {
    const cyc1 = calaculateAvgCycle(data, team1);
    const cyc2 = calaculateAvgCycle(data, team2);
    const cyc3 = calaculateAvgCycle(data, team3);

    const sumCycle = cyc1 + cyc2 + cyc3;

    let bestScore = 0;
    let bestRP = 0;
    let bestDist = {};

    const end1 = averageEndGamePoints(data, team1);
    const end2 = averageEndGamePoints(data, team2);
    const end3 = averageEndGamePoints(data, team3);
    const sumEndg = end1 + end2 + end3; 

    function getCoralRP(c4, c3, c2, c1, threshold) {
        return (c4 >= threshold && c3 >= threshold && c2 >= threshold && c1 >= threshold) ? 1 : 0;
    }

    function getBargeRP(barge, endg) {
        return (4 * barge + endg >= 14) ? 1 : 0;
    }

    const autoSum = averageAutoCycles(data, team1)
        + averageAutoCycles(data, team2)
        + averageAutoCycles(data, team3);
    const autoRP = (autoSum >= 1 && movedAllThree(data, [team1, team2, team3])) ? 1 : 0;

    for (let proc = 0; proc <= 9; proc++) {
        const threshold = (proc >= 2) ? 3 : 5;

        let usedCorals = threshold * 4;
        if (usedCorals > sumCycle) {
            continue;
        }
        let leftoverCor = sumCycle - usedCorals;

        let c4 = threshold;
        let c3 = threshold;
        let c2 = threshold;
        let c1 = threshold;

        let add4 = Math.min(12 - threshold, leftoverCor);
        leftoverCor -= add4;
        c4 += add4;

        let add3 = Math.min(12 - threshold, leftoverCor);
        leftoverCor -= add3;
        c3 += add3;

        let add2 = Math.min(12 - threshold, leftoverCor);
        leftoverCor -= add2;
        c2 += add2;

        let add1 = Math.min(12 - threshold, leftoverCor);
        leftoverCor -= add1;
        c1 += add1;

        let finalCor = c4 + c3 + c2 + c1;

        let maxBarge = 9 - proc;
        for (let barge = 0; barge <= maxBarge; barge++) {

            let rpCoral = getCoralRP(c4, c3, c2, c1, threshold);
            let rpB = getBargeRP(barge, sumEndg);

            let rpSum = autoRP + rpCoral + rpB;

            const scoreDict = { L4: 5, L3: 4, L2: 3, L1: 2, N: 6 };
            let corPts = c4 * scoreDict.L4 + c3 * scoreDict.L3
                + c2 * scoreDict.L2 + c1 * scoreDict.L1;
            let algPts = proc * 6 + barge * 4;
            let totalPts = corPts + algPts
                + 2 * (autoSum) 
                + end1 + end2 + end3; 

            if (rpSum > bestRP || (rpSum === bestRP && totalPts > bestScore)) {
                bestRP = rpSum;
                bestScore = totalPts;
                bestDist = {
                    threshold,
                    c4,
                    c3,
                    c2,
                    c1,
                    barge,
                    processor: proc,
                    partialRP: rpSum,
                    totalPoints: totalPts
                };
            }
        }
    }

    return {
        maxRP: bestRP,
        bestScore: bestScore,
        distribution: bestDist
    };
}
function calaculateAvgCycle(data, teamNumber) {
    const teamData = data.filter(e => e.teamNumber === teamNumber);
    if (!teamData.length) return 0;
    const totalScore = teamData.reduce((acc, entry) => {
        const sc = (entry.L1sc + entry.L2sc + entry.L3sc + entry.L4sc
            + entry.tL1sc + entry.tL2sc + entry.tL3sc + entry.tL4sc
            + entry.tScAb + entry.ScAb || 0);
        return acc + sc;
    }, 0);
    return totalScore / teamData.length;
}

function averageAutoCycles(data, teamNumber) {
    const arr = data.filter(e => e.teamNumber === teamNumber);
    if (!arr.length) return 0;
    return arr.reduce((acc, e) => {
        return acc + (e.L1sc + e.L2sc + e.L3sc + e.L4sc);
    }, 0) / arr.length;
}

function averageEndGamePoints(data, teamNumber) {
    const endgameDict = { 'p': 2, 'Fs': 0, 'Fd': 0, 'Dc': 12, 'Sc': 6 };
    const arr = data.filter(e => e.teamNumber === teamNumber);
    if (!arr.length) return 0;
    return arr.reduce((acc, e) => {
        const val = endgameDict[e.epo] || 0;
        return acc + val;
    }, 0) / arr.length;
}

function movedAllThree(data, teams) {
    return teams.every(tn => {
        const arr = data.filter(e => e.teamNumber === tn);
        if (!arr.length) return false;
        const movedCount = arr.reduce((a, e) => a + (e.Mved ? 1 : 0), 0);
        const frac = movedCount / arr.length;
        return frac >= 0.5;
    });
}

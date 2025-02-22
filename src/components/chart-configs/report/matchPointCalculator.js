function calculateEstemaitedMaxPoints(data, team1number, team2number, team3number) {  
  const team1totalAvgCycle = calaculateAvgCycle(data, team1number);
  const team2totalAvgCycle = calaculateAvgCycle(data, team2number);
  const team3totalAvgCycle = calaculateAvgCycle(data, team3number);
  const totalAvgCycle = team1totalAvgCycle + team2totalAvgCycle + team3totalAvgCycle;

  const a4 = Math.min(12, totalAvgCycle);
  const a3 = Math.min(12, totalAvgCycle - a4);
  
  var total = 0;
  if(canScoreL3orL4(data, team2number)) {total += calaculateAvgCycle(data, team2number);}
  if(canScoreL3orL4(data, team3number)) {total += calaculateAvgCycle(data, team3number);}
  const S1 = total;
  const r1 = Math.min(9 - 0, Math.ceil(team1totalAvgCycle - Math.max(0, a4 + a3 - S1)));
  if (ifCanDoNet(data, team1number)) {const r1 = 0;}

  total = 0;
  if(canScoreL3orL4(data, team1number)) {total += calaculateAvgCycle(data, team1number);}
  if(canScoreL3orL4(data, team3number)) {total += calaculateAvgCycle(data, team3number);}
  const S2 = total - (r1 * (canScoreL3orL4(data, team1number) ? 1 : 0));
  const r2 = Math.min(9 - r1, Math.ceil(team2totalAvgCycle - Math.max(0, a4 + a3 - S2)));
  if (!ifCanDoNet(data, team2number)) {const r2 = 0;}

  total = 0;
  if(canScoreL3orL4(data, team1number)) {total += calaculateAvgCycle(data, team1number);}
  if(canScoreL3orL4(data, team2number)) {total += calaculateAvgCycle(data, team2number);}
  const S3 = total - (r1 * (canScoreL3orL4(data, team1number) ? 1 : 0)) + (r2 * (canScoreL3orL4(data, team2number) ? 1 : 0));
  const r3 = Math.min(9 - r1 - r2, Math.ceil(team3totalAvgCycle - Math.max(0, a4 + a3 - S3)));
  if (!ifCanDoNet(data, team3number)) {const r3 = 0;}

  const Rtotal = r1 + r2 + r3;
  a2 = Math.min(12, totalAvgCycle - a4 - a3 - Math.floor(Rtotal / 0.75));
  a1 = Math.min(12, totalAvgCycle - a4 - a3 - a2 - Math.floor(Rtotal / 0.75));

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

function averageEndGamePoints(data, teamNumber) {
  const endgameDict = {
    'p': 2,
    'Fs': 0,
    'Fd': 0,
    'Dc': 12,
    'Sc': 6
  };

  const teamData = data.filter((entry) => entry.teamNumber === teamNumber);

  if (!teamData.length) {return 0;}

  return teamData.reduce((acc, entry) => {
    const matchScore = (endgameDict[entry.epo] || 0);
    return acc + matchScore;
  }, 0) / teamData.length;
}

function averageAutoCycles(data, teamNumber) {
  const teamData = data.filter((entry) => entry.teamNumber === teamNumber);
  if (!teamData.length) {return 0;}
  return teamData.reduce((acc, entry) => {
    const matchScore = (entry.L1sc + entry.L2sc + entry.L3sc + entry.L4sc || 0);
    return acc + matchScore;
  }, 0) / teamData.length;
}

function calaculateAvgCycle(data, teamNumber) {
  const teamData = data.filter((entry) => entry.teamNumber === teamNumber);
  if (!teamData.length) {return 0;}
  const totalScore = teamData.reduce((acc, entry) => {
    const matchScore = (entry.L1sc + entry.L2sc + entry.L3sc + entry.L4sc + entry.tL1sc + entry.tL2sc + entry.tL3sc + entry.tL4sc + entry.tScAb + entry.ScAb || 0);
    return acc + matchScore;
  }, 0);
  return totalScore / teamData.length;
}

function canScoreL3orL4(data, teamNumber) {
  const teamData = data.filter((entry) => entry.teamNumber === teamNumber);

  if (!teamData.length) {return 0;}

  return teamData.some((entry) => entry.L3sc || entry.L4sc);
}

function ifCanDoNet(data, teamNumber) {
  const teamData = data.filter((entry) => entry.teamNumber === teamNumber);

  if (!teamData.length) {return 0;}

  return teamData.some((entry) => entry.tScAb || entry.ScAb);
}

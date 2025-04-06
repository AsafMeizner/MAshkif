import React, { useEffect, useState } from 'react';
import BarGraph from '../components/charts/barChart';
import PieGraph from '../components/charts/pieChart';
import TableChart from '../components/charts/tableChart';
import MultiNumberDisplay from '../components/charts/MultiNumberDisplay';
import MultiPieChart from '../components/charts/multiPieChart';
import RadarGraph from '../components/charts/radarChart';
import TeamNumberAutocomplete from '../components/QuizComponents/QuestionFields/TeamNumberAutocomplete';
import './Visualization.css';
import * as allTeamsConfigs from '../components/chart-configs/allTeams/configs';
import * as specificTeamConfigs from '../components/chart-configs/specificTeam/configs';
import { getScoutingData } from '../components/utils';
import { getPrincessData } from '../components/utils';

import * as reportConfigs from '../components/chart-configs/report/configs';

const Visualization = () => {
    const [isPortrait, setIsPortrait] = useState(window.matchMedia("(orientation: portrait)").matches);
    const [activeTab, setActiveTab] = useState('AllTeams');
    const [openSections, setOpenSections] = useState(['princess', 'general', 'autonomous', 'teleop', 'endgame', 'summary']);
    const [teamNumber, setTeamNumber] = useState("");
    const [team1Number, setTeam1Number] = useState("");
    const [team2Number, setTeam2Number] = useState("");
    const [red1Number, setRed1Number] = useState("");
    const [red2Number, setRed2Number] = useState("");
    const [red3Number, setRed3Number] = useState("");
    const [blue1Number, setBlue1Number] = useState("");
    const [blue2Number, setBlue2Number] = useState("");
    const [blue3Number, setBlue3Number] = useState("");
    const [selectedTeams, setSelectedTeams] = useState([]);
    const [startMatchNumber, setStartMatchNumber] = useState(0);
    const [endMatchNumber, setEndMatchNumber] = useState(100);
    const [selectedMatchNumbers, setSelectedMatchNumbers] = useState([]);
    const scoutingData = getScoutingData();
    const princessData = getPrincessData();

    useEffect(() => {
        const handleOrientationChange = (e) => {
            setIsPortrait(e.matches);
        };

        const mediaQuery = window.matchMedia("(orientation: portrait)");
        mediaQuery.addEventListener('change', handleOrientationChange);

        return () => mediaQuery.removeEventListener('change', handleOrientationChange);
    }, []);

    if (isPortrait) {
        return (
            <div className="rotate-message">
                <p>Please rotate your device to landscape for the best experience.</p>
            </div>
        );
    }

    const toggleSection = (sectionId) => {
        setOpenSections(prevState =>
            prevState.includes(sectionId)
                ? prevState.filter(id => id !== sectionId)
                : [...prevState, sectionId]
        );
    };

    const isSectionOpen = (sectionId) => openSections.includes(sectionId);

    const teamNumbers = [...new Set(scoutingData.map(entry => entry.teamNumber))];

    const handleTeamSelection = (teamNumber) => {
        setSelectedTeams(prevSelected =>
            prevSelected.includes(teamNumber)
                ? prevSelected.filter(num => num !== teamNumber)
                : [...prevSelected, teamNumber]
        );
    };

    const selectAllTeams = () => {
        setSelectedTeams(teamNumbers);
    };

    const deselectAllTeams = () => {
        setSelectedTeams([]);
    };

    const handleStartMatchNumberChange = (e) => {
        setStartMatchNumber(parseInt(e.target.value, 10));
    };

    const handleEndMatchNumberChange = (e) => {
        setEndMatchNumber(parseInt(e.target.value, 10));
    };

    const matchNumbers = [...new Set(scoutingData.filter(entry => entry.teamNumber === teamNumber).map(entry => entry.matchNumber))];

    const handleMatchSelection = (matchNumber) => {
        setSelectedMatchNumbers(prevSelected =>
            prevSelected.includes(matchNumber)
                ? prevSelected.filter(num => num !== matchNumber)
                : [...prevSelected, matchNumber]
        );
    };

    const selectAllMatches = () => {
        setSelectedMatchNumbers(matchNumbers);
    };

    const deselectAllMatches = () => {
        setSelectedMatchNumbers([]);
    };

    const specificTeamFiltredMatchesData = scoutingData.filter(entry =>
        selectedMatchNumbers.length === 0 || selectedMatchNumbers.includes(entry.matchNumber)
    );

    const filteredScoutingData = scoutingData.filter(entry =>
        (selectedTeams.length === 0 || selectedTeams.includes(entry.teamNumber)) && 
            entry.matchNumber >= startMatchNumber && entry.matchNumber <= endMatchNumber
    );

    const filtredPrincessData = princessData.filter(entry =>
        selectedTeams.length === 0 || selectedTeams.includes(entry.teamNumber)
    );

    const allTeamsRenderPrincessSection = () => (
        <div className="section">
            <h2 className="chart-section-title" onClick={() => toggleSection('princess')}>
                Princess {isSectionOpen('princess') ? '▲' : '▼'}
            </h2>
            {isSectionOpen('princess') && (
                <div className="graph-container">
                    <div className="wide-graph-item">
                        <TableChart config={allTeamsConfigs.princessTableConfig(filtredPrincessData)} />
                    </div>
                </div>
            )}
        </div>
    );

    const allTeamsRenderGeneralSection = () => (
        <div className="section">
            <h2 className="chart-section-title" onClick={() => toggleSection('general')}>
                General {isSectionOpen('general') ? '▲' : '▼'}
            </h2>
            {isSectionOpen('general') && (
                <div className="graph-container">
                    <div className="graph-item">
                        <BarGraph config={allTeamsConfigs.averageMatchScoreConfig(filteredScoutingData)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={allTeamsConfigs.maxMatchScoreConfig(filteredScoutingData)} />
                    </div>
                </div>
            )}
        </div>
    );

    const allTeamsRenderAutonomousSection = () => (
        <div className="section">
            <h2 className="chart-section-title" onClick={() => toggleSection('autonomous')}>
                Autonomous {isSectionOpen('autonomous') ? '▲' : '▼'}
            </h2>
            {isSectionOpen('autonomous') && (
                <div className="graph-container">
                    <div className="graph-item">
                        <BarGraph config={allTeamsConfigs.autoCoralAveragesConfig(filteredScoutingData)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={allTeamsConfigs.autoCoralMaxesConfig(filteredScoutingData)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={allTeamsConfigs.autoAlgaeAveragesConfig(filteredScoutingData)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={allTeamsConfigs.autoAlgaeMaxesConfig(filteredScoutingData)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={allTeamsConfigs.autoCoralScorePercentageConfig(filteredScoutingData)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={allTeamsConfigs.autoLeftStartingLineConfig(filteredScoutingData)} />
                    </div>
                </div>
            )}
        </div>
    );

    const allTeamsRenderTeleopSection = () => (
        <div className="section">
            <h2 className="chart-section-title" onClick={() => toggleSection('teleop')}>
                Tele-Op {isSectionOpen('teleop') ? '▲' : '▼'}
            </h2>
            {isSectionOpen('teleop') && (
                <div className="graph-container">
                    <div className="graph-item">
                        <BarGraph config={allTeamsConfigs.teleopCoralAveragesConfig(filteredScoutingData)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={allTeamsConfigs.teleopCoralMaxesConfig(filteredScoutingData)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={allTeamsConfigs.teleopAlgaeAveragesConfig(filteredScoutingData)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={allTeamsConfigs.teleopAlgaeMaxesConfig(filteredScoutingData)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={allTeamsConfigs.teleopCoralScorePercentageConfig(filteredScoutingData)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={allTeamsConfigs.teleopRemovedAlgaeFromReefConfig(filteredScoutingData)} />
                    </div>
                </div>
            )}
        </div>
    );

    const allTeamsRenderEndgameSection = () => (
        <div className="section">
            <h2 className="chart-section-title" onClick={() => toggleSection('endgame')}>
                Endgame {isSectionOpen('endgame') ? '▲' : '▼'}
            </h2>
            {isSectionOpen('endgame') && (
                <div className="graph-container">
                    <div className="graph-item">
                        <BarGraph config={allTeamsConfigs.endgameClimbPercentByTeamConfig(filteredScoutingData)} />
                    </div>
                </div>
            )}
        </div>
    );

    const handleTeamNumberChange = (value) => {
        setTeamNumber(value);
    };

    const specificTeamRenderGeneralSection = () => (
        <div className="section">
            <h2 className="chart-section-title" onClick={() => toggleSection('general')}>
                General {isSectionOpen('general') ? '▲' : '▼'}
            </h2>
            {isSectionOpen('general') && (
                <div className="graph-container">
                    <div className="wide-graph-item">
                        <TableChart config={specificTeamConfigs.princessTableConfig(princessData, teamNumber)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={specificTeamConfigs.matchScoreByRoundConfig(specificTeamFiltredMatchesData, teamNumber)} />
                    </div>
                    <div className="graph-item">
                        <MultiNumberDisplay config={specificTeamConfigs.averageScoreConfig(specificTeamFiltredMatchesData, teamNumber)} />
                    </div>
                    <div className="wide-graph-item">
                        <TableChart config={specificTeamConfigs.commentsPerTeamTableConfig(specificTeamFiltredMatchesData, teamNumber)} />
                    </div>
                </div>
            )}
        </div>
    );

    const specificTeamRenderAutonomousSection = () => (
        <div className="section">
            <h2 className="chart-section-title" onClick={() => toggleSection('autonomous')}>
                Autonomous {isSectionOpen('autonomous') ? '▲' : '▼'}
            </h2>
            {isSectionOpen('autonomous') && (
                <div className="graph-container">
                    <div className="graph-item">
                        <BarGraph config={specificTeamConfigs.autonomousScoreByMatchConfig(specificTeamFiltredMatchesData, teamNumber)} />
                    </div>
                    <div className="graph-item">
                        <MultiNumberDisplay config={specificTeamConfigs.autonomousSummeryConfig(specificTeamFiltredMatchesData, teamNumber)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={specificTeamConfigs.autonomousCoralPrecentInConfig(specificTeamFiltredMatchesData, teamNumber)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={specificTeamConfigs.autonomousLeftStartingLineConfig(specificTeamFiltredMatchesData, teamNumber)} />
                    </div>
                </div>
            )}
        </div>
    );

    const specificTeamRenderTeleopSection = () => (
        <div className="section">
            <h2 className="chart-section-title" onClick={() => toggleSection('teleop')}>
                Tele-Op {isSectionOpen('teleop') ? '▲' : '▼'}
            </h2>
            {isSectionOpen('teleop') && (
                <div className="graph-container">
                    <div className="graph-item">
                        <BarGraph config={specificTeamConfigs.teleopCoralByMatchConfig(specificTeamFiltredMatchesData, teamNumber)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={specificTeamConfigs.teleopAlgaeByMatchConfig(specificTeamFiltredMatchesData, teamNumber)} />
                    </div>
                    <div className="graph-item">
                        <MultiNumberDisplay config={specificTeamConfigs.teleopCoralLevelsSummeryConfig(specificTeamFiltredMatchesData, teamNumber)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={specificTeamConfigs.teleopCoralPrecentInConfig(specificTeamFiltredMatchesData, teamNumber)} />
                    </div>
                    <div className="graph-item">
                        <MultiNumberDisplay config={specificTeamConfigs.teleopSummeryConfig(specificTeamFiltredMatchesData, teamNumber)} />
                    </div>
                    <div className="graph-item">
                        <MultiNumberDisplay config={allTeamsConfigs.teleopSummeryConfig(specificTeamFiltredMatchesData, teamNumber)} />
                    </div>
                </div>
            )}
        </div>
    );

    const specificTeamRenderEndgameSection = () => (
        <div className="section">
            <h2 className="chart-section-title" onClick={() => toggleSection('endgame')}>
                Endgame {isSectionOpen('endgame') ? '▲' : '▼'}
            </h2>
            {isSectionOpen('endgame') && (
                <div className="graph-container">
                    <div className="graph-item">
                        <BarGraph config={specificTeamConfigs.endgameClimbDataPerRoundConfig(specificTeamFiltredMatchesData, teamNumber)} />
                    </div>
                    <div className="graph-item">
                        <PieGraph config={specificTeamConfigs.endgameClimbUsagePieConfig(specificTeamFiltredMatchesData, teamNumber)} />
                    </div>
                </div>
            )}
        </div>
    );

    const specificTeamRenderSummarySection = () => (
        <div className="section">
            <h2 className="chart-section-title" onClick={() => toggleSection('summary')}>
                Summary {isSectionOpen('summary') ? '▲' : '▼'}
            </h2>
            {isSectionOpen('summary') && (
                <div className="graph-container">
                    <div className="graph-item">
                        <RadarGraph config={specificTeamConfigs.teamPerformanceRadarConfig(specificTeamFiltredMatchesData, teamNumber)} />
                    </div>
                    <div className="graph-item">
                        <RadarGraph config={specificTeamConfigs.teamCoralHeightRadarConfig(specificTeamFiltredMatchesData, teamNumber)} />
                    </div>
                </div>
            )}
        </div>
    );

    const handleTeam1NumberChange = (value) => {
        setTeam1Number(value);
    };

    const handleTeam2NumberChange = (value) => {
        setTeam2Number(value);
    };

    const comparisonSectionRenderGeneral = () => (
        <div className="section">
            <h2 className="chart-section-title" onClick={() => toggleSection('general')}>
                General Comparison {isSectionOpen('general') ? '▲' : '▼'}
            </h2>
            {isSectionOpen('general') && (
                <div className="graph-container">
                    <div className="graph-item">
                        <BarGraph config={specificTeamConfigs.matchScoreByRoundConfig(scoutingData, team1Number)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={specificTeamConfigs.matchScoreByRoundConfig(scoutingData, team2Number)} />
                    </div>
                    <div className="graph-item">
                        <MultiNumberDisplay config={specificTeamConfigs.averageScoreConfig(scoutingData, team1Number)} />
                    </div>
                    <div className="graph-item">
                        <MultiNumberDisplay config={specificTeamConfigs.averageScoreConfig(scoutingData, team2Number)} />
                    </div>
                </div>
            )}
        </div>
    );

    const comparisonSectionRenderAutonomous = () => (
        <div className="section">
            <h2 className="chart-section-title" onClick={() => toggleSection('autonomous')}>
                Autonomous Comparison {isSectionOpen('autonomous') ? '▲' : '▼'}
            </h2>
            {isSectionOpen('autonomous') && (
                <div className="graph-container">
                    <div className="graph-item">
                        <BarGraph config={specificTeamConfigs.autonomousScoreByMatchConfig(scoutingData, team1Number)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={specificTeamConfigs.autonomousScoreByMatchConfig(scoutingData, team2Number)} />
                    </div>
                    <div className="graph-item">
                        <MultiNumberDisplay config={specificTeamConfigs.autonomousSummeryConfig(scoutingData, team1Number)} />
                    </div>
                    <div className="graph-item">
                        <MultiNumberDisplay config={specificTeamConfigs.autonomousSummeryConfig(scoutingData, team2Number)} />
                    </div>
                </div>
            )}
        </div>
    );

    const comparisonSectionRenderTeleop = () => (
        <div className="section">
            <h2 className="chart-section-title" onClick={() => toggleSection('teleop')}>
                Tele-Op Comparison {isSectionOpen('teleop') ? '▲' : '▼'}
            </h2>
            {isSectionOpen('teleop') && (
                <div className="graph-container">
                    <div className="graph-item">
                        <BarGraph config={specificTeamConfigs.teleopCoralByMatchConfig(scoutingData, team1Number)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={specificTeamConfigs.teleopCoralByMatchConfig(scoutingData, team2Number)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={specificTeamConfigs.teleopAlgaeByMatchConfig(scoutingData, team1Number)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={specificTeamConfigs.teleopAlgaeByMatchConfig(scoutingData, team2Number)} />
                    </div>
                    <div className="graph-item">
                        <MultiNumberDisplay config={specificTeamConfigs.teleopCoralLevelsSummeryConfig(scoutingData, team1Number)} />
                    </div>
                    <div className="graph-item">
                        <MultiNumberDisplay config={specificTeamConfigs.teleopCoralLevelsSummeryConfig(scoutingData, team2Number)} />
                    </div>
                    <div className="graph-item">
                        <MultiNumberDisplay config={specificTeamConfigs.teleopSummeryConfig(scoutingData, team1Number)} />
                    </div>
                    <div className="graph-item">
                        <MultiNumberDisplay config={specificTeamConfigs.teleopSummeryConfig(scoutingData, team2Number)} />
                    </div>
                </div>
            )}
        </div>
    );

    const comparisonSectionRenderEndgame = () => (
        <div className="section">
            <h2 className="chart-section-title" onClick={() => toggleSection('endgame')}>
                Endgame Comparison {isSectionOpen('endgame') ? '▲' : '▼'}
            </h2>
            {isSectionOpen('endgame') && (
                <div className="graph-container">
                    <div className="graph-item">
                        <PieGraph config={specificTeamConfigs.endgameClimbUsagePieConfig(scoutingData, team1Number)} />
                    </div>
                    <div className="graph-item">
                        <PieGraph config={specificTeamConfigs.endgameClimbUsagePieConfig(scoutingData, team2Number)} />
                    </div>
                </div>
            )}
        </div>
    );

    const comparisonSectionRenderSummary = () => (
        <div className="section">
            <h2 className="chart-section-title" onClick={() => toggleSection('summary')}>
                Summary Comparison {isSectionOpen('summary') ? '▲' : '▼'}
            </h2>
            {isSectionOpen('summary') && (
                <div className="graph-container">
                    <div className="graph-item">
                        <RadarGraph config={specificTeamConfigs.teamsAverageRadarConfig(scoutingData, team1Number, team2Number)} />
                    </div>
                    <div className="graph-item">
                        <RadarGraph config={specificTeamConfigs.teamMaxRadarConfig(scoutingData, team1Number, team2Number)} />
                    </div>
                    <div className="graph-item">
                        <RadarGraph config={specificTeamConfigs.compareAlliancesAverageCoralsConfig(scoutingData, team1Number, team2Number)} />
                    </div>
                    <div className="graph-item">
                        <RadarGraph config={specificTeamConfigs.compareAlliancesMaxCoralsConfig(scoutingData, team1Number, team2Number)} />
                    </div>
                </div>
            )}
        </div>
    );

    const handleRed1NumberChange = (value) => {
        setRed1Number(value);
    };

    const handleRed2NumberChange = (value) => {
        setRed2Number(value);
    };

    const handleRed3NumberChange = (value) => {
        setRed3Number(value);
    };

    const handleBlue1NumberChange = (value) => {
        setBlue1Number(value);
    };

    const handleBlue2NumberChange = (value) => {
        setBlue2Number(value);
    };

    const handleBlue3NumberChange = (value) => {
        setBlue3Number(value);
    };

    const ReportRenderGeneral = (redAlliance, blueAlliance) => (
        <div className="section">
            <h2 className="chart-section-title" onClick={() => toggleSection('general')}>
                General {isSectionOpen('general') ? '▲' : '▼'}
            </h2>
            {isSectionOpen('general') && (
                <div className="graph-container">
                    <div className="graph-item">
                        <MultiNumberDisplay config={reportConfigs.allianceFocusPoints(scoutingData, redAlliance, "Different Strategy Predicted Score For Red Alliance", "#e7492a")} />
                    </div>
                    <div className="graph-item">
                        <MultiNumberDisplay config={reportConfigs.allianceFocusPoints(scoutingData, blueAlliance, "Different Strategy Predicted Score For Blue Alliance", "#1aa3e8")} />
                    </div>
                </div>
            )}
        </div>
    );

    const ReportRenderAutonomous = (redAlliance, blueAlliance) => (
        <div className="section">
            <h2 className="chart-section-title" onClick={() => toggleSection('autonomous')}>
                Autonomous {isSectionOpen('autonomous') ? '▲' : '▼'}
            </h2>
            {isSectionOpen('autonomous') && (
                <div className="graph-container">
                    <div className="graph-item">
                        <MultiNumberDisplay config={reportConfigs.averageAutoCoral(scoutingData, redAlliance, "Average / Max Auto coral score for red aliance", "#e7492a")} />
                    </div>
                    <div className="graph-item">
                        <MultiNumberDisplay config={reportConfigs.averageAutoCoral(scoutingData, blueAlliance, "Average / Max Auto coral score for blue aliance", "#1aa3e8")} />
                    </div>
                </div>
            )}
        </div>
    );

    const ReportRenderTeleop = (redAlliance, blueAlliance) => (
        <div className="section">
            <h2 className="chart-section-title" onClick={() => toggleSection('teleop')}>
                Tele-Op {isSectionOpen('teleop') ? '▲' : '▼'}
            </h2>
            {isSectionOpen('teleop') && (
                <div className="graph-container">
                    <div className="graph-item">
                        <MultiNumberDisplay config={reportConfigs.averageTeleopCoral(scoutingData, redAlliance, "Average / Max TeleOp Coral Score for red aliance", "#e7492a")} />
                    </div>
                    <div className="graph-item">
                        <MultiNumberDisplay config={reportConfigs.averageTeleopCoral(scoutingData, blueAlliance, "Average / Max TeleOp Coral Score for blue aliance", "#1aa3e8")} />
                    </div>
                    <div className="graph-item">
                        <MultiPieChart config={reportConfigs.alliancePerHeightAverages(scoutingData, redAlliance, "Average Coral Amount Scored By Team for Red Alliance", "#b33b2e", "#e74c3c", "#e67e22")} />
                    </div>
                    <div className="graph-item">
                        <MultiPieChart config={reportConfigs.alliancePerHeightAverages(scoutingData, blueAlliance, "Average Coral Amount Scored By Team for Red Alliance", "#1aa3e8", "#3498db", "#9ae0f0")} />
                    </div>
                    <div className="graph-item">
                        <MultiNumberDisplay config={reportConfigs.averageTeleopAlgae(scoutingData, redAlliance, "Average / Max Amount Algae for red aliance", "#e7492a")} />
                    </div>
                    <div className="graph-item">
                        <MultiNumberDisplay config={reportConfigs.averageTeleopAlgae(scoutingData, blueAlliance, "Average / Max Amount Algae for blue aliance", "#1aa3e8")} />
                    </div>
                </div>
            )}
        </div>
    );

    const ReportRenderEndgame = (redAlliance, blueAlliance, scoutingDataRed, scoutingDataBlue) => (

        <div className="section">
            <h2 className="chart-section-title" onClick={() => toggleSection('endgame')}>
                Endgame {isSectionOpen('endgame') ? '▲' : '▼'}
            </h2>
            {isSectionOpen('endgame') && (
                <div className="graph-container">
                    <div className="graph-item">
                        <BarGraph config={allTeamsConfigs.endgameClimbPercentByTeamConfig(scoutingDataRed)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={allTeamsConfigs.endgameClimbPercentByTeamConfig(scoutingDataBlue)} />
                    </div>
                    <div className="graph-item">
                        <MultiNumberDisplay config={reportConfigs.averageClimbPoints(scoutingData, redAlliance, "Average / Max Climb Points for red aliance", "#e7492a")} />
                    </div>
                    <div className="graph-item">
                        <MultiNumberDisplay config={reportConfigs.averageClimbPoints(scoutingData, blueAlliance, "Average / Max Climb Points for blue aliance", "#1aa3e8")} />
                    </div>
                </div>
            )}
        </div>
    );

    const renderReport = () => {
        const redAlliance = [red1Number, red2Number, red3Number];
        const blueAlliance = [blue1Number, blue2Number, blue3Number];
        const scoutingDataRed = scoutingData.filter(entry => redAlliance.includes(entry.teamNumber));
        const scoutingDataBlue = scoutingData.filter(entry => blueAlliance.includes(entry.teamNumber));
        return (
            <>
                <div className="team-number-input">
                    <TeamNumberAutocomplete
                        value={red1Number}
                        onChange={handleRed1NumberChange}
                        label="Red 1:"
                    />
                </div>
                <div className="team-number-input">
                    <TeamNumberAutocomplete
                        value={red2Number}
                        onChange={handleRed2NumberChange}
                        label="Red 2:"
                    />
                </div>
                <div className="team-number-input">
                    <TeamNumberAutocomplete
                        value={red3Number}
                        onChange={handleRed3NumberChange}
                        label="Red 3:"
                    />
                </div>
                <div className="team-number-input">
                    <TeamNumberAutocomplete
                        value={blue1Number}
                        onChange={handleBlue1NumberChange}
                        label="Blue 1:"
                    />
                </div>
                <div className="team-number-input">
                    <TeamNumberAutocomplete
                        value={blue2Number}
                        onChange={handleBlue2NumberChange}
                        label="Blue 2:"
                    />
                </div>
                <div className="team-number-input">
                    <TeamNumberAutocomplete
                        value={blue3Number}
                        onChange={handleBlue3NumberChange}
                        label="Blue 3:"
                    />
                </div>

                {ReportRenderGeneral(redAlliance, blueAlliance)}
                {ReportRenderAutonomous(redAlliance, blueAlliance)}
                {ReportRenderTeleop(redAlliance, blueAlliance)}
                {ReportRenderEndgame(redAlliance, blueAlliance, scoutingDataRed, scoutingDataBlue)}
            </>
        );
    };

    const renderAllTeams = () => (
        <>
            <div className="team-selection-container">
                <div className="team-selection-buttons">
                    <button onClick={selectAllTeams}>Select All</button>
                    <button onClick={deselectAllTeams}>Deselect All</button>
                </div>

                <div className="team-selection">
                    {teamNumbers.sort((a, b) => a.localeCompare(b)).map(teamNumber => (
                        <label key={teamNumber}>
                            <input
                                type="checkbox"
                                checked={selectedTeams.includes(teamNumber)}
                                onChange={() => handleTeamSelection(teamNumber)}
                            />
                            Team {teamNumber}
                        </label>
                    ))}
                </div>
            </div>
            <div className="team-number-input">
                <label htmlFor="startMatchNumber">Select Start Match Number:</label>
                <input
                    type="number"
                    id="startMatchNumber"
                    value={startMatchNumber}
                    onChange={handleStartMatchNumberChange}
                    min="0"
                    placeholder="Enter Start Match Number"
                />
            </div>
            <div className="team-number-input">
                <label htmlFor="endMatchNumber">Select End Match Number:</label>
                <input
                    type="number"
                    id="endMatchNumber"
                    value={endMatchNumber}
                    onChange={handleEndMatchNumberChange}
                    min="0"
                    placeholder="Enter End Match Number"
                />
            </div>
            {allTeamsRenderPrincessSection()}
            {allTeamsRenderGeneralSection()}
            {allTeamsRenderAutonomousSection()}
            {allTeamsRenderTeleopSection()}
            {allTeamsRenderEndgameSection()}
        </>
    );

    const renderSpecificTeam = () => (
        <>
            <div className="team-number-input">
                <TeamNumberAutocomplete
                    value={teamNumber}
                    onChange={handleTeamNumberChange}
                    label="Select Team Number:"
                />
            </div>
            <div className="team-selection-container">
                <div className="team-selection-buttons">
                    <button onClick={selectAllMatches}>Select All</button>
                    <button onClick={deselectAllMatches}>Deselect All</button>
                </div>

                <div className="team-selection">
                    {matchNumbers.sort((a, b) => a.toString().localeCompare(b.toString())).map(matchNumber => (
                        <label key={matchNumber}>
                            <input
                                type="checkbox"
                                checked={selectedMatchNumbers.includes(matchNumber)}
                                onChange={() => handleMatchSelection(matchNumber)}
                            />
                            Match {matchNumber}
                        </label>
                    ))}
                </div>
            </div>
            {specificTeamRenderGeneralSection()}
            {specificTeamRenderAutonomousSection()}
            {specificTeamRenderTeleopSection()}
            {specificTeamRenderEndgameSection()}
            {specificTeamRenderSummarySection()}
        </>
    );

    const renderComparison = () => (
        <>
            <div className="team-number-input">
                <TeamNumberAutocomplete
                    value={team1Number}
                    onChange={handleTeam1NumberChange}
                    label="Select Team 1 Number:"
                />
            </div>
            <div className="team-number-input">
                <TeamNumberAutocomplete
                    value={team2Number}
                    onChange={handleTeam2NumberChange}
                    label="Select Team 2 Number:"
                />
            </div>
            {comparisonSectionRenderGeneral()}
            {comparisonSectionRenderAutonomous()}
            {comparisonSectionRenderTeleop()}
            {comparisonSectionRenderEndgame()}
            {comparisonSectionRenderSummary()}
        </>
    );

    const renderSection = () => {
        switch (activeTab) {
            case 'AllTeams':
                return renderAllTeams();
            case 'SpecificTeam':
                return renderSpecificTeam();
            case 'Comparison':
                return renderComparison();
            case 'Report':
                return renderReport();
            default:
                return null;
        }
    };

    return (
        <div className="dashboard">
            <h1 className="page-title">Dashboard</h1>

            {/* Tabs */}
            <div className="tabs">
                <button className={activeTab === 'AllTeams' ? 'active-tab' : ''} onClick={() => setActiveTab('AllTeams')}>All Teams</button>
                <button className={activeTab === 'SpecificTeam' ? 'active-tab' : ''} onClick={() => setActiveTab('SpecificTeam')}>Specific Team</button>
                <button className={activeTab === 'Comparison' ? 'active-tab' : ''} onClick={() => setActiveTab('Comparison')}>Comparison</button>
                <button className={activeTab === 'Report' ? 'active-tab' : ''} onClick={() => setActiveTab('Report')}>Report</button>
            </div>

            {renderSection()}
        </div>
    );
};

export default Visualization;

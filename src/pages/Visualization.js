import React, { useEffect, useState } from 'react';
import BarGraph from '../components/charts/barChart'; 
import NumberDisplay from '../components/charts/numberDisplay';
import PieGraph from '../components/charts/pieChart';
import TableChart from '../components/charts/tableChart';
import MultiNumberDisplay from '../components/charts/MultiNumberDisplay';
import RadarGraph from '../components/charts/radarChart';
import './Visualization.css'; 
import * as allTeamsConfigs from '../components/chart-configs/allTeams/configs';
import * as specificTeamConfigs from '../components/chart-configs/specificTeam/configs';
import { getScoutingData } from '../components/utils';

const Visualization = () => {
    const [isPortrait, setIsPortrait] = useState(window.matchMedia("(orientation: portrait)").matches);
    const [activeTab, setActiveTab] = useState('AllTeams'); 
    const [openSections, setOpenSections] = useState(['general', 'autonomous', 'teleop', 'endgame', 'summary']);
    const [teamNumber, setTeamNumber] = useState(5951);
    const [team1Number, setTeam1Number] = useState(5951);
    const [team2Number, setTeam2Number] = useState(5951);
    const [selectedTeams, setSelectedTeams] = useState([]);
    const scoutingData = getScoutingData();

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

    const filteredScoutingData = scoutingData.filter(entry => 
        selectedTeams.length === 0 || selectedTeams.includes(entry.teamNumber)
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
                        <BarGraph config={allTeamsConfigs.averageAutonomousScoreConfig(filteredScoutingData)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={allTeamsConfigs.maxAutonomousScoreConfig(filteredScoutingData)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={allTeamsConfigs.averageAutonomousMovedConfig(filteredScoutingData)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={allTeamsConfigs.averageAutonomousSpeakerAccuracyConfig(filteredScoutingData)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={allTeamsConfigs.averageAutonomousFoulConfig(filteredScoutingData)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={allTeamsConfigs.maxAutonomousFoulConfig(filteredScoutingData)} />
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
                        <BarGraph config={allTeamsConfigs.averageTeleopScoreConfig(filteredScoutingData)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={allTeamsConfigs.maxTeleopScoreConfig(filteredScoutingData)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={allTeamsConfigs.averageTeleopSpeakerByTeamConfig(filteredScoutingData)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={allTeamsConfigs.maxTeleopSpeakerByTeamConfig(filteredScoutingData)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={allTeamsConfigs.averageTeleopAmpByTeamConfig(filteredScoutingData)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={allTeamsConfigs.maxTeleopAmpByTeamConfig(filteredScoutingData)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={allTeamsConfigs.teleopSpeakerPercentInByTeamConfig(filteredScoutingData)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={allTeamsConfigs.teleopAmpPercentInByTeamConfig(filteredScoutingData)} />
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
                    <div className="graph-item">
                        <BarGraph config={allTeamsConfigs.averageEndgameTrapByTeamConfig(filteredScoutingData)} />
                    </div>
                </div>
            )}
        </div>
    );

    const handleTeamNumberChange = (e) => {
        setTeamNumber(parseInt(e.target.value, 10));
    };

    const specificTeamRenderGeneralSection = () => (
        <div className="section">
            <h2 className="chart-section-title" onClick={() => toggleSection('general')}>
                General {isSectionOpen('general') ? '▲' : '▼'}
            </h2>
            {isSectionOpen('general') && (
                <div className="graph-container">
                    <div className="graph-item">
                        <BarGraph config={specificTeamConfigs.matchScoreByRoundConfig(scoutingData, teamNumber)} />
                    </div>
                    <div className="graph-item">
                        <NumberDisplay config={specificTeamConfigs.averageScoreConfig(scoutingData, teamNumber)} />
                    </div>
                    <div className="graph-item">
                        <TableChart config={specificTeamConfigs.commentsPerTeamTableConfig(scoutingData, teamNumber)} />
                    </div>
                    <div className="graph-item">
                        <PieGraph config={specificTeamConfigs.startPositionUsagePieConfig(scoutingData, teamNumber)} />
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
                        <BarGraph config={specificTeamConfigs.autonomousSpeakerConfig(scoutingData, teamNumber)} />
                    </div>
                    <div className="graph-item">
                        <NumberDisplay config={specificTeamConfigs.averageAutoSpeakerConfig(scoutingData, teamNumber)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={specificTeamConfigs.autoPathPerRoundConfig(scoutingData, teamNumber)} />
                    </div>
                    <div className="graph-item">
                        <PieGraph config={specificTeamConfigs.autoPathUsagePieConfig(scoutingData, teamNumber)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={specificTeamConfigs.actualVsExpectedConfig(scoutingData, teamNumber)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={specificTeamConfigs.autoHasMovedConfig(scoutingData, teamNumber)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={specificTeamConfigs.autoFoulPerRoundConfig(scoutingData, teamNumber)} />
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
                        <BarGraph config={specificTeamConfigs.teleopScoreByRoundConfig(scoutingData, teamNumber)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={specificTeamConfigs.teleopScoreByRoundCombinedConfig(scoutingData, teamNumber)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={specificTeamConfigs.teleopAccuracyPerRoundConfig(scoutingData, teamNumber)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={specificTeamConfigs.teleopFoulPerMatchConfig(scoutingData, teamNumber)} />
                    </div>
                    <div className="graph-item">
                        <MultiNumberDisplay config={specificTeamConfigs.teamTeleopStatsMultiNumberConfig(scoutingData, teamNumber)} />
                    </div>
                    <div className="graph-item">
                        <MultiNumberDisplay config={allTeamsConfigs.competitionMultiNumberConfig(scoutingData, teamNumber)} />
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
                        <BarGraph config={specificTeamConfigs.endgameClimbDataPerRoundConfig(scoutingData, teamNumber)} />
                    </div>
                    <div className="graph-item">
                        <PieGraph config={specificTeamConfigs.endgameClimbUsagePieConfig(scoutingData, teamNumber)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={specificTeamConfigs.trapPerRoundConfig(scoutingData, teamNumber)} />
                    </div>
                    <div className="graph-item">
                        <PieGraph config={specificTeamConfigs.endgameTrapUsagePieConfig(scoutingData, teamNumber)} />
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
                        <RadarGraph config={specificTeamConfigs.teamPerformanceRadarConfig(scoutingData, teamNumber)} />
                    </div>
                </div>
            )}
        </div>
    );

    const handleTeam1NumberChange = (e) => {
        setTeam1Number(parseInt(e.target.value, 10));
    };

    const handleTeam2NumberChange = (e) => {
        setTeam2Number(parseInt(e.target.value, 10));
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
                        <NumberDisplay config={specificTeamConfigs.averageScoreConfig(scoutingData, team1Number)} />
                    </div>
                    <div className="graph-item">
                        <NumberDisplay config={specificTeamConfigs.averageScoreConfig(scoutingData, team2Number)} />
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
                        <BarGraph config={specificTeamConfigs.autonomousSpeakerConfig(scoutingData, team1Number)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={specificTeamConfigs.autonomousSpeakerConfig(scoutingData, team2Number)} />
                    </div>
                    <div className="graph-item">
                        <PieGraph config={specificTeamConfigs.autoPathUsagePieConfig(scoutingData, team1Number)} />
                    </div>
                    <div className="graph-item">
                        <PieGraph config={specificTeamConfigs.autoPathUsagePieConfig(scoutingData, team2Number)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={specificTeamConfigs.actualVsExpectedConfig(scoutingData, team1Number)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={specificTeamConfigs.actualVsExpectedConfig(scoutingData, team2Number)} />
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
                        <BarGraph config={specificTeamConfigs.teleopScoreByRoundConfig(scoutingData, team1Number)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={specificTeamConfigs.teleopScoreByRoundConfig(scoutingData, team2Number)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={specificTeamConfigs.teleopAccuracyPerRoundConfig(scoutingData, team1Number)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={specificTeamConfigs.teleopAccuracyPerRoundConfig(scoutingData, team2Number)} />
                    </div>
                    <div className="graph-item">
                        <MultiNumberDisplay config={specificTeamConfigs.teamTeleopStatsMultiNumberConfig(scoutingData, team1Number)} />
                    </div>
                    <div className="graph-item">
                        <MultiNumberDisplay config={specificTeamConfigs.teamTeleopStatsMultiNumberConfig(scoutingData, team2Number)} />
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
                    <div className="graph-item">
                        <BarGraph config={specificTeamConfigs.trapPerRoundConfig(scoutingData, team1Number)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={specificTeamConfigs.trapPerRoundConfig(scoutingData, team2Number)} />
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
                        <RadarGraph config={specificTeamConfigs.compareTeamsAverageRadarConfig(scoutingData, team1Number, team2Number)} />
                    </div>
                    <div className="graph-item">
                        <RadarGraph config={specificTeamConfigs.compareTeamsMaxRadarConfig(scoutingData, team1Number, team2Number)} />
                    </div>
                </div>
            )}
        </div>
    );

    const renderAllTeams = () => (
        <>
            <div className="team-selection-container">
                <div className="team-selection-buttons">
                    <button onClick={selectAllTeams}>Select All</button>
                    <button onClick={deselectAllTeams}>Deselect All</button>
                </div>

                <div className="team-selection">
                    {teamNumbers.map(teamNumber => (
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
            {allTeamsRenderGeneralSection()}
            {allTeamsRenderAutonomousSection()}
            {allTeamsRenderTeleopSection()}
            {allTeamsRenderEndgameSection()}
        </>
    );

    const renderSpecificTeam = () => (
        <>
            <div className="team-number-input">
                <label htmlFor="teamNumber">Select Team Number:</label>
                <input
                    type="number"
                    id="teamNumber"
                    value={teamNumber}
                    onChange={handleTeamNumberChange}
                    min="0"
                    placeholder="Enter team number"
                />
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
                <label htmlFor="teamNumber">Select Team 1 Number:</label>
                <input
                    type="number"
                    id="team1Number"
                    value={team1Number}
                    onChange={handleTeam1NumberChange}
                    min="0"
                    placeholder="Enter team number"
                />
            </div>
            <div className="team-number-input">
                <label htmlFor="teamNumber">Select Team 2 Number:</label>
                <input
                    type="number"
                    id="team2Number"
                    value={team2Number}
                    onChange={handleTeam2NumberChange}
                    min="0"
                    placeholder="Enter team number"
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
            </div>

            {renderSection()}
        </div>
    );
};

export default Visualization;

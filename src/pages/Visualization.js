import React, { useEffect, useState } from 'react';
import BarGraph from '../components/charts/barChart'; 
import './Visualization.css'; 
import {averageMatchScoreConfig, maxMatchScoreConfig, averageTeleopScoreConfig, maxTeleopScoreConfig, 
        averageAutonomousScoreConfig, maxAutonomousScoreConfig, averageAutonomousMovedConfig, averageAutonomousFoulConfig, 
        averageAutonomousSpeakerAccuracyConfig, maxAutonomousFoulConfig, averageTeleopSpeakerByTeamConfig, 
        maxTeleopSpeakerByTeamConfig, averageTeleopAmpByTeamConfig, maxTeleopAmpByTeamConfig, teleopAmpPercentInByTeamConfig,
        teleopSpeakerPercentInByTeamConfig, endgameClimbPercentByTeamConfig, averageEndgameTrapByTeamConfig } from '../components/chart-utils/configs';
import AreaGraphExample from '../components/charts/areaChart';
import PieGraphExample from '../components/charts/pieChart';
import LineGraphExample from '../components/charts/lineChart';
import RadarGraphExample from '../components/charts/radarChart';

const Visualization = () => {
    const [isPortrait, setIsPortrait] = useState(window.matchMedia("(orientation: portrait)").matches);
    const [activeTab, setActiveTab] = useState('AllTeams'); 
    const [openSections, setOpenSections] = useState(['general', 'autonomous', 'teleop', 'endgame', 'summary']);

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

    const renderGeneralSection = () => (
        <div className="section">
            <h2 className="chart-section-title" onClick={() => toggleSection('general')}>
                General {isSectionOpen('general') ? '▲' : '▼'}
            </h2>
            {isSectionOpen('general') && (
                <div className="graph-container">
                    <div className="graph-item">
                        <BarGraph config={averageMatchScoreConfig} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={maxMatchScoreConfig} />
                    </div>
                </div>
            )}
        </div>
    );

    const renderAutonomousSection = () => (
        <div className="section">
            <h2 className="chart-section-title" onClick={() => toggleSection('autonomous')}>
                Autonomous {isSectionOpen('autonomous') ? '▲' : '▼'}
            </h2>
            {isSectionOpen('autonomous') && (
                <div className="graph-container">
                    <div className="graph-item">
                        <BarGraph config={averageAutonomousScoreConfig} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={maxAutonomousScoreConfig} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={averageAutonomousMovedConfig} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={averageAutonomousSpeakerAccuracyConfig} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={averageAutonomousFoulConfig} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={maxAutonomousFoulConfig} />
                    </div>
                </div>
            )}
        </div>
    );

    const renderTeleopSection = () => (
        <div className="section">
            <h2 className="chart-section-title" onClick={() => toggleSection('teleop')}>
                Tele-Op {isSectionOpen('teleop') ? '▲' : '▼'}
            </h2>
            {isSectionOpen('teleop') && (
                <div className="graph-container">
                    <div className="graph-item">
                        <BarGraph config={averageTeleopScoreConfig} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={maxTeleopScoreConfig} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={averageTeleopSpeakerByTeamConfig} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={maxTeleopSpeakerByTeamConfig} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={averageTeleopAmpByTeamConfig} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={maxTeleopAmpByTeamConfig} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={teleopSpeakerPercentInByTeamConfig} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={teleopAmpPercentInByTeamConfig} />
                    </div>
                </div>
            )}
        </div>
    );

    const renderEndgameSection = () => (
        <div className="section">
            <h2 className="chart-section-title" onClick={() => toggleSection('endgame')}>
                Endgame {isSectionOpen('endgame') ? '▲' : '▼'}
            </h2>
            {isSectionOpen('endgame') && (
                <div className="graph-container">
                    <div className="graph-item">
                        <BarGraph config={endgameClimbPercentByTeamConfig} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={averageEndgameTrapByTeamConfig} />
                    </div>
                </div>
            )}
        </div>
    );


    const renderSummarySection = () => (
        <div className="section">
            <h2 className="chart-section-title" onClick={() => toggleSection('summary')}>
                Summary {isSectionOpen('summary') ? '▲' : '▼'}
            </h2>
            {isSectionOpen('summary') && (
                <div className="graph-container">
                    <p>Summary content goes here.</p>
                </div>
            )}
        </div>
    );

    const renderAllTeams = () => (
        <>
            {renderGeneralSection()}
            {renderAutonomousSection()}
            {renderTeleopSection()}
            {renderEndgameSection()}
        </>
    );

    const renderSpecificTeam = () => (
        <>
            {renderGeneralSection()}
            {renderAutonomousSection()}
            {renderTeleopSection()}
            {renderSummarySection()}
        </>
    );

    const renderComparison = () => (
        <>
            {renderGeneralSection()}
            {renderAutonomousSection()}
            {renderTeleopSection()}
            {renderSummarySection()}
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

import React, { useState, useEffect, useRef, useMemo } from 'react';
import './AutocompleteField.css';

const TeamNumberAutocomplete = ({ value, onChange, label, placeholder = "Type team number..." }) => {
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const wrapperRef = useRef(null);
    const inputRef = useRef(null);
    const scoutingData = require('../../utils').getScoutingData();
    
    // Create a map of team numbers to their full display text using useMemo
    const { teamMap, teamNumbers } = useMemo(() => {
        const map = {};
        const numbers = [];
        
        scoutingData.forEach(entry => {
            if (!map[entry.teamNumber]) {
                const teamName = entry.teamName || '';
                map[entry.teamNumber] = teamName ? `${entry.teamNumber} - ${teamName}` : entry.teamNumber.toString();
                numbers.push(entry.teamNumber);
            }
        });
        
        return {
            teamMap: map,
            teamNumbers: numbers.sort((a, b) => String(a).localeCompare(String(b)))
        };
    }, [scoutingData]);

    // Initialize inputValue with the full team name if available
    useEffect(() => {
        if (value) {
            const displayText = teamMap[value] || value.toString();
            setInputValue(displayText);
        } else {
            setInputValue('');
        }
    }, [value, teamMap]);

    // Filter suggestions based on input
    const filterSuggestions = (text) => {
        if (!text) {
            return [];
        }
        const searchValue = text.toLowerCase();
        return teamNumbers.filter(number => {
            const displayText = teamMap[number].toLowerCase();
            return displayText.includes(searchValue);
        });
    };

    // Handle input change
    const handleInputChange = (e) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        
        // If the input is empty, clear the value
        if (!newValue) {
            onChange('');
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        // Filter suggestions based on input
        const filteredSuggestions = filterSuggestions(newValue);
        setSuggestions(filteredSuggestions);
        setShowSuggestions(filteredSuggestions.length > 0);
        setHighlightedIndex(-1);
        
        // Update the parent component's value
        onChange(newValue);
    };

    // Handle suggestion click
    const handleSuggestionClick = (teamNumber) => {
        const displayText = teamMap[teamNumber];
        setInputValue(displayText);
        onChange(teamNumber);
        setSuggestions([]);
        setShowSuggestions(false);
        setHighlightedIndex(-1);
        
        // Focus the input after selection to prevent immediate reopening
        if (inputRef.current) {
            inputRef.current.blur();
        }
    };

    // Handle key navigation
    const handleKeyDown = (e) => {
        if (!showSuggestions || suggestions.length === 0) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setHighlightedIndex(prevIndex => 
                    prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setHighlightedIndex(prevIndex => prevIndex > 0 ? prevIndex - 1 : -1);
                break;
            case 'Enter':
                e.preventDefault();
                if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
                    handleSuggestionClick(suggestions[highlightedIndex]);
                } else {
                    setShowSuggestions(false);
                }
                break;
            case 'Escape':
                e.preventDefault();
                setShowSuggestions(false);
                setHighlightedIndex(-1);
                break;
            default:
                break;
        }
    };

    // Handle focus - only show suggestions if there's input
    const handleFocus = () => {
        if (inputValue) {
            const filteredSuggestions = filterSuggestions(inputValue);
            setSuggestions(filteredSuggestions);
            setShowSuggestions(filteredSuggestions.length > 0);
        }
    };

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowSuggestions(false);
                setHighlightedIndex(-1);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="field" ref={wrapperRef}>
            <label>{label}</label>
            <div className="autocomplete-container">
                <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={handleFocus}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                    placeholder={placeholder}
                />
                {showSuggestions && suggestions.length > 0 && (
                    <ul className="suggestions-list">
                        {suggestions.map((teamNumber, index) => (
                            <li
                                key={teamNumber}
                                onClick={() => handleSuggestionClick(teamNumber)}
                                className={`suggestion-item ${index === highlightedIndex ? 'highlighted' : ''}`}
                            >
                                {teamMap[teamNumber]}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default TeamNumberAutocomplete; 
import React, { useState, useEffect, useRef } from 'react';
import './AutocompleteField.css';

const AutocompleteField = ({ field, onChange, value }) => {
    const [inputValue, setInputValue] = useState(value || '');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [options, setOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [previewValue, setPreviewValue] = useState('');
    const wrapperRef = useRef(null);

    // Load options from localStorage or API if specified
    useEffect(() => {
        const loadOptions = async () => {
            // If options are directly provided in the field, use those
            if (field.options && Array.isArray(field.options)) {
                setOptions(field.options);
                return;
            }

            // If options should be loaded from localStorage
            if (field.optionsFromStorage) {
                try {
                    const storedOptions = JSON.parse(localStorage.getItem(field.optionsFromStorage) || '[]');
                    if (Array.isArray(storedOptions)) {
                        setOptions(storedOptions);
                    } else {
                        console.error(`Options from storage key "${field.optionsFromStorage}" is not an array`);
                    }
                } catch (error) {
                    console.error(`Error loading options from storage: ${error.message}`);
                }
                return;
            }

            // If options should be fetched from API using subURL
            if (field.apiSubUrl) {
                // First, try to load from localStorage if available
                let hasLocalData = false;
                if (field.storeInLocalStorage) {
                    try {
                        const storedOptions = JSON.parse(localStorage.getItem(field.storeInLocalStorage) || '[]');
                        if (Array.isArray(storedOptions) && storedOptions.length > 0) {
                            setOptions(storedOptions);
                            hasLocalData = true;
                            console.log(`Loaded ${storedOptions.length} options from localStorage`);
                        }
                    } catch (error) {
                        console.error(`Error loading options from localStorage: ${error.message}`);
                    }
                }
                
                // Only show loading indicator if we don't have local data
                if (!hasLocalData) {
                    setIsLoading(true);
                }
                
                // Then fetch from API in the background
                const fetchFromApi = async () => {
                    try {
                        const apiUrl = localStorage.getItem('api_url');
                        
                        if (!apiUrl) {
                            console.error('API URL not found in localStorage');
                            setIsLoading(false);
                            return;
                        }

                        // Replace placeholders in the subURL with values from localStorage
                        let endpoint = field.apiSubUrl;
                        const placeholderRegex = /{([^}]+)}/g;
                        
                        endpoint = endpoint.replace(placeholderRegex, (match, key) => {
                            const value = localStorage.getItem(key);
                            if (value === null) {
                                console.warn(`Placeholder ${key} not found in localStorage`);
                                return match; // Keep the original placeholder if not found
                            }
                            return value;
                        });

                        // Construct the full URL
                        const fullUrl = `${apiUrl}${endpoint}`;
                        console.log(`Fetching options from: ${fullUrl}`);
                        
                        // Get password from localStorage
                        const password = localStorage.getItem('password');
                        if (!password) {
                            console.error('Password not found in localStorage');
                            setIsLoading(false);
                            return;
                        }
                        
                        const response = await fetch(fullUrl, {
                            headers: {
                                'x-password': password
                            }
                        });
                        
                        if (!response.ok) {
                            throw new Error(`API request failed with status ${response.status}`);
                        }
                        
                        const data = await response.json();
                        
                        if (Array.isArray(data)) {
                            setOptions(data);
                            
                            // If a storage key is specified, save the data to localStorage
                            if (field.storeInLocalStorage) {
                                localStorage.setItem(field.storeInLocalStorage, JSON.stringify(data));
                                console.log(`Options saved to localStorage with key: ${field.storeInLocalStorage}`);
                            }
                        } else {
                            console.error('API response is not an array');
                        }
                    } catch (error) {
                        console.error(`Error fetching options from API: ${error.message}`);
                        // Don't show error toast to avoid interrupting the user
                    } finally {
                        setIsLoading(false);
                    }
                };
                
                // Start the fetch in the background
                fetchFromApi();
            }
        };

        loadOptions();
    }, [field]);

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Filter suggestions based on input
    useEffect(() => {
        if (inputValue && options.length > 0) {
            const filtered = options.filter(option =>
                option.toLowerCase().includes(inputValue.toLowerCase())
            );
            setSuggestions(filtered);
            setShowSuggestions(filtered.length > 0);
            setHighlightedIndex(-1);
            setPreviewValue('');
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
            setHighlightedIndex(-1);
            setPreviewValue('');
        }
    }, [inputValue, options]);

    const handleInputChange = (e) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        setPreviewValue('');
    };

    const handleSuggestionClick = (suggestion) => {
        setInputValue(suggestion);
        onChange(suggestion);
        setShowSuggestions(false);
        setHighlightedIndex(-1);
        setPreviewValue('');
    };

    const handleKeyDown = (e) => {
        if (!showSuggestions) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                const nextIndex = highlightedIndex < suggestions.length - 1 ? highlightedIndex + 1 : highlightedIndex;
                setHighlightedIndex(nextIndex);
                if (nextIndex >= 0) {
                    setPreviewValue(suggestions[nextIndex]);
                } else {
                    setPreviewValue('');
                }
                break;
            case 'ArrowUp':
                e.preventDefault();
                const prevIndex = highlightedIndex > 0 ? highlightedIndex - 1 : -1;
                setHighlightedIndex(prevIndex);
                if (prevIndex >= 0) {
                    setPreviewValue(suggestions[prevIndex]);
                } else {
                    setPreviewValue('');
                }
                break;
            case 'Enter':
                e.preventDefault();
                if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
                    handleSuggestionClick(suggestions[highlightedIndex]);
                }
                break;
            case 'Escape':
                e.preventDefault();
                setShowSuggestions(false);
                setHighlightedIndex(-1);
                setPreviewValue('');
                break;
            default:
                break;
        }
    };

    // Scroll highlighted item into view
    useEffect(() => {
        if (highlightedIndex >= 0 && suggestions.length > 0) {
            const element = document.getElementById(`suggestion-${highlightedIndex}`);
            if (element) {
                element.scrollIntoView({ block: 'nearest' });
            }
        }
    }, [highlightedIndex, suggestions.length]);

    return (
        <div className="field" ref={wrapperRef}>
            <label>{field.title}</label>
            <div className="autocomplete-container">
                <input
                    type="text"
                    required={field.required}
                    value={previewValue || inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => inputValue && setShowSuggestions(true)}
                    placeholder={field.placeholder || "Type to search..."}
                    disabled={isLoading}
                />
                {isLoading && !options.length && (
                    <div className="loading-indicator">Loading options...</div>
                )}
                {showSuggestions && (
                    <ul className="suggestions-list">
                        {suggestions.map((suggestion, index) => (
                            <li
                                id={`suggestion-${index}`}
                                key={index}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className={`suggestion-item ${index === highlightedIndex ? 'highlighted' : ''}`}
                            >
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default AutocompleteField; 
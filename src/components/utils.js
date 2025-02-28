// utils.js

// Function to retrieve scouting data from localStorage
export const getScoutingData = () => {
  const storedData = JSON.parse(localStorage.getItem('scouting_data') || '{}');
  return storedData && Array.isArray(storedData.entries) ? storedData.entries : [];
};

export const getPrincessData = () => {
  const storedData = JSON.parse(localStorage.getItem('princess_data') || '{}');
  return storedData && Array.isArray(storedData.entries) ? storedData.entries : [];
};

// Function to save scouting data to localStorage
export const saveScoutingData = (scoutingData) => {
  if (Array.isArray(scoutingData)) {
    localStorage.setItem('scouting_data', JSON.stringify({ entries: scoutingData }));
  } else {
    console.error('Invalid scouting data format: expected an array');
  }
};

export const savePrincessData = (princessData) => {
  if (Array.isArray(princessData)) {
    localStorage.setItem('princess_data', JSON.stringify({ entries: princessData }));
  } else {
    console.error('Invalid princess data format: expected an array');
  }
};

// Function to update scouting data from API with error propagation
export const updateScoutingDataFromAPI = async (password) => {
  const competitionId = localStorage.getItem('competition_id');
  const baseUrl = localStorage.getItem('api_url');
  const apiUrl = `${baseUrl}${competitionId}/entries`;
  const princessApiUrl = `${baseUrl}${competitionId}/princess`;

  const errorMessages = [];

  // Fetch scouting (entries) data
  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: { 'x-password': password },
    });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Failed to fetch scouting data (${response.status}): ${text}`);
    }
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Received non-JSON response for scouting data');
    }
    const data = await response.json();
    if (data && Array.isArray(data)) {
      saveScoutingData(data);
      console.log('Scouting data updated successfully');
    } else {
      throw new Error('Invalid data format received for scouting data');
    }
  } catch (error) {
    errorMessages.push(error.message);
  }

  // Fetch princess data
  try {
    const response = await fetch(princessApiUrl, {
      method: 'GET',
      headers: { 'x-password': password },
    });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Failed to fetch princess data (${response.status}): ${text}`);
    }
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Received non-JSON response for princess data');
    }
    const data = await response.json();
    if (data && Array.isArray(data)) {
      savePrincessData(data);
      console.log('Princess data updated successfully');
    } else {
      throw new Error('Invalid data format received for princess data');
    }
  } catch (error) {
    errorMessages.push(error.message);
  }

  if (errorMessages.length > 0) {
    throw new Error(errorMessages.join(' | '));
  }
};

// Function to upload all submissions from localStorage to API with error propagation
export const postAllSubmissions = async (password) => {
  const competitionId = localStorage.getItem('competition_id');
  const baseUrl = localStorage.getItem('api_url');
  const apiUrl = `${baseUrl}${competitionId}/entries`;
  const princessApiUrl = `${baseUrl}${competitionId}/princess`;

  const compressedSubmissions = JSON.parse(localStorage.getItem('submissions') || '[]');
  const compressedPrincessSubmissions = JSON.parse(localStorage.getItem('princessSubmissions') || '[]');

  if (!apiUrl || !princessApiUrl) {
    throw new Error('Submission API URL not found in localStorage');
  }

  // If there are no submissions for both entries and princess, throw an error.
  if (compressedSubmissions.length === 0 && compressedPrincessSubmissions.length === 0) {
    throw new Error('No submissions to upload');
  }

  const errorMessages = [];

  // Decompress and parse each entry submission
  const submissions = compressedSubmissions.map((submission) => {
    const decompressed = decompressAndDecode(submission);
    try {
      return JSON.parse(decompressed);
    } catch (e) {
      console.error('Error parsing decompressed submission:', decompressed);
      return null;
    }
  }).filter((submission) => submission !== null);

  // If there were submissions stored but none parsed correctly, register an error.
  if (compressedSubmissions.length > 0 && submissions.length === 0) {
    errorMessages.push('All scouting submissions failed to parse');
  } else if (submissions.length > 0) {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-password': password,
        },
        body: JSON.stringify({ entries: submissions }),
      });
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to upload scouting submissions (${response.status}): ${text}`);
      }
      localStorage.removeItem('submissions');
      console.log('Scouting submissions uploaded successfully');
    } catch (error) {
      errorMessages.push(error.message);
    }
  }

  // Decompress and parse each princess submission
  const princessSubmissions = compressedPrincessSubmissions.map((submission) => {
    const decompressed = decompressAndDecode(submission);
    try {
      return JSON.parse(decompressed);
    } catch (e) {
      console.error('Error parsing decompressed princess submission:', decompressed);
      return null;
    }
  }).filter((submission) => submission !== null);

  if (compressedPrincessSubmissions.length > 0 && princessSubmissions.length === 0) {
    errorMessages.push('All princess submissions failed to parse');
  } else if (princessSubmissions.length > 0) {
    try {
      const response = await fetch(princessApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-password': password,
        },
        body: JSON.stringify({ entries: princessSubmissions }),
      });
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to upload princess submissions (${response.status}): ${text}`);
      }
      localStorage.removeItem('princessSubmissions');
      console.log('Princess submissions uploaded successfully');
    } catch (error) {
      errorMessages.push(error.message);
    }
  }

  if (errorMessages.length > 0) {
    throw new Error(errorMessages.join(' | '));
  }
};

// Function to save the API URL to localStorage
export const saveAPIURLToLocalStorage = (url) => {
  try {
    const validatedUrl = new URL(url);
    if (validatedUrl.protocol !== 'http:' && validatedUrl.protocol !== 'https:') {
      console.error('Invalid URL protocol. URL must start with "http://" or "https://".');
      return [false, 'Invalid URL protocol. URL must start with "http://" or "https://".'];
    }
    localStorage.setItem('api_url', validatedUrl.toString());
    console.log('API URL saved to localStorage.');
    return [true, 'API URL saved successfully.'];
  } catch (error) {
    console.error('Invalid URL format:', error);
    return [false, 'Invalid URL format.'];
  }
};

export const savePasswordToLocalStorage = (password) => {
  if (password) {
    localStorage.setItem('password', password);
    console.log('Password saved to localStorage.');
    return [true, 'Password saved successfully.'];
  }
  return [false, 'Invalid password.'];
};

export const getPasswordFromLocalStorage = () => {
  return localStorage.getItem('password') || '';
};

// Compress/Decompress utilities
const LZUTF8 = require('lzutf8');

export const decompressAndDecode = (content) => {
  return LZUTF8.decompress(content, { inputEncoding: 'Base64', outputEncoding: 'String' });
};

export const compressAndEncode = (content) => {
  return LZUTF8.compress(content, { outputEncoding: 'Base64' });
};

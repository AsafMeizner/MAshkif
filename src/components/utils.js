// utils.js

// Function to retrieve scouting data from localStorage
export const getScoutingData = () => {
  const storedData = JSON.parse(localStorage.getItem('scouting_data_dcmp') || '{}');
  if (storedData && Array.isArray(storedData.entries)) {
    return storedData.entries;
  }
  return [];
};

// Function to save scouting data to localStorage
export const saveScoutingData = (scoutingData) => {
  if (Array.isArray(scoutingData)) {
    localStorage.setItem('scouting_data_dcmp', JSON.stringify({ entries: scoutingData }));
  } else {
    console.error('Invalid scouting data format: expected an array');
  }
};

// Function to update scouting data from API
export const updateScoutingDataFromAPI = async (password) => {
  const apiUrl = localStorage.getItem('scouting_data_url')

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'x-password': password,
      },
    });

    if (!response.ok) {
      const responseText = await response.text();
      console.error('Error response text:', responseText);
      throw new Error(`Failed to fetch scouting data: ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const responseText = await response.text();
      console.error('Non-JSON response:', responseText);
      throw new Error('Received non-JSON response from the server');
    }

    const data = await response.json();
    if (data.entries && Array.isArray(data.entries)) {
      saveScoutingData(data.entries);
      console.log('Scouting data updated successfully');
    } else {
      console.error('Invalid data format received from API');
    }
  } catch (error) {
    console.error('Error updating scouting data:', error);
  }
};


// Function to upload all submissions from localStorage to API
export const postAllSubmissions = async (password) => {
  const apiUrl = localStorage.getItem('scouting_data_url')

  const compressedSubmissions = JSON.parse(localStorage.getItem('submissions') || '[]');
  
  if (!apiUrl) {
    console.error('Submission API URL not found in localStorage');
    return;
  }

  if (compressedSubmissions.length === 0) {
    console.warn('No submissions to upload');
    return;
  }

  // Decompress and parse each submission
  const submissions = compressedSubmissions.map(submission => {
    const decompressed = decompressAndDecode(submission);
    try {
      return JSON.parse(decompressed); // Ensure decompressed data is a JavaScript object
    } catch (e) {
      console.error('Error parsing decompressed submission:', decompressed);
      return null;
    }
  }).filter(submission => submission !== null); // Filter out any invalid entries

  console.log('Uploading submissions to API:', apiUrl);
  console.log('Submissions:', submissions);

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-password': password,
      },
      body: JSON.stringify({ entries: submissions }),  // Send the parsed entries
    });

    if (!response.ok) {
      const responseText = await response.text();
      console.error('Error response from server:', responseText);
      throw new Error('Failed to upload submissions');
    }

    localStorage.removeItem('submissions');
    console.log('Submissions uploaded successfully');
  } catch (error) {
    console.error('Error uploading submissions:', error);
  }
};


// Function to save the API URL to localStorage
export const saveAPIURLToLocalStorage = (url) => {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    console.error('Invalid URL format. It should start with "http://" or "https://".');
    return;
  }
  localStorage.setItem('scouting_data_url', url);
  console.log('API URL saved to localStorage.');
};

// Compress/Decompress utilities
const LZUTF8 = require('lzutf8');

export const decompressAndDecode = (content) => {
  return LZUTF8.decompress(content, { inputEncoding: 'Base64', outputEncoding: 'String' });
};

export const compressAndEncode = (content) => {
  return LZUTF8.compress(content, { outputEncoding: 'Base64' });
};

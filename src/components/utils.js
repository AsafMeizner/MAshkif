// utils.js

// Function to retrieve scouting data from localStorage
export const getScoutingData = () => {
  const storedData = JSON.parse(localStorage.getItem('scouting_data') || '{}');
  if (storedData && Array.isArray(storedData.entries)) {
    return storedData.entries;
  }
  return [];
};

export const getPrincessData = () => {
  const storedData = JSON.parse(localStorage.getItem('princess_data') || '{}');
  if (storedData && Array.isArray(storedData.entries)) {
    return storedData.entries;
  }
  return [];
}

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


// Function to update scouting data from API
export const updateScoutingDataFromAPI = async (password) => {
  const apiUrl = localStorage.getItem('scouting_data_url')
  const princessApiUrl = localStorage.getItem('scouting_data_url') + '/princess';

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
    if (data && Array.isArray(data)) {
      saveScoutingData(data);
      console.log('Scouting data updated successfully');
    } else {
      console.error('Invalid data format received from API');
    }
  } catch (error) {
    console.error('Error updating scouting data:', error);
  }
  
  try {
    const response = await fetch(princessApiUrl, {
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
    if (data && Array.isArray(data)) {
      savePrincessData(data);
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
  const princessApiUrl = localStorage.getItem('scouting_data_url') + '/princess';

  const compressedSubmissions = JSON.parse(localStorage.getItem('submissions') || '[]');
  const compressedPrincessSubmissions = JSON.parse(localStorage.getItem('princessSubmissions') || '[]');

  if (!apiUrl || !princessApiUrl) {
    console.error('Submission API URL not found in localStorage');
    return;
  }

  if (compressedSubmissions.length === 0) {
    console.warn('No submissions to upload');
  }

  if (compressedPrincessSubmissions.length === 0) {
    console.warn('No princess submissions to upload');
  }

  if (compressedSubmissions.length === 0 && compressedPrincessSubmissions.length === 0) {
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

  // now for princess submissions
  const princessSubmissions = compressedPrincessSubmissions.map(submission => {
    const decompressed = decompressAndDecode(submission);
    try {
      return JSON.parse(decompressed); // Ensure decompressed data is a JavaScript object
    } catch (e) {
      console.error('Error parsing decompressed submission:', decompressed);
      return null;
    }
  }).filter(submission => submission !== null); // Filter out any invalid entries

  console.log('Uploading submissions to API:', princessApiUrl);
  console.log('Submissions:', princessSubmissions);

  try {
    const response = await fetch(princessApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-password': password,
      },
      body: JSON.stringify({ entries: princessSubmissions }),  // Send the parsed entries
    });

    if (!response.ok) {
      const responseText = await response.text();
      console.error('Error response from server:', responseText);
      throw new Error('Failed to upload submissions');
    }

    localStorage.removeItem('princessSubmissions');
    console.log('Submissions uploaded successfully');
  } catch (error) {
    console.error('Error uploading submissions:', error);
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
    localStorage.setItem('scouting_data_url', validatedUrl.toString());
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

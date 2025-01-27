const BASE_URL = 'https://api.spotify.com/v1';


export const fetchData = async (endpoint, accessToken, limit = 10) => {
  try {
    const endpointWithLimit = `${endpoint}${endpoint.includes('?') ? '&' : '?'}limit=${limit}`;
      
      const response = await fetch(`${BASE_URL}${endpointWithLimit}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
};

export const playTrack = async ({ token, uri, positionMs }) => {
  const response = await fetch(`https://api.spotify.com/v1/me/player/play`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "uris": [uri],
      "position_ms": positionMs
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to play track');
  }

  return response.json();
};

export const putRequest = async ({ token, endpoint, body = null }) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : null,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Request failed: ${errorText}`);
  }

  return response.status;
};

export const seekPlayback = async ({ token, positionMs }) => {
  const endpoint = `/me/player/seek?position_ms=${positionMs}`;
  console.log(endpoint)
  return await putRequest({ token, endpoint });
};

export const setRepeatMode = async ({ token, state }) => {
  const endpoint = `/me/player/repeat?state=${state}`;
  return await putRequest({ token, endpoint });
};

export const setVolume = async ({ token, volumePercent }) => {
  const endpoint = `/me/player/volume?volume_percent=${volumePercent}`;
  return await putRequest({ token, endpoint });
};
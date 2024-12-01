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
  
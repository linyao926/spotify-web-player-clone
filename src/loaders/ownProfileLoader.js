import { getState } from "~/redux/store";
import { fetchData } from '~/services/api';

const ownProfileLoader = async ({ params }) => {
  try {
    const state = getState();
    const accessToken = state.auth.accessToken;

    if (!accessToken) {
      throw new Error("Access token is missing. Please log in again.");
    }
    
    const profileInfo = await fetchData('/me', accessToken);
      
    const profileTopTracks = await fetchData('/me/top/tracks?time_range=short_term', accessToken);

    const profileTopArtists = await fetchData('/me/top/artists?time_range=short_term', accessToken);

    return {
      profileInfo,
      profileTopTracks,
      profileTopArtists,
    };
  } catch (error) {
    console.error("Error in ownProfileLoader:", error.message);
    throw new Response("Failed to load own profile data", {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
};

export default ownProfileLoader;
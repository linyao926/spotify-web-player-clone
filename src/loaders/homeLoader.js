import { getState } from "~/redux/store";
import { fetchData } from '~/services/api';

const homeLoader = async () => {
  try {
    const state = getState();
    const accessToken = state.auth.accessToken;

    if (!accessToken) {
      throw new Error("Access token is missing. Please log in again.");
    }

    const [
      recentlyPlayed,
      // recommendedToday,
      // popularplaylist,
      newReleases,
      topArtists,
      topTracks
    ] = await Promise.all([
      fetchData('/me/player/recently-played', accessToken),
      // fetchData('/recommendations?seed_tracks=6MmN7FsbgqDLZH4H68hPpZ', accessToken),
      // fetchData('/browse/featured-playlists', accessToken),
      fetchData('/browse/new-releases', accessToken),
      fetchData('/me/top/artists', accessToken, 2), 
      fetchData('/me/top/tracks', accessToken, 2)
    ]);

    return {
      recentlyPlayed: recentlyPlayed.items,
      // recommendedToday: recommendedToday.tracks,
      // popularplaylist: popularplaylist.playlists.items,
      newReleases: newReleases.albums.items,
      topArtists: topArtists.items,  
      topTracks: topTracks.items   
    };
  } catch (error) {
    console.error("Error in homeLoader:", error.message);
    throw new Response("Failed to load home data", {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
};

export default homeLoader;
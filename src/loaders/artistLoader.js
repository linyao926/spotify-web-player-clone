import { getState } from "~/redux/store";
import { fetchData } from '~/services/api';

const artistLoader = async ({ params }) => {
  try {
    const state = getState();
    const accessToken = state.auth.accessToken;

    if (!accessToken) {
      throw new Error("Access token is missing. Please log in again.");
    }

    const { id } = params;

    const [
      artist,
      artistAlbums,
      artistTopTracks
    ] = await Promise.all([
        fetchData(`/artists/${id}`, accessToken),
        fetchData(`/artists/${id}/albums`, accessToken, 50),
        fetchData(`/artists/${id}/top-tracks`, accessToken)
    ]);
    return {
      artistInfo: artist,
      artistAlbums: artistAlbums,
      artistTopTracks: artistTopTracks,
    };
  } catch (error) {
    console.error("Error in artistLoader:", error.message);
    throw new Response("Failed to load artist data", {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
};

export default artistLoader;
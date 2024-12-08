import { getState } from "~/redux/store";
import { fetchData } from '~/services/api';

const trackLoader = async ({ params }) => {
  try {
    const state = getState();
    const accessToken = state.auth.accessToken;

    if (!accessToken) {
      throw new Error("Access token is missing. Please log in again.");
    }

    const { id } = params;

    const track = await fetchData(`/tracks/${id}`, accessToken);
    
    const albumId = track.album.id;
    const album = await fetchData(`/albums/${albumId}`, accessToken);

    const artistId = track.artists[0].id;
    const [
      artist,
      artistAlbums,
      artistSingles,
      artistTopTracks
    ] = await Promise.all([
        fetchData(`/artists/${artistId}`, accessToken),
        fetchData(`/artists/${artistId}/albums?include_groups=album`, accessToken, 50),
        fetchData(`/artists/${artistId}/albums?include_groups=single`, accessToken, 50),
        fetchData(`/artists/${artistId}/top-tracks`, accessToken)
    ]);

    return {
      trackInfo: track,
      trackArtist: artist,
      album: album,
      artistAlbums: artistAlbums,
      artistSingles: artistSingles,
      artistTopTracks: artistTopTracks,
    };
  } catch (error) {
    console.error("Error in trackLoader:", error.message);
    throw new Response("Failed to load track data", {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
};

export default trackLoader;
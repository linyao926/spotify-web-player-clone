import { store } from "~/redux/store";
import { fetchData } from '~/services/api';

const playlistLoader = async ({ params }) => {
  try {
    const state = store.getState();
    const accessToken = state.auth.accessToken;

    if (!accessToken) {
      throw new Error("Access token is missing. Please log in again.");
    }

    const { id } = params;

    const playlist = await fetchData(`/playlists/${id}`, accessToken, 50);
    const ownerId = playlist.owner.id;
    const relatedFirstArtistId = playlist.tracks.items[0].track.artists[0].id;

    let randomIndex = Math.floor(Math.random() * (playlist.tracks.total - 1));
    if (randomIndex === 0 && playlist.tracks.total > 1) {
      randomIndex = 1;
    }

    const relatedArtistRandomId = playlist.tracks.items[randomIndex].track.artists[0].id;

    const [ownerData, relatedFirstArtistTracks, relatedArtistRandomTracks] = await Promise.all([
      fetchData(`/users/${ownerId}`, accessToken),
      fetchData(`/artists/${relatedFirstArtistId}/top-tracks`, accessToken, 5),
      fetchData(`/artists/${relatedArtistRandomId}/top-tracks`, accessToken, 5),
    ]);

    return {
      playlistInfo: {
        description: playlist.description,
        followers: playlist.followers.total,
        images: playlist.images,
        name: playlist.name,
        owner: ownerData,
        id: playlist.id,
        type: playlist.type,
        track_total: playlist.tracks.total,
      },
      playlistItems: playlist.tracks.items,
      relatedTrack: [
        ...relatedFirstArtistTracks.tracks,
        ...relatedArtistRandomTracks.tracks,
      ],
    };
  } catch (error) {
    console.error("Error in playlistLoader:", error.message);
    throw new Response("Failed to load playlist data", {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
};

export default playlistLoader;
import { getState } from "~/redux/store";
import { fetchData } from '~/services/api';

const albumLoader = async ({ params }) => {
  try {
    const state = getState();
    const accessToken = state.auth.accessToken;

    if (!accessToken) {
      throw new Error("Access token is missing. Please log in again.");
    }

    const { id } = params;

    const album = await fetchData(`/albums/${id}`, accessToken, 50);
    const relatedArtistId = album.artists[0].id;
    const artist = await fetchData(`/artists/${relatedArtistId}`, accessToken);
    const relatedArtistTracks = await fetchData(`/artists/${relatedArtistId}/top-tracks`, accessToken);

    const albumItems = [...album.tracks.items];

    albumItems.forEach(item => {
        item.album = {
        images: album.images,
        name: album.name
        }
    });

    return {
        albumInfo: {
        "images": album.images,
        "name": album.name,
        "release_date": album["release_date"],
        "artists": artist,
        "id": album.id,
        "type": album.type,
        "album_type": album["album_type"],
        "track_total": album['total_tracks'],
        },
        albumItems: album.tracks.items,
        relatedTrack: relatedArtistTracks,
    };
  } catch (error) {
    console.error("Error in albumLoader:", error.message);
    throw new Response("Failed to load album data", {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
};

export default albumLoader;
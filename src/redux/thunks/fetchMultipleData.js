import { fetchAlbums } from './redux/slices/albumsSlice';
import { fetchArtists } from './redux/slices/artistsSlice';
import { fetchPlaylists } from './redux/slices/playlistsSlice';

export const fetchMultipleData = () => async (dispatch) => {
    try {
      await Promise.all([
        // dispatch(fetchAlbums('/v1/albums')),
        // dispatch(fetchArtists('/v1/artists')),
        // dispatch(fetchPlaylists('/v1/playlists'))
      ]);
    } catch (error) {
      console.error('Failed to fetch multiple data:', error);
    }
};
import { openModal } from '~/redux/slices/uiSlice';

export const updateContextMenuActions = (contextMenu, navigate, setAlbumId, setCreditModalState, dispatch, albumData, item) => {
    return contextMenu.map((obj) => {
        if (obj.name.includes('Go to album')) {
            obj.onClick = () => navigate(`/album/${item.album.id}`);
        }

        if (obj.name.includes('credits')) {
            obj.onClick = () => {
                setAlbumId(item.album.id);
                if (albumData.label) {
                    setCreditModalState({
                        title: item.name,
                        performed: item.artists.map(artist => artist.name),
                        sourceTrack: albumData.label,
                    });
                }
                dispatch(openModal({ name: 'track-credit' }));
            };
        }

        return obj; 
    });
};

export const getArtistsOfTrack = (artists, navigate) => {
    const result = artists.map(artist => (
        {
            name: artist.name, 
            id: artist.id,
            onClick: () => navigate(`/artist/${artist.id}`)
        }
    ));

    return result;
};
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
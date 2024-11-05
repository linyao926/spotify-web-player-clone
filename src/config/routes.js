const routes = {
    home: `/`,
    search: `/search`,
    album: `/album/:albumId/`,
    playlist: `/playlist/:playlistId/`,
    track: `/track/:trackId/`,
    artist: `/artist/:artistId/`,
    profile: `/user/:userId/`,
    download: `/download`,
    settings: 'preferences',
    likedTracks: '/collection/tracks',
    savedPlaylist: '/collection/playlists',
    likedAlbums: '/collection/albums',
    followArtists: '/collection/artists',
    login: '/auth/login',
};

export default routes;
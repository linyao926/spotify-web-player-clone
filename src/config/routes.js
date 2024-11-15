const routes = {
    home: `/`,
    search: `/search`,
    album: `/album/:albumId/`,
    playlist: `/playlist/:playlistId/`,
    track: `/track/:trackId/`,
    artist: `/artist/:artistId/`,
    profile: `/user/:userId/`,
    download: `/download`,
    settings: '/settings',
    collectionTracks: '/collection/tracks',
    login: '/auth/login',
};

export default routes;
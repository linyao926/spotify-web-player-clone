const routes = {
    home: `/`,
    search: `/search`,
    album: `/album/:albumId/`,
    playlist: `/playlist/:playlistId/`,
    track: `/track/:trackId/`,
    artist: `/artist/:artistId/`,
    ownProfile: `/user/:userId/`,
    userProfile: `/user/:userId/`,
    download: `/download`,
    settings: '/settings',
    collectionTracks: '/collection/tracks',
    login: '/auth/login',
};

export default routes;
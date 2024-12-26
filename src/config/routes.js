const routes = (id = '') => ({
    home: `/`,
    search: `/search`,
    album: `/album/${id}`,
    playlist: `/playlist/${id}`,
    collectionTracks: '/collection/tracks',
    'my_playlist': `/my_playlist/${id}`,
    track: `/track/${id}`,
    artist: `/artist/${id}`,
    ownProfile: `/user/${id}`,
    userProfile: `/user/${id}`,
    genre: `/genre/${id}`,
    download: `/download`,
    settings: '/preferences',
    login: '/auth/login',
});

export default routes;
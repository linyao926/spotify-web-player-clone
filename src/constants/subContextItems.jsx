import React from 'react';
import { logout } from '~/redux/slices/authSlice'; 
import { 
  setLibraryOptions,
} from '~/redux/slices/uiSlice';
import { createPlaylist, deletePlaylist } from '~/redux/slices/myPlaylistSlice';
import { addToLibrary, removeFromLibrary } from '~/redux/slices/librarySlice';
import { addToQueue } from '~/redux/slices/queueSlice';
import { 
  ExternalIcon, 
  CompactIcon, 
  ListIcon, 
  GridIcon,
  AddToLibrarySmallIcon,
  AddToQueueIcon,
  ShareIcon,
  CopyLinkIcon,
  ExpandIcon,
  RemoveFromIcon,
  AddToProfileIcon,
  MusicalNotePlusIcon,
  PinIcon,
  RemoveQueueIcon,
  ArtistFallbackIcon,
  AlbumFallbackIcon,
  CreditIcon,
  FollowIcon,
  DismissSmallIcon,
  EditIcon,
  DeleteIcon,
  PlusIcon,
} from "~/assets/icons/icons";
import config from "~/config";

export const profileSubContext = (id, dispatch) => [
    {
      name: "Account",
      iconRight: <ExternalIcon/>,
      externalLink: config.externalLink.account,
    },
    {
      name: "Profile",
      routeLink: config.routes(id).ownProfile,
      textUnderline: true,
    },
    {
      name: "Settings",
      routeLink: config.routes('').settings,
      textUnderline: true,
      borderBottom: true,
    },
    {
      name: "Log out",
      onClick: () => {
        dispatch(logout());
      }
    },
];

export const trackListViewAsSubContext = [
  {
    name: "View as",
    disableItem: true,
  },
  {
    name: "Compact",
    iconLeft: <CompactIcon />,
    value: 'compact'
  },
  {
    name: "List",
    iconLeft: <ListIcon />,
    value: 'list'
  }
];

const handleChangeOption = (dispatch, mode, sortBy) => {
  dispatch(
    setLibraryOptions({
      'view-mode': mode,
      'sort-by': sortBy, 
    })
  );
};

export const libraryOptionsSubContext = (dispatch, options) => [
  {
    name: "Sort by",
    disableItem: true,
  },
  {
    name: "Recents",
    value: 'recents',
    iconRight: options['sort-by'] === 'recents',
    active: options['sort-by'] === 'recents',
    onClick: () => {
      const currentViewMode = options['view-mode'];
      handleChangeOption(dispatch, currentViewMode, 'recents')
    },
  },
  {
    name: "Recently Added",
    value: 'recently added',
    iconRight: options['sort-by'] === 'recently added',
    active: options['sort-by'] === 'recently added',
    onClick: () => {
      const currentViewMode = options['view-mode'];
      handleChangeOption(dispatch, currentViewMode, 'recently added')
    },
  },
  {
    name: "Alphabetical",
    value: 'alphabetical',
    iconRight: options['sort-by'] === 'alphabetical',
    active: options['sort-by'] === 'alphabetical',
    onClick: () => {
      const currentViewMode = options['view-mode'];
      handleChangeOption(dispatch, currentViewMode, 'alphabetical')
    },
  },
  {
    name: "Creator",
    value: 'creator',
    iconRight: options['sort-by'] === 'creator',
    active: options['sort-by'] === 'creator',
    borderBottom: true,
    onClick: () => {
      const currentViewMode = options['view-mode'];
      handleChangeOption(dispatch, currentViewMode, 'creator')
    },
  },
  {
    name: "View as",
    disableItem: true,
  },
  {
    name: "Compact",
    iconLeft: <CompactIcon />,
    value: 'compact',
    iconRight: options['view-mode'] === 'compact',
    active: options['view-mode'] === 'compact',
    onClick: () => {
      const currentSortBy = options['sort-by'];
      handleChangeOption(dispatch, 'compact', currentSortBy)
    },
  },
  {
    name: "List",
    iconLeft: <ListIcon />,
    value: 'list',
    iconRight: options['view-mode'] === 'list',
    active: options['view-mode'] === 'list',
    onClick: () => {
      const currentSortBy = options['sort-by'];
      handleChangeOption(dispatch, 'list', currentSortBy)
    },
  },
  {
    name: "Grid",
    iconLeft: <GridIcon />,
    value: 'grid',
    iconRight: options['view-mode'] === 'grid',
    active: options['view-mode'] === 'grid',
    onClick: () => {
      const currentSortBy = options['sort-by'];
      handleChangeOption(dispatch, 'grid', currentSortBy)
    },
  },
];

const shareLink = {
  name: "Share",
  iconLeft: <ShareIcon />,
  subMenu: [{
    name: 'Copy link',
    iconLeft: <CopyLinkIcon />,
    onClick: () => {
      navigator.clipboard.writeText(window.location.href);
    },
  }]
};

const libraryActions = (type, item, action, dispatch) => ({
  name: action === 'ADD' ? "Add to Library" : "Remove from Library",
  iconLeft: action === 'ADD' ? <AddToLibrarySmallIcon /> : <RemoveFromIcon />,
  onClick: () => action === 'ADD' ? dispatch(addToLibrary({type, item})) : dispatch(removeFromLibrary({type, id: item.id})),
  iconActive: action === 'ADD' ? false : true,
});

const queueActions = (tracks, action, dispatch) => ({
  name: action === 'ADD' ? "Add to Queue" : "Remove from Queue",
  iconLeft: action === 'ADD' ? <AddToQueueIcon /> : <RemoveQueueIcon />,
  onClick: () => action === 'ADD' ? dispatch(addToQueue({tracks})) : dispatch(removeFromQueue()),
});

const cretePlaylistAction = {
  name: "Create playlist",
  iconLeft: <MusicalNotePlusIcon />,
};

const pinAction = (type) => ({
  name: `Pin ${type}`,
  iconLeft: <PinIcon />,
});

const addPlaylistToProfile = (id, action, dispatch) => ({
  name: action === 'ADD' ? "Add to profile" : "Remove from profile",
  iconLeft: <AddToProfileIcon />,
  onClick: () => action === 'ADD' ? dispatch(addToLibrary(id)) : dispatch(addToLibrary(id)),
  borderBottom: true,
});

export const playlistContextMenu = (item = {id: ''}, action, dispatch) => [
  libraryActions('playlists', item, action, dispatch),
  {
    ...queueActions(item.tracks ? item.tracks.items : [], 'ADD', dispatch),
    borderBottom: true,
  },
  shareLink,
];

export const libraryPlaylistContextMenu = (item = {id: ''} , profileAction, dispatch) => [
  {
    ...queueActions('playlists', item, 'ADD', dispatch),
    borderBottom: true,
  },
  addPlaylistToProfile(item.id, profileAction, dispatch),
  {
    ...libraryActions('playlists', item, 'REMOVE', dispatch),
    borderBottom: true,
  },
  cretePlaylistAction,
  {
    ...pinAction('playlist'),
    borderBottom: true,
  },
  shareLink,
];

export const myPlaylistContextMenu = (id, tracks, action, dispatch) => [
  queueActions(tracks, 'ADD', dispatch),
  addPlaylistToProfile(id, action, dispatch),
  {
    name: 'Edit details',
    iconLeft: <EditIcon />,
    onClick: () => {return},
  },
  {
    name: 'Delete',
    iconLeft: <DeleteIcon />,
    onClick: () => {dispatch(deletePlaylist({playlistId: id}))},
    borderBottom: true,
  },
  cretePlaylistAction,
  {
    ...pinAction('playlist'),
    borderBottom: true,
  },
  shareLink,
];

export const albumContextMenu = (item = {id: ''}, action, dispatch) => [
  libraryActions('albums', item, action, dispatch),
  {
    ...queueActions(item.tracks ? item.tracks.items : [], 'ADD', dispatch),
    borderBottom: true,
  },
  {
    name: 'Add to playlist',
    iconLeft: <PlusIcon />,
    subMenu: [],
  },
  shareLink,
];

export const libraryAlbumContextMenu = (item = {id: ''} ,dispatch) => [
  libraryActions('albums', item, 'REMOVE', dispatch),
  {
    ...queueActions(item, 'ADD', dispatch),
    borderBottom: true,
  },
  pinAction('album'),
  {
    name: 'Add to playlist',
    iconLeft: <PlusIcon />,
    subMenu: [],
  },
  shareLink,
];

export const artistContextMenu = (item = {id: ''}, action, dispatch) => [
  {
    name: action === 'ADD' ? "Follow" : "Unfollow",
    iconLeft: action === 'ADD' ? <FollowIcon /> : <DismissSmallIcon />,
    onClick: () => action === 'ADD' ? dispatch(addToLibrary({type: 'artists', item})) : dispatch(removeFromLibrary({type: 'artists' , id: item.id})),
  },
  shareLink,
];

export const libraryArtistContextMenu = (id, dispatch) => [
  {
    name: "Unfollow",
    iconLeft: <DismissSmallIcon />,
    onClick: () => dispatch(removeFromLibrary({type: 'artists' , id})),
  },
  pinAction('artist'),
  shareLink,
];

export const trackContextMenu = (item, action, dispatch, inAlbum = false, inArtist = false, artists = []) => [
  {
    name: 'Add to playlist',
    iconLeft: <PlusIcon />,
    subMenu: [],
  },
  {
    name: action === 'ADD' ? "Save to your Liked Songs" : "Remove from your Liked Songs",
    iconLeft: action === 'ADD' ? <AddToLibrarySmallIcon /> : <RemoveFromIcon />,
    onClick: () => action === 'ADD' ? dispatch(addToLibrary({type: 'likedTracks', item})) : dispatch(removeFromLibrary({type: 'likedTracks', id: item.id})),
  },
  {
    ...queueActions([item], 'ADD', dispatch),
    borderBottom: true,
  },
  {
    name: 'Go to artist',
    iconLeft: <ArtistFallbackIcon />,
    subMenu: artists.length > 1 ? artists.map(item => ({
      name: item.name,
      onClick: () => {return}
    })) : [],
    onClick: () => {
      if (artists.length === 1) {
        return;
      }
    },
    hidden: inArtist,
  },
  {
    name: 'Go to album',
    iconLeft: <AlbumFallbackIcon />,
    onClick: () => {return},
    hidden: inAlbum,
  },
  {
    name: 'View credits',
    iconLeft: <CreditIcon />,
    onClick: () => {return},
    borderBottom: true,
  },
  shareLink,
];

export const queueTrackContextMenu = (item, action, dispatch, artists = []) => [
  {
    name: 'Add to playlist',
    iconLeft: <PlusIcon />,
    iconRight: <ExpandIcon />,
    subMenu: [],
  },
  {
    name: action === 'ADD' ? "Save to your Liked Songs" : "Remove from your Liked Songs",
    iconLeft: action === 'ADD' ? <AddToLibrarySmallIcon /> : <RemoveFromIcon />,
    onClick: () => action === 'ADD' ? dispatch(addToLibrary({type: 'likedTracks', item})) : dispatch(removeFromLibrary({type: 'likedTracks', id: item.id})),
  },
  queueActions([item], 'ADD', dispatch),
  {
    ...queueActions(item.id, 'REMOVE', dispatch),
    borderBottom: true,
  },
  {
    name: 'Go to artist',
    iconLeft: <ArtistFallbackIcon />,
    subMenu: artists.length > 1 ? artists.map(item => ({
      name: item.name,
      onClick: () => {return}
    })) : [],
    onClick: () => {
      if (artists.length === 1) {
        return;
      }
    }
  },
  {
    name: 'Go to album',
    iconLeft: <AlbumFallbackIcon />,
    onClick: () => {return}
  },
  {
    name: 'View credits',
    iconLeft: <CreditIcon />,
    onClick: () => {return},
    borderBottom: true,
  },
  shareLink,
];
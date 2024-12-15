import React from 'react';
import { logout } from '~/redux/slices/authSlice'; 
import { 
  setLibraryOptions,

} from '~/redux/slices/uiSlice';
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
} from "~/assets/icons/icons";
import config from "~/config";
import { PlusIcon } from '../assets/icons/icons';

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

const libraryActions = (id, action, dispatch) => ({
  name: action === 'ADD' ? "Add to Library" : "Remove from Library",
  iconLeft: action === 'ADD' ? <AddToLibrarySmallIcon /> : <RemoveFromIcon />,
  onClick: () => action === 'ADD' ? dispatch(addToLibrary(id)) : dispatch(removeFromLibrary(id)),
});

const queueActions = (id, action, dispatch) => ({
  name: action === 'ADD' ? "Add to Queue" : "Remove from Queue",
  iconLeft: action === 'ADD' ? <AddToQueueIcon /> : <RemoveQueueIcon />,
  onClick: () => action === 'ADD' ? dispatch(addToQueue(id)) : dispatch(removeFromQueue(id)),
});

const cretePlaylistAction = (dispatch) => ({
  name: "Add to Library",
  iconLeft: <MusicalNotePlusIcon />,
  onClick: () => {return},
});

const pinAction = (id, type, dispatch) => ({
  name: `Pin ${type}`,
  iconLeft: <PinIcon />,
  onClick: () => dispatch(addToLibrary(id)),
});

const addPlaylistToProfile = (id, action, dispatch) => ({
  name: action === 'ADD' ? "Add to profile" : "Remove from profile",
  iconLeft: <AddToProfileIcon />,
  onClick: () => action === 'ADD' ? dispatch(addToLibrary(id)) : dispatch(addToLibrary(id)),
  borderBottom: true,
});

export const playlistContextMenu = (id, action, dispatch) => [
  libraryActions(id, action, dispatch),
  {
    ...queueActions(id, 'ADD', dispatch),
    borderBottom: true,
  },
  shareLink,
];

export const libraryPlaylistContextMenu = (id, profileAction, dispatch) => [
  {
    ...queueActions(id, 'ADD', dispatch),
    borderBottom: true,
  },
  addPlaylistToProfile(id, profileAction, dispatch),
  {
    ...libraryActions(id, 'REMOVE', dispatch),
    borderBottom: true,
  },
  cretePlaylistAction(dispatch),
  {
    ...pinAction(id, 'playlist'),
    borderBottom: true,
  },
  shareLink,
];

export const myPlaylistContextMenu = (id, action, dispatch) => [
  queueActions(id, 'ADD', dispatch),
  addPlaylistToProfile(id, action, dispatch),
  {
    name: 'Edit details',
    iconLeft: <EditIcon />,
    onClick: () => {return},
  },
  {
    name: 'Delete',
    iconLeft: <DeleteIcon />,
    onClick: () => {return},
    borderBottom: true,
  },
  cretePlaylistAction(dispatch),
  {
    ...pinAction(id, 'playlist'),
    borderBottom: true,
  },
  shareLink,
];

export const albumContextMenu = (id, action, dispatch) => [
  libraryActions(id, action, dispatch),
  {
    ...queueActions(id, 'ADD', dispatch),
    borderBottom: true,
  },
  {
    name: 'Add to playlist',
    iconLeft: <PlusIcon />,
    iconRight: <ExpandIcon />,
    onClick: () => {return}
  },
  shareLink,
];

export const libraryAlbumContextMenu = (id,dispatch) => [
  libraryActions(id, 'REMOVE', dispatch),
  {
    ...queueActions(id, 'ADD', dispatch),
    borderBottom: true,
  },
  pinAction(id, 'album'),
  {
    name: 'Add to playlist',
    iconLeft: <PlusIcon />,
    iconRight: <ExpandIcon />,
    onClick: () => {return}
  },
  shareLink,
];

export const artistContextMenu = (id, action, dispatch) => [
  {
    name: action === 'ADD' ? "Follow" : "Unfollow",
    iconLeft: action === 'ADD' ? <FollowIcon /> : <DismissSmallIcon />,
    onClick: () => action === 'ADD' ? dispatch(addToLibrary(id)) : dispatch(removeFromLibrary(id)),
  },
  shareLink,
];

export const libraryArtistContextMenu = (id, dispatch) => [
  {
    name: "Unfollow",
    iconLeft: <DismissSmallIcon />,
    onClick: () => dispatch(removeFromLibrary(id)),
  },
  pinAction(id, 'artist'),
  shareLink,
];

export const trackContextMenu = (id, action, inAlbum = false, inArtist = false, dispatch, artists = []) => [
  {
    name: 'Add to playlist',
    iconLeft: <PlusIcon />,
    iconRight: <ExpandIcon />,
    subMenu: [],
  },
  {
    name: action === 'ADD' ? "Save to your Liked Songs" : "Remove from your Liked Songs",
    iconLeft: action === 'ADD' ? <AddToLibrarySmallIcon /> : <RemoveFromIcon />,
    onClick: () => action === 'ADD' ? dispatch(addToLibrary(id)) : dispatch(removeFromLibrary(id)),
  },
  {
    ...queueActions(id, 'ADD', dispatch),
    borderBottom: true,
  },
  {
    name: inArtist ? '' : 'Go to artist',
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
    name: inAlbum ? '' : 'Go to album',
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

export const queueTrackContextMenu = (id, action, dispatch, artists = []) => [
  {
    name: 'Add to playlist',
    iconLeft: <PlusIcon />,
    iconRight: <ExpandIcon />,
    subMenu: [],
  },
  {
    name: action === 'ADD' ? "Save to your Liked Songs" : "Remove from your Liked Songs",
    iconLeft: action === 'ADD' ? <AddToLibrarySmallIcon /> : <RemoveFromIcon />,
    onClick: () => action === 'ADD' ? dispatch(addToLibrary(id)) : dispatch(removeFromLibrary(id)),
  },
  queueActions(id, 'ADD', dispatch),
  {
    ...queueActions(id, 'REMOVE', dispatch),
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
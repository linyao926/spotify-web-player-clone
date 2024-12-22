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

const createAction = (name, iconLeft, iconRight = null, onClick = null, subMenu = [], borderBottom = false, hidden = false) => ({
  name,
  iconLeft,
  iconRight,
  onClick,
  subMenu,
  borderBottom,
  hidden,
});

const createLibraryAction = (type, item, action, dispatch) => createAction(
  action === 'ADD' 
  ? (type === 'likedTracks' ? "Save to your Liked Songs" : "Add to Library") 
  : (type === 'likedTracks' ? "Remove from your Liked Songs" : "Remove from Library"),
  action === 'ADD' ? <AddToLibrarySmallIcon /> : <RemoveFromIcon />,
  null,
  () => action === 'ADD'
    ? dispatch(addToLibrary({ type, item }))
    : dispatch(removeFromLibrary({ type, id: item.id })),
  [],
  false,
  action !== 'ADD'
);

const createQueueAction = (tracks, action, dispatch) => createAction(
  action === 'ADD' ? "Add to Queue" : "Remove from Queue",
  action === 'ADD' ? <AddToQueueIcon /> : <RemoveQueueIcon />,
  null,
  () => action === 'ADD'
    ? dispatch(addToQueue({ tracks }))
    : dispatch(removeFromQueue())
);

const createSubMenu = (items) => items.map(({ name, onClick }) => createAction(name, null, null, onClick));

const shareLink = createAction("Share", <ShareIcon />, null, null, [
  createAction('Copy link', <CopyLinkIcon />, null, () => navigator.clipboard.writeText(window.location.href))
]);

const createPinAction = (type) => createAction(`Pin ${type}`, <PinIcon />);

const createPlaylistProfileAction = (id, action, dispatch) => createAction(
  action === 'ADD' ? "Add to profile" : "Remove from profile",
  <AddToProfileIcon />, 
  null,
  () => dispatch(addToLibrary(id)),
  [],
  true
);

const createContextMenu = (...actions) => actions;

export const playlistContextMenu = (item = { id: '' }, action, dispatch) => createContextMenu(
  createLibraryAction('playlists', item, action, dispatch),
  { ...createQueueAction(item.tracks?.items || [], 'ADD', dispatch), borderBottom: true },
  shareLink
);

export const libraryPlaylistContextMenu = (item = { id: '' }, profileAction, dispatch) => createContextMenu(
  { ...createQueueAction('playlists', item, 'ADD', dispatch), borderBottom: true },
  createPlaylistProfileAction(item.id, profileAction, dispatch),
  { ...createLibraryAction('playlists', item, 'REMOVE', dispatch), borderBottom: true },
  createAction("Create playlist", <MusicalNotePlusIcon />),
  { ...createPinAction('playlist'), borderBottom: true },
  shareLink
);

export const myPlaylistContextMenu = (id, tracks, action, dispatch) => createContextMenu(
  createQueueAction(tracks, 'ADD', dispatch),
  createPlaylistProfileAction(id, action, dispatch),
  createAction('Edit details', <EditIcon />, null, () => {}),
  createAction('Delete', <DeleteIcon />, null, () => dispatch(deletePlaylist({ playlistId: id })), [], true),
  createAction("Create playlist", <MusicalNotePlusIcon />),
  { ...createPinAction('playlist'), borderBottom: true },
  shareLink
);

export const albumContextMenu = (item = { id: '' }, action, dispatch) => createContextMenu(
  createLibraryAction('albums', item, action, dispatch),
  { ...createQueueAction(item.tracks?.items || [], 'ADD', dispatch), borderBottom: true },
  createAction('Add to playlist', <PlusIcon />, null, null, []),
  shareLink
);

export const libraryAlbumContextMenu = (item = { id: '' }, dispatch) => createContextMenu(
  createLibraryAction('albums', item, 'REMOVE', dispatch),
  { ...createQueueAction(item, 'ADD', dispatch), borderBottom: true },
  createPinAction('album'),
  createAction('Add to playlist', <PlusIcon />, null, null, []),
  shareLink
);

export const artistContextMenu = (item = { id: '' }, action, dispatch) => createContextMenu(
  createAction(
    action === 'ADD' ? "Follow" : "Unfollow",
    action === 'ADD' ? <FollowIcon /> : <DismissSmallIcon />,
    null,
    () => action === 'ADD'
      ? dispatch(addToLibrary({ type: 'artists', item }))
      : dispatch(removeFromLibrary({ type: 'artists', id: item.id }))
  ),
  shareLink
);

export const libraryArtistContextMenu = (id, dispatch) => createContextMenu(
  createAction("Unfollow", <DismissSmallIcon />, null, () => dispatch(removeFromLibrary({ type: 'artists', id }))),
  createPinAction('artist'),
  shareLink
);

export const trackContextMenu = (item, action, dispatch, inAlbum = false, inArtist = false, artists = []) => createContextMenu(
  createAction('Add to playlist', <PlusIcon />, null, null, []),
  createLibraryAction('likedTracks', item, action, dispatch),
  { ...createQueueAction([item], 'ADD', dispatch), borderBottom: true },
  createAction('Go to artist', <ArtistFallbackIcon />, null, null, createSubMenu(artists), false, inArtist),
  createAction('Go to album', <AlbumFallbackIcon />, null, () => {}, [], false, inAlbum),
  createAction('View credits', <CreditIcon />, null, () => {}, [], true),
  shareLink
);

export const queueTrackContextMenu = (item, action, dispatch, artists = []) => createContextMenu(
  createAction('Add to playlist', <PlusIcon />, <ExpandIcon />, null, []),
  createLibraryAction('likedTracks', item, action, dispatch),
  createQueueAction([item], 'ADD', dispatch),
  { ...createQueueAction(item.id, 'REMOVE', dispatch), borderBottom: true },
  createAction('Go to artist', <ArtistFallbackIcon />, null, null, createSubMenu(artists)),
  createAction('Go to album', <AlbumFallbackIcon />),
  createAction('View credits', <CreditIcon />, null, () => {}, [], true),
  shareLink
);
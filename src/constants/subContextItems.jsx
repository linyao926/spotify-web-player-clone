import React from 'react';
import { logout } from '~/redux/slices/authSlice'; 
import { setLibraryOptions } from '~/redux/slices/uiSlice';
import { ExternalIcon, CompactIcon, ListIcon, GridIcon, ItemActiveIcon } from "~/assets/icons/icons";
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
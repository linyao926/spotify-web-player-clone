import React from 'react';
import { logout } from '~/redux/slices/authSlice'; 
import { ExternalIcon, CompactIcon, ListIcon, ItemActiveIcon } from "~/assets/icons/icons";
import config from "~/config";

export const profileSubContext = (id) => [
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
      onClick: (dispatch) => {
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
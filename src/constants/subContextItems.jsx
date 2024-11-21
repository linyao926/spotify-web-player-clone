import React from 'react';
import { ExternalIcon } from "~/assets/icons/icons";
import config from "~/config";

export const profileSubContext = [
    {
      name: "Account",
      iconRight: <ExternalIcon/>,
      externalLink: config.externalLink.account,
    },
    {
      name: "Profile",
      routeLink: config.routes.ownProfile,
      textUnderline: true,
    },
    {
      name: "Settings",
      routeLink: config.routes.settings,
      textUnderline: true,
      borderBottom: true,
    },
    {
      name: "Log out",
    //   onClick: () => {}
    },
];
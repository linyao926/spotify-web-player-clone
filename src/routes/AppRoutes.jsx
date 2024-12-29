import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import { useDispatch, useSelector } from 'react-redux'; 
import { 
    fetchProfileData, 
    selectProfileInfo,
} from '~/redux/slices/profileSlice';

// Pages
import Home from '~/pages/Home/Home';
import OwnProfile from '~/pages/OwnProfile/OwnProfile';
import UserProfile from '~/pages/UserProfile/UserProfile';
import Browse from '~/pages/Search/Browse';
import Album from '~/pages/Album/Album';
import Artist from '~/pages/Artist/Artist';
import Playlist from '~/pages/Playlist/Playlist';
import MyPlaylist from '~/pages/MyPlaylist/MyPlaylist';
import Track from '~/pages/Track/Track';
import CollectionTracks from '~/pages/CollectionTracks/CollectionTracks';
import Download from '~/pages/Download/Download';
import Settings from '~/pages/Settings/Settings';

import GuestContent from '~/components/Guest/GuestContent/GuestContent';

// Error
import ErrorBoundary from "./ErrorBoundary";
import NotFound from './NotFound'; 

// Layouts
import MainAppLayout from '~/layouts/MainAppLayout/MainAppLayout';

import loaders from "~/loaders";

const AppRoutes = () => {
  const { accessToken } = useSelector((state) => state.auth);
  const profileInfo = useSelector(selectProfileInfo);
  const userId = profileInfo?.id;

  const children = [
    {
        path: '/',
        element: <Home />,
        loader: loaders.homeLoader,
        errorElement: <ErrorBoundary />, 
    },
    {
      path: `/user/${userId}`,
      element: <OwnProfile />,
      errorElement: <ErrorBoundary />, 
    },
    {
      path: `/user/:id`,
      element: <UserProfile />,
      loader: loaders.userLoader,
      errorElement: <ErrorBoundary />, 
    },
    {
      path: '/search',
      element: <Browse />,
      loader: loaders.browseLoader,
      children: [],
      errorElement: <ErrorBoundary />, 
    },
    {
      path: '/album/:id',
      element: <Album />,
      loader: loaders.albumLoader,
      errorElement: <ErrorBoundary />, 
    },
    {
      path: '/artist/:id',
      element: <Artist />,
      loader: loaders.artistLoader,
      errorElement: <ErrorBoundary />, 
    },
    {
      path: '/playlist/:id',
      element: <Playlist />,
      loader: loaders.playlistLoader,
      errorElement: <ErrorBoundary />, 
    },
    {
      path: '/my_playlist/:id',
      element: <MyPlaylist />,
      errorElement: <ErrorBoundary />, 
    },
    {
      path: '/collection/tracks',
      element: <CollectionTracks />,
      errorElement: <ErrorBoundary />, 
    },
    {
      path: '/track/:id',
      element: <Track />,
      loader: loaders.trackLoader,
      errorElement: <ErrorBoundary />, 
    },
    {
      path: '/download',
      element: <Download />,
      errorElement: <ErrorBoundary />, 
    },
    {
      path: '/preferences',
      element: <Settings />,
      errorElement: <ErrorBoundary />, 
    },
    {
        path: '*', // Catch-all route for undefined paths
        element: <NotFound />,
    },
  ];

  const routes = [{
    path: '/',
    element: <MainAppLayout />,
    children: accessToken === '' 
    ? [
      {
        path: '/',
        element: <GuestContent />,
        errorElement: <ErrorBoundary />, 
      },
      {
        path: '*',
        element: <GuestContent />,
        errorElement: <ErrorBoundary />, 
      },
    ]
    : children,
  }];

  const router = createBrowserRouter(routes, {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionStatusRevalidation: true,
    },
  });

  return (
    <RouterProvider 
      future={{
        v7_startTransition: true,
      }}
      router={router} 
      fallbackElement={<div>Loading...</div>}
    />
  );
};

export default AppRoutes;
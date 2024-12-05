import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; 
import { 
    fetchProfileData, 
    selectProfileInfo,
} from '~/redux/slices/profileSlice';

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
import NotFound from './NotFound'; 

import MainAppLayout from '~/layouts/MainAppLayout';

const AppRoutes = () => {
  const profileInfo = useSelector(selectProfileInfo);
  const userId = profileInfo?.id;

  const routes = [{
    path: '/',
    element: <MainAppLayout />, 
    children: [
        {
            path: '/',
            element: <Home />,
        },
        {
          path: `/user/${userId}`,
          element: <OwnProfile />,
        },
        {
          path: `/user`,
          element: <UserProfile />,
        },
        {
          path: '/search',
          element: <Browse />,
          children: [],
        },
        {
          path: '/album',
          element: <Album />,
        },
        {
          path: '/artist',
          element: <Artist />,
        },
        {
          path: '/playlist',
          element: <Playlist />,
        },
        {
          path: '/my_playlist',
          element: <MyPlaylist />,
        },
        {
          path: '/collection/tracks',
          element: <CollectionTracks />,
        },
        {
          path: '/track',
          element: <Track />,
        },
        {
            path: '*', // Catch-all route for undefined paths
            element: <NotFound />,
        },
      ],
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
    />
  );
};

export default AppRoutes;
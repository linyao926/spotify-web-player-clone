import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import Home from '~/pages/Home/Home';
import Browse from '~/pages/Search/Browse';
import Album from '~/pages/Album/Album';
import Artist from '~/pages/Artist/Artist';
import Playlist from '~/pages/Playlist/Playlist';
import Track from '~/pages/Track/Track';
import NotFound from './NotFound'; 

import MainAppLayout from '~/layouts/MainAppLayout';

const routes = [{
    path: '/',
    element: <MainAppLayout />, 
    children: [
        {
            path: '/',
            element: <Home />,
        },
        {
          path: '/search',
          element: <Browse />,
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

const AppRoutes = () => {
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
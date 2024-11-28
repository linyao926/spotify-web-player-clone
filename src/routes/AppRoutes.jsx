import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from 'react-router-dom';

// Import your page components
import Home from '~/pages/Home/Home';
import Browse from '~/pages/Search/Browse';
import Playlist from '~/pages/Playlist/Playlist';
import NotFound from './NotFound'; 

// Import the MainAppLayout
import MainAppLayout from '~/layouts/MainAppLayout';

// Define routes
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
          path: '/playlist',
          element: <Playlist />,
        },
        {
            path: '*', // Catch-all route for undefined paths
            element: <NotFound />,
        },
    ],
}];

// Create router
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
import { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import config from './config';

function App() {
  const [token, setToken] = useState('');
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    if (logged) {
      async function getToken() {
        try {
          const response = await fetch('/auth/token');
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const json = await response.json();
          setToken(json.access_token);
        } catch (error) {
          console.error("Failed to fetch token:", error);
        }
      }
  
      getToken();
    }
  }, [logged]);

  const child = [
    // {
    //     index: true,
    //     element: <Home />,
    //     lazy: () => import('./pages/Home'),
    // },
    // {
    //     path: 'search',
    //     element: <Search />,
    //     lazy: () => import('~/pages/Search'),
    //     children: [
    //         {
    //             index: true,
    //             element: <SearchContent />,
    //             lazy: () => import('~/components/Containers/SearchContent'),
    //         },
    //         {
    //             path: ':searchPageInputValue',
    //             element: <SearchedContent />,
    //             lazy: () => import('~/components/Containers/SearchedContent'),
    //             children: [
    //                 {
    //                     path: ':type',
    //                     element: <SearchedDetailContent />,
    //                     lazy: () => import('~/components/Containers/SearchedDetailContent'),
    //                 },
    //             ],
    //         },
    //     ],
    // },
    // {
    //     path: 'album/:id',
    //     element: <Album />,
    //     errorElement: <NotFound />,
    //     lazy: () => import('~/pages/Album'),
    // },
    // {
    //     path: 'playlist/:id/*',
    //     element: <Playlist />,
    //     errorElement: <NotFound />,
    //     lazy: () => import('~/pages/Playlist'),
    // },
    // {
    //     path: 'my-playlist/:number',
    //     element: <MyPlaylist />,
    //     errorElement: <NotFound />,
    //     lazy: () => import('~/pages/MyPlaylist'),
    //     children: [
    //         {
    //             index: true,
    //             element: <SearchInMyPlaylist />,
    //             lazy: () => import('~/components/Containers/SearchInMyPlaylist'),
    //         },
    //     ],
    // },
    // {
    //     path: 'artist/:id',
    //     element: <Artist />,
    //     errorElement: <NotFound />,
    //     lazy: () => import('~/pages/Artist'),
    // },
    // {
    //     path: 'track/:id',
    //     element: <Track />,
    //     errorElement: <NotFound />,
    //     lazy: () => import('~/pages/Track'),
    // },
    // {
    //     path: 'user/:id',
    //     element: <Profile />,
    //     errorElement: <NotFound />,
    //     lazy: () => import('~/pages/Profile'),
    // },
    // {
    //     path: 'genre/:id/*',
    //     element: <Genre />,
    //     errorElement: <NotFound />,
    //     lazy: () => import('~/pages/Genre'),
    // },
    // {
    //     path: 'download',
    //     element: <Download />,
    //     lazy: () => import('~/pages/Download'),
    // },
    // {
    //     path: 'preferences',
    //     element: <Settings />,
    //     lazy: () => import('~/pages/Settings'),
    // },
    // {
    //     path: 'queue',
    //     element: <Queue />,
    //     lazy: () => import('~/pages/Queue'),
    // },
    // {
    //     path: 'collection/tracks',
    //     element: <LikedTracks />,
    //     lazy: () => import('~/pages/Collection/LikedTracks'),
    // },
    // {
    //     path: 'collection/playlists',
    //     element: <CollectionPlaylists />,
    //     lazy: () => import('~/pages/Collection/CollectionPlaylists'),
    // },
    // {
    //     path: 'collection/artists',
    //     element: <CollectionArtists />,
    //     lazy: () => import('~/pages/Collection/CollectionArtists'),
    // },
    // {
    //     path: 'collection/albums',
    //     element: <CollectionAlbums />,
    //     lazy: () => import('~/pages/Collection/CollectionAlbums'),
    // },
    // {
    //     path: ':type?/:id?/:subType/:pageNumber?',
    //     element: <SectionContent />,
    //     lazy: () => import('~/components/Containers/SectionContent'),
    // },
  ];

  const router = createBrowserRouter([
      {
          path: '/',
          element: <DefaultLayout />,
          // errorElement: <NotFound />,
          children: child,
      },
  ]);
  
  return (
    <AppContextProvider 
      token={token} 
      logged={logged}
      setLogged={setLogged}
      >
        <main className="App">
            <RouterProvider router={router} />
        </main>
    </AppContextProvider>
  );
}

export default App;
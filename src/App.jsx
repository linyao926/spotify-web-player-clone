import { useEffect, useState } from 'react';
import config from './config';
import MainAppLayout from './layouts/MainAppLayout';
import './styles/global.scss';

function App() {
  const [token, setToken] = useState('');
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    const queryString = window.location.search;

    let accessToken = null;

    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      accessToken = params.get("access_token");
    } else if (queryString) {
      const params = new URLSearchParams(queryString);
      accessToken = params.get("access_token");
    }

    console.log(accessToken);

    if (accessToken) {
      setToken(accessToken);
      setLogged(true);
      
      // Xóa mã token khỏi URL để bảo mật
      window.history.replaceState({}, document.title, "/");
    }
  }, []);

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
  
  return (
    <MainAppLayout>
      
    </MainAppLayout>
  );
}

export default App;
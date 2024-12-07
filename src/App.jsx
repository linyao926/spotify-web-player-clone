import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTokens } from '~/redux/slices/authSlice'; 
import AppRoutes from '~/routes/AppRoutes';
import '~/styles/global.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('access_token');
    const refreshToken = params.get('refresh_token');
    const expiresIn = params.get('expires_in');

    if (accessToken && refreshToken && expiresIn) {
      dispatch(setTokens({ accessToken, refreshToken, expiresIn }));
      window.history.replaceState({}, document.title, "/");
    }
  }, [dispatch]);
  
  return (
      <AppRoutes />
  );
}

export default App;
import { useState, useEffect } from 'react';

const useSpotifyPlayer = (token) => {
  const [player, setPlayer] = useState(null);
  const [deviceId, setDeviceId] = useState(null);

  useEffect(() => {
    if (!token) return;

    const player = new Spotify.Player({
        name: 'My Web Player',
        getOAuthToken: (cb) => cb(token),
        volume: 0.3,
      });
    
      player.connect();
    
      player.addListener('ready', ({ device_id }) => {
        setDeviceId(device_id);
        setPlayer(player);
      });
    
      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device went offline:', device_id);
    });

    return () => {
      if (player) {
        player.disconnect();
      }
    };
  }, [token]);

  return { player, deviceId };
};

export default useSpotifyPlayer;

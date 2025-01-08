export function initializeSpotifyPlayer(token, setActiveDevice) {
    const player = new Spotify.Player({
      name: "My Web Player",
      getOAuthToken: (cb) => {
        cb(token);
      },
      volume: 0.8,
    });
  
    player.addListener("ready", ({ device_id }) => {
      console.log("Ready with Device ID", device_id);
  
      if (setActiveDevice) {
        setActiveDevice(device_id, token);
      }
    });
  
    player.addListener("not_ready", ({ device_id }) => {
      console.log("Device ID has gone offline", device_id);
    });
  
    player.connect();
  
    return player;
}
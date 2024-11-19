const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const request = require('request');

dotenv.config();
const app = express();
app.use(cors());


const spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI_LOCAL;

let access_token;
let refresh_token;
let expires_in;

const generateRandomString = function (length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

app.get('/auth/login', (req, res) => {
  const scope = [
    // Images
    'ugc-image-upload',
    
    // Spotify Connect
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    
    // Playback
    'app-remote-control',
    'streaming',
    
    // Playlists
    'playlist-read-private',
    'playlist-read-collaborative',
    
    // Follow
    'user-follow-read',
    
    // Listening History
    'user-read-playback-position',
    'user-top-read',
    'user-read-recently-played',
    
    // Users
    'user-read-email',
    'user-read-private',
  ].join(' ');
  
    const state = generateRandomString(16);
  
    const auth_query_parameters = new URLSearchParams({
      response_type: "code",
      client_id: spotify_client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    });
  
    res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());
});

app.get('/auth/callback', (req, res) => {
    const code = req.query.code;

    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (Buffer.from(spotify_client_id + ':' + spotify_client_secret).toString('base64')),
        'Content-Type' : 'application/x-www-form-urlencoded'
      },
      json: true
    };
  
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        access_token = body.access_token;
        refresh_token = body.refresh_token;
        expires_in = body.expires_in;
        res.redirect(`http://localhost:5173/?access_token=${access_token}&refresh_token=${refresh_token}&expires_in=${expires_in}`);
      } else {
        console.error("Error in auth/callback:", error);
        res.status(500).send('Authentication failed');
      }
    });
});

app.get('/auth/token', (req, res) => {
  if (access_token) {
    res.json({
      access_token: access_token
    });
  } else {
    res.status(400).send('Access token not found');
  }
});

app.get('/refresh_token', function(req, res) {
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      access_token = body.access_token;
      expires_in = body.expires_in;
      res.send({
        'access_token': access_token,
        'refresh_token': refresh_token
      });
    } else {
      console.error("Error in refresh_token:", error);
      res.status(500).send('Failed to refresh token');
    }
  });
});

app.listen(3000, () => {
  console.log(`Server running on http://localhost:3000`);
});
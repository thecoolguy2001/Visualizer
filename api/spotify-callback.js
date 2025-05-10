// /api/spotify-callback.js
import axios from 'axios';
export default async function handler(req, res) {
  const code = req.query.code;
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
    client_id: process.env.SPOTIFY_CLIENT_ID,
    client_secret: process.env.SPOTIFY_CLIENT_SECRET
  });
  try {
    const { data } = await axios.post(
      'https://accounts.spotify.com/api/token',
      body.toString(),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
    // you’ll want to store data.refresh_token somewhere secure
    // here we set the access token in an HttpOnly cookie for simplicity
    res.setHeader('Set-Cookie', `sp_access=${data.access_token}; HttpOnly; Path=/;`);
    res.redirect('/');  // back to your app
  } catch (err) {
    console.error(err);
    res.status(500).end('Auth failed');
  }
}
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;
  const creds = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');

  try {
    const { data } = await axios.post(
      'https://accounts.spotify.com/api/token',
      'grant_type=client_credentials',
      {
        headers: {
          Authorization: `Basic ${creds}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    res.setHeader('Access-Control-Allow-Origin', '*');  // or restrict to your domain
    res.json({ token: data.access_token, expires_in: data.expires_in });
  } catch (err) {
    console.error('Spotify token error:', err.response?.data || err);
    res.status(500).json({ error: 'failed_to_fetch_spotify_token' });
  }
}
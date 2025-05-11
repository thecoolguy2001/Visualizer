// /api/spotify-login.js
export default function handler(req, res) {
  // Build the redirect URI dynamically based on request origin
  const origin = req.headers.origin;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI || `${origin}/api/spotify-callback`;

  // Set up Spotify authorization parameters
  const params = new URLSearchParams({
    client_id: process.env.SPOTIFY_CLIENT_ID,
    response_type: 'code',
    redirect_uri: redirectUri,
    scope: [
      'streaming',
      'user-read-playback-state',
      'user-modify-playback-state',
      'user-top-read'
    ].join(' ')
  });

  // Redirect the user to Spotify's authorization endpoint
  res.redirect(`https://accounts.spotify.com/authorize?${params.toString()}`);
}
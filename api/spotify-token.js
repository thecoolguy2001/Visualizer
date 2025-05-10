// api/spotify-token.js

// Simple cookie parsing utility
function parseCookies(cookieHeader) {
  return cookieHeader
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, [key, val]) => {
      acc[key.trim()] = decodeURIComponent(val);
      return acc;
    }, {});
}

export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).end();
  }

  const cookieHeader = req.headers.cookie || '';
  const cookies = cookieHeader ? parseCookies(cookieHeader) : {};
  const token = cookies['sp_access'];

  if (!token) {
    return res.status(401).json({ error: 'not_authenticated' });
  }

  // Return the user-scoped access token
  res.setHeader('Access-Control-Allow-Origin', '*');  // or restrict to your domain
  return res.status(200).json({ token });
}
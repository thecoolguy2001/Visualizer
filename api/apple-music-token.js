import jwt from 'jsonwebtoken';

export default function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();
  const { APPLE_TEAM_ID, APPLE_KEY_ID, APPLE_PRIVATE_KEY } = process.env;
  const now = Math.floor(Date.now() / 1000);
  const token = jwt.sign(
    { iss: APPLE_TEAM_ID, iat: now, exp: now + 60 * 60 * 24 * 180 },
    APPLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    { algorithm: 'ES256', keyid: APPLE_KEY_ID }
  );
  res.setHeader('Access-Control-Allow-Origin', '*');  // or restrict to your domain
  res.json({ token });
}
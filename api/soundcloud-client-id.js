export default function handler(req, res) {
    if (req.method !== 'GET') return res.status(405).end();
    const clientId = process.env.SOUNDCLOUD_CLIENT_ID;
    res.setHeader('Access-Control-Allow-Origin', '*');  // or restrict to your domain
    res.json({ clientId });
  }
// pages/api/verify-password.js

export default function handler(req, res) {
    if (req.method !== 'POST') {
      res.status(405).end(); // Method Not Allowed
      return;
    }
    const { password } = req.body;
    // Compare against your secret in environment (set VISUALIZER_PASSWORD in Vercel)
    if (password === process.env.VISUALIZER_PASSWORD) {
      res.status(200).json({ authorized: true });
    } else {
      res.status(401).json({ authorized: false });
    }
  }
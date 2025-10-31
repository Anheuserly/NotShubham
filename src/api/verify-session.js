// pages/api/verify-session.js
import { verifySession } from '../../lib/authController';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    // Verify the session using your auth controller
    const sessionValid = await verifySession(token);
    
    if (sessionValid) {
      return res.json({ success: true });
    } else {
      return res.status(401).json({ success: false, message: 'Invalid session' });
    }
  } catch (error) {
    console.error('Session verification error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}
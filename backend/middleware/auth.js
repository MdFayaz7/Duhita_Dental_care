import Admin from '../models/Admin.js';
import { verifyAdminToken } from '../config/jwt.js';

export const protectAdmin = async (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7).trim() : null;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, token missing' });
  }

  try {
    const decoded = verifyAdminToken(token);
    const admin = await Admin.findById(decoded.id).select('-password');
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Admin user not found' });
    }
    if (admin.passwordChangedAt && decoded.iat * 1000 < admin.passwordChangedAt.getTime() - 2000) {
      return res.status(401).json({ success: false, message: 'Session expired, please sign in again' });
    }
    req.admin = admin;
    return next();
  } catch {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

import Admin from '../models/Admin.js';
import { signAdminToken } from '../config/jwt.js';

export const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (typeof email !== 'string' || typeof password !== 'string' || !email.trim() || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const identifier = email.trim().slice(0, 200);

    const admin = await Admin.findOne({
      $or: [{ email: identifier.toLowerCase() }, { username: identifier }],
    });

    if (admin && (await admin.matchPassword(password))) {
      return res.json({
        success: true,
        token: signAdminToken(admin._id),
        admin: {
          id: admin._id,
          username: admin.username,
          email: admin.email,
          name: admin.name,
          role: admin.role,
        },
      });
    }

    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res) => {
  res.json({
    success: true,
    admin: req.admin,
  });
};

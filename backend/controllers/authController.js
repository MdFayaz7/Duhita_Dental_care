import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'duhita_dental_super_secret_jwt_key_2026_apple_style', {
    expiresIn: '7d',
  });
};

export const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const admin = await Admin.findOne({
      $or: [{ email: email.toLowerCase() }, { username: email }],
    });

    if (admin && (await admin.matchPassword(password))) {
      return res.json({
        success: true,
        token: generateToken(admin._id),
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

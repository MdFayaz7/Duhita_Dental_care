import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

if (!secret || secret.length < 32) {
  console.error('FATAL: JWT_SECRET is missing or shorter than 32 characters. Refusing to start.');
  process.exit(1);
}

export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '12h';

export const signAdminToken = (id) =>
  jwt.sign({ id }, secret, { expiresIn: JWT_EXPIRES_IN, issuer: 'duhita-api', audience: 'duhita-admin' });

export const verifyAdminToken = (token) =>
  jwt.verify(token, secret, { issuer: 'duhita-api', audience: 'duhita-admin' });

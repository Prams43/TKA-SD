import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

/**
 * Membuat token JWT dengan masa berlaku 1 hari (1d)
 * @param {Object} payload - Data pengguna yang disimpan dalam token
 * @returns {string} Token JWT
 */
export const generateToken = (payload) => {
  return jwt.sign(payload, env.jwtSecret, {
    expiresIn: '1d',
  });
};

/**
 * Memverifikasi keabsahan token JWT
 * @param {string} token - Token JWT
 * @returns {Object} Payload hasil dekode token
 */
export const verifyToken = (token) => {
  return jwt.verify(token, env.jwtSecret);
};

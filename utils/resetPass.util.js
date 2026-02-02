import jwt from 'jsonwebtoken';

export const generateResetToken = (payload) => {
  return jwt.sign(payload, process.env.RESET_PASSWORD_SECRET, {
    expiresIn: '15m'
  });
};

export const verifyResetToken = (token) => {
  return jwt.verify(token, process.env.RESET_PASSWORD_SECRET);
};

import jwt from 'jsonwebtoken';

// This function verifies the reset token using JWT.
export const verifyResetToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { userId } = decoded;
    return userId;
  } catch (error) {
    return null;
  }
};
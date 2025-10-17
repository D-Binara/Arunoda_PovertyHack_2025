import jwt from 'jsonwebtoken';

/**
 * Generate JWT token
 */
export const generateToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  } as jwt.SignOptions);
};

/**
 * Send token response with cookie option
 */
export const sendTokenResponse = (user: any, statusCode: number, res: any) => {
  const token = generateToken(user._id);

  res.status(statusCode).json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      village: user.village,
      district: user.district,
      photo: user.photo,
      skills: user.skills,
      contactPrefs: user.contactPrefs,
    },
  });
};

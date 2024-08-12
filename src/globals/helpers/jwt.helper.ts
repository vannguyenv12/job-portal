import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';

export function generateToken(user: User) {
  const accessToken = jwt.sign(
    { id: user.id, name: user.name, email: user.email, role: user.role },
    process.env.JWT_SECRET!
  );

  return accessToken;
}

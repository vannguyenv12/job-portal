import prisma from '~/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class AuthService {
  public async signUp(requestBody: any) {
    const { email, name, password } = requestBody;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword
      }
    });

    // Create JWT
    const accessToken = jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      {
        expiresIn: '1d'
      }
    );

    return accessToken;
  }
}

export const authService: AuthService = new AuthService();

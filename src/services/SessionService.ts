import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET || 'your-very-secure-secret';

export class SessionService {
  async authenticate(username: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { username }
    });

    if (!user) {
      throw new Error("Username is incorrect or does not exist.");
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      throw new Error("Password is incorrect.");
    }

    const token = jwt.sign(
      {
        userId: user.id, 
        username: user.username
      }, 
      SECRET_KEY, 
      { expiresIn: '30d' }
    );

    return { user, token, createdAt: user.createdAt };
  }
}

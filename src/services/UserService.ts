import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export class UserService {
    async checkRoleExists(roleId: string): Promise<boolean> {
        const role = await prisma.role.findUnique({
            where: { id: roleId }
        });
        const roleExists = role !== null;
        console.log(`Role with ID "${roleId}" exists: ${roleExists}`);
        return roleExists;
    }

    async checkUserExistsByEmail(email: string): Promise<boolean> {
        const user = await prisma.user.findUnique({
            where: { email }
        });
        const userExists = user !== null;
        console.log(`User with email "${email}" exists: ${userExists}`);
        return userExists;
    }

    async checkUserExistsByUsername(username: string): Promise<boolean> {
        const user = await prisma.user.findUnique({
            where: { username }
        });
        const userExists = user !== null;
        console.log(`User with username "${username}" exists: ${userExists}`);
        return userExists;
    }

    async createUser(email: string, password: string, name: string, username: string, roleIds: string[]): Promise<any> {
        const userExistsByEmail = await this.checkUserExistsByEmail(email);
        if (userExistsByEmail) {
            throw new Error("User with this email already exists");
        }

        const userExistsByUsername = await this.checkUserExistsByUsername(username);
        if (userExistsByUsername) {
            throw new Error("User with this username already exists");
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                email,
                password: passwordHash,
                name,
                username,
                roles: {
                    create: roleIds.map(roleId => ({ roleId }))
                }
            },
            include: {
                roles: {
                    include: {
                        role: true
                    }
                }
            }
        });
        console.log("User created successfully:", newUser);
        return newUser;
    }

    async listUsers(): Promise<any[]> {
        const users = await prisma.user.findMany({
            include: {
                roles: {
                    include: {
                        role: true
                    }
                }
            }
        });
        console.log("Users listed successfully:", users);
        return users;
    }
}

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class PermissionService {
  async createPermission(name: string, description: string) {
    const existingPermission = await prisma.permission.findUnique({
      where: { name }
    });

    if (existingPermission) {
      throw new Error(`Permission with name ${name} already exists.`);
    }

    const permission = await prisma.permission.create({
      data: { name, description }
    });

    return permission;
  }

  async listPermissions() {
    return await prisma.permission.findMany();
  }
}

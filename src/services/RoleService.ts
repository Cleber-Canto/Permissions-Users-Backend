import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class RoleService {
  async createRole(name: string, description: string, permissionIds: string[]) {
    try {
      console.log("Creating role with:", { name, description, permissionIds });

      // Check if a role with the same name already exists
      const existingRole = await prisma.role.findUnique({
        where: { name }
      });

      if (existingRole) {
        console.log(`Role with name "${name}" already exists.`);
        return existingRole;  // Return the existing role
      }

      // Step 1: Create the role without permissions connected
      const role = await prisma.role.create({
        data: {
          name,
          description,
        }
      });

      console.log("Role created successfully:", role);

      // Step 2: Connect permissions to the role using the compound keys
      const connectPermissions = permissionIds.map(permissionId => ({
        roleId: role.id,
        permissionId: permissionId
      }));

      // Use createMany to insert multiple permission-role relationships
      await prisma.permissionsRoles.createMany({
        data: connectPermissions,
        skipDuplicates: true // Ensures no duplicate entries are created
      });

      // Fetch the role with permissions included
      const updatedRole = await prisma.role.findUnique({
        where: { id: role.id },
        include: { permissions: true }
      });

      console.log("Updated role with permissions:", updatedRole);
      return updatedRole;
    } catch (error) {
      console.error("Error while creating role:", error);
      throw error;
    }
  }

  async listRoles() {
    try {
      const roles = await prisma.role.findMany({
        include: {
          permissions: true
        }
      });
      return roles;
    } catch (error) {
      console.error("Error while listing roles:", error);
      throw error;
    }
  }
}

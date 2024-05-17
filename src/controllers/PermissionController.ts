import { Request, Response } from 'express';
import { PermissionService } from '../services/PermissionService';

const permissionService = new PermissionService();

export class PermissionController {
  async createPermission(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    try {
      const permission = await permissionService.createPermission(name, description);
      console.log("Permission created successfully:", permission);
      return response.status(201).json(permission);
    } catch (error: any) {
      console.error("Error creating permission:", error.message);
      return response.status(400).json({ error: error.message });
    }
  }

  async listPermissions(request: Request, response: Response): Promise<Response> {
    try {
      const permissions = await permissionService.listPermissions();
      console.log("Permissions retrieved successfully:", permissions);
      return response.status(200).json(permissions);
    } catch (error: any) {
      console.error("Error retrieving permissions:", error.message);
      return response.status(500).json({ error: "Failed to retrieve permissions" });
    }
  }
}

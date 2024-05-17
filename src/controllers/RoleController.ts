import { Request, Response } from 'express';
import { RoleService } from '../services/RoleService';

export class RoleController {
  private roleService: RoleService;

  constructor() {
    this.roleService = new RoleService();
  }

  async createRole(request: Request, response: Response): Promise<Response> {
    try {
      const { name, description, permissions } = request.body;
      if (!permissions || !permissions.length) {
        throw new Error("Permissões são necessárias para criar uma role.");
      }

      const role = await this.roleService.createRole(name, description, permissions);

      console.log("Role criada com sucesso:", JSON.stringify(role, null, 2));  // Imprime a resposta formatada no console
      return response.json(role);
    } catch (error: any) {
      console.error("Erro ao criar role:", error);
      return response.status(400).json({ error: error.message });
    }
  }

  async listRoles(request: Request, response: Response): Promise<Response> {
    try {
      const roles = await this.roleService.listRoles();
      console.log("Roles listadas com sucesso:", JSON.stringify(roles, null, 2));  // Imprime a resposta formatada no console
      return response.json(roles);
    } catch (error: any) {
      console.error("Erro ao listar roles:", error);
      return response.status(500).json({ error: error.message });
    }
  }
}

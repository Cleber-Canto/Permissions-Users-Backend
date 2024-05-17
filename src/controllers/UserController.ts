import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

const userService = new UserService();

export class UserController {
    async createUser(request: Request, response: Response): Promise<Response> {
        const { email, password, name, username, roles } = request.body;

        try {
            // Verifica se o usuário já existe pelo email ou nome de usuário
            const userExistsByEmail = await userService.checkUserExistsByEmail(email);
            if (userExistsByEmail) {
                return response.status(400).json({ message: "User with this email already exists" });
            }

            const userExistsByUsername = await userService.checkUserExistsByUsername(username);
            if (userExistsByUsername) {
                return response.status(400).json({ message: "User with this username already exists" });
            }

            // Verifica se as roles existem antes de criar o usuário
            for (const roleId of roles) {
                const roleExists = await userService.checkRoleExists(roleId);
                if (!roleExists) {
                    return response.status(400).json({ message: `Role with ID "${roleId}" does not exist` });
                }
            }

            // Cria o usuário se todas as verificações passarem
            const newUser = await userService.createUser(email, password, name, username, roles);
            console.log("User created successfully:", newUser);
            return response.status(201).json(newUser);
        } catch (error) {
            console.error("Error creating user:", error);
            return response.status(500).json({ message: "Internal server error" });
        }
    }

    async listUsers(request: Request, response: Response): Promise<Response> {
        try {
            const users = await userService.listUsers();
            console.log("Users listed successfully:", users);
            return response.status(200).json(users);
        } catch (error) {
            console.error("Error listing users:", error);
            return response.status(500).json({ message: "Internal server error" });
        }
    }
}

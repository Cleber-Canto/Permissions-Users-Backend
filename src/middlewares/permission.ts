import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client"; // Remove a importação direta de 'Role'

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET || "your-very-secure-secret";

interface DecodedToken {
  userId: string;
  username: string;
  isAdmin: boolean;
}

async function decodeUser(request: Request): Promise<any | undefined> {
  const authHeader = request.headers.authorization || "";

  if (!authHeader) {
    console.error("Erro de autorização:", "Token não fornecido");
    throw new Error("Token não fornecido");
  }

  const [, token] = authHeader.split(" ");

  try {
    const payload = jwt.verify(token, SECRET_KEY) as DecodedToken;

    if (!payload || typeof payload.userId !== "string") {
      throw new Error("Token inválido");
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      include: { roles: { include: { role: true } } }, // Inclui os detalhes dos papéis
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return user;
  } catch (error) {
    console.error("Erro de autorização:", error);
    throw new Error("Token inválido");
  }
}

function hasPermissions(requiredRoles: string[]) {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      const user = await decodeUser(request);

      if (!user || !user.roles) {
        console.error("Usuário não autorizado:", "Não autorizado!");
        return response.status(401).send("Não autorizado!");
      }

      const userRoles = user.roles.map((userRole: any) => userRole.role.name); // Extrai os nomes dos papéis
      const hasRequiredRoles = requiredRoles.some((role) => userRoles.includes(role));

      if (hasRequiredRoles) {
        return next();
      } else {
        console.error("Usuário não autorizado:", "Permissões insuficientes!");
        return response.status(403).send("Permissões insuficientes!");
      }
    } catch (error) {
      console.error("Erro de autorização:", error);
      return response.status(401).send("Token inválido");
    }
  };
}

export { hasPermissions };

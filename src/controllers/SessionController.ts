import { Request, Response } from 'express';
import { SessionService } from '../services/SessionService';

const sessionService = new SessionService();

export class SessionController {
  async createSession(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;

    try {
      const { user, token, createdAt } = await sessionService.authenticate(username, password);
      console.log("Login successful:", { username: user.username, createdAt });
      return response.json({
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          createdAt
        },
        token
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Login failed for username:", username, "with error:", error.message);
        return response.status(400).json({ error: error.message });
      }
      console.error("Unexpected error during login for username:", username);
      return response.status(500).json({ error: "Unexpected error" });
    }
  }
}

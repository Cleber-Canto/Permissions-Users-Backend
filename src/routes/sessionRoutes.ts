// src/routes/sessionRoutes.ts
import { Router } from 'express';
import { SessionController } from '../controllers/SessionController';

const router = Router();
const sessionController = new SessionController();

router.post('/sessions', sessionController.createSession);

export default router;

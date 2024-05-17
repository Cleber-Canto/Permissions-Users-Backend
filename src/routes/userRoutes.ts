import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const router = Router();
const userController = new UserController();


router.post('/user', (req, res) => userController.createUser(req, res));

router.get('/users', (req, res) => userController.listUsers(req, res));

export default router;

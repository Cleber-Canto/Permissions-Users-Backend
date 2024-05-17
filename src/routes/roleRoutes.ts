import { Router } from 'express';
import { RoleController } from '../controllers/RoleController';

const router = Router();
const roleController = new RoleController();

router.post('/roles', (req, res) => roleController.createRole(req, res));
router.get('/roles', (request, response) => roleController.listRoles(request, response));

export default router;

import express from 'express';
import { PermissionController } from '../controllers/PermissionController';

const router = express.Router();
const permissionController = new PermissionController();

router.post('/permissions', (req, res) => permissionController.createPermission(req, res));
router.get('/permissions', (req, res) => permissionController.listPermissions(req, res));
export default router;

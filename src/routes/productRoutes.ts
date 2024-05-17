import express from 'express';
import { ProductController } from '../controllers/ProductController';
import { hasPermissions } from '../middlewares/permission';

const router = express.Router();
const productController = new ProductController();

router.post('/', hasPermissions(['ROLE_ADMIN']), (req, res) => productController.create(req, res));
router.get('/', (req, res) => productController.index(req, res));
router.get('/:id', (req, res) => productController.show(req, res));

export default router;

import express from "express";
import userRoutes from './routes/userRoutes';
import sessionRoutes from './routes/sessionRoutes';  
import permissionRoutes from './routes/permissionRoutes';
import roleRoutes from './routes/roleRoutes';
import productRoutes from './routes/productRoutes'; 
import { hasPermissions } from './middlewares/permission'; 
import { errorHandler } from './middlewares/errorHandler';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/products', hasPermissions(["ROLE_ADMIN", "ROLE_USER"]), productRoutes);
app.use(userRoutes);
app.use(sessionRoutes);
app.use(permissionRoutes);
app.use(roleRoutes);

// Middleware para tratar rotas não encontradas
app.use((_req, res, _next) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Middleware de tratamento de erros deve ser adicionado após as rotas
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// backend > sc > routes > TS estoque.ts
import express from 'express';
import { atualizarEstoqueController, listarEstoqueController } from '../controllers/estoqueController';

const router = express.Router();

// Rotas para estoque
router.post('/', atualizarEstoqueController);
router.get('/', listarEstoqueController);

export default router; // Usando export default para exportar a rota

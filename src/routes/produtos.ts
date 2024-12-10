// backend > src > routes > TS produtos.ts
import express from 'express';
import { cadastrarProdutoController, listarProdutosController } from '../controllers/produtosController';

const router = express.Router();

// Rotas para produtos
router.post('/', cadastrarProdutoController);
router.get('/', listarProdutosController);

export default router; // Usando export default para exportar a rota


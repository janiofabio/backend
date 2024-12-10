import express from 'express';
import { cadastrarFornecedorController, listarFornecedoresController } from '../controllers/fornecedoresController';

const router = express.Router();

// Rotas para fornecedores
router.post('/', cadastrarFornecedorController);
router.get('/', listarFornecedoresController);

export default router;

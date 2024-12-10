// backend › src › routes > TS movimentacoes.ts :
import express from 'express';
import { registrarMovimentacaoController, listarMovimentacoesController } from '../controllers/movimentacoesController';

const router = express.Router();

// Rotas para movimentações
router.post('/', registrarMovimentacaoController);
router.get('/', listarMovimentacoesController);

export default router; // Usando export default para exportar a rota

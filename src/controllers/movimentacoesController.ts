// backend > src > controllers > TS movimentacoesController.ts
import pool from '../config/database';
import { Request, Response } from 'express';

export const registrarMovimentacaoController = async (req: Request, res: Response): Promise<Response> => {
  const { local, produto_id, tipo, quantidade } = req.body;

  try {
    const [result] = await pool.execute(
      'INSERT INTO movimentacoes (local, produto_id, tipo, quantidade) VALUES (?, ?, ?, ?)',
      [local, produto_id, tipo, quantidade]
    );
    return res.status(201).json({ message: 'Movimentação registrada com sucesso' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao registrar movimentação', error });
  }
};

export const listarMovimentacoesController = async (req: Request, res: Response): Promise<Response> => {
  try {
    const [rows] = await pool.execute(`
      SELECT m.*, p.codigo, p.descricao 
      FROM movimentacoes m 
      JOIN produtos p ON m.produto_id = p.id
      ORDER BY m.data_hora DESC
    `);
    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao listar movimentações', error });
  }
};

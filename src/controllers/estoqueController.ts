// backend > src > controllers > TS estoqueController.ts
import pool from '../config/database';
import { Request, Response } from 'express';

export const atualizarEstoqueController = async (req: Request, res: Response): Promise<Response> => {
  const { local, produto_id, quantidade } = req.body;

  try {
    const [result] = await pool.execute(
      'INSERT INTO estoque (local, produto_id, quantidade) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantidade = ?',
      [local, produto_id, quantidade, quantidade]
    );
    return res.status(200).json({ message: 'Estoque atualizado com sucesso' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao atualizar estoque', error });
  }
};

export const listarEstoqueController = async (req: Request, res: Response): Promise<Response> => {
  try {
    const [rows] = await pool.execute(`
      SELECT e.*, p.codigo, p.descricao 
      FROM estoque e 
      JOIN produtos p ON e.produto_id = p.id
    `);
    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao listar estoque', error });
  }
};

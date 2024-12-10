// backend › src › controllers > TS produtosController.ts
import pool from '../config/database';
import { Request, Response } from 'express';

export const cadastrarProdutoController = async (req: Request, res: Response): Promise<Response> => {
  const { codigo, descricao, tipo, valor_estimado } = req.body;

  try {
    const [result] = await pool.execute(
      'INSERT INTO produtos (codigo, descricao, tipo, valor_estimado) VALUES (?, ?, ?, ?)',
      [codigo, descricao, tipo, valor_estimado]
    );
    return res.status(201).json({ message: 'Produto cadastrado com sucesso' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao cadastrar produto', error });
  }
};

export const listarProdutosController = async (req: Request, res: Response): Promise<Response> => {
  try {
    const [rows] = await pool.execute('SELECT * FROM produtos');
    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao listar produtos', error });
  }
};

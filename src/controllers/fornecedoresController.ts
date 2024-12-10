// backend ≥ src ≥ controllers > tS fornecedoresController.ts
import pool from '../config/database';
import { Request, Response } from 'express';

export const cadastrarFornecedorController = async (req: Request, res: Response): Promise<Response> => {
  const { razao_social, cpf_cnpj } = req.body;

  try {
    const [result] = await pool.execute(
      'INSERT INTO fornecedores (razao_social, cpf_cnpj) VALUES (?, ?)',
      [razao_social, cpf_cnpj]
    );
    return res.status(201).json({ message: 'Fornecedor cadastrado com sucesso' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao cadastrar fornecedor', error });
  }
};

export const listarFornecedoresController = async (req: Request, res: Response): Promise<Response> => {
  try {
    const [rows] = await pool.execute('SELECT * FROM fornecedores');
    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao listar fornecedores', error });
  }
};

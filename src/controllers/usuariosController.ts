import { Request, Response } from 'express';  // Importando os tipos
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/database';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET não está configurado!');
}

// Tipando corretamente os parâmetros 'req' e 'res' para que a função retorne um Response
export const cadastrarUsuario = async (req: Request, res: Response): Promise<Response> => {
  const { email, senha } = req.body;

  try {
    const hashedSenha = await bcrypt.hash(senha, 10);
    const [result] = await pool.execute(
      'INSERT INTO usuarios (email, senha) VALUES (?, ?)',
      [email, hashedSenha]
    );
    return res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao cadastrar usuário', error });
  }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  const { email, senha } = req.body;

  try {
    const [rows] = await pool.execute(
      'SELECT * FROM usuarios WHERE email = ?',
      [email]
    );

    if ((rows as any).length === 0) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const usuario = (rows as any)[0];  // Tipando 'rows' como 'any[]' para acessar '0'
    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ id: usuario.id, email: usuario.email }, JWT_SECRET, {
      expiresIn: '1h',
    });

    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao fazer login', error });
  }
};

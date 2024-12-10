import bcrypt from 'bcrypt';
import pool from '../config/database';

const cadastrarUsuario = async () => {
  const email = 'adm_nutri';
  const senha = 'teste';
  
  // Gerando o hash da senha com bcrypt
  const hashedSenha = await bcrypt.hash(senha, 10);

  try {
    const [result] = await pool.execute(
      'INSERT INTO usuarios (email, senha) VALUES (?, ?)',
      [email, hashedSenha]
    );
    console.log('Usuário cadastrado com sucesso');
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
  }
};

cadastrarUsuario();

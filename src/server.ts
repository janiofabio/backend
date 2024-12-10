import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Importação das rotas
import usuariosRoutes from './routes/usuarios';
import fornecedoresRoutes from './routes/fornecedores';
import produtosRoutes from './routes/produtos';
import estoqueRoutes from './routes/estoque';
import movimentacoesRoutes from './routes/movimentacoes';

// Configuração do dotenv para variáveis de ambiente
dotenv.config();

// Criação da aplicação Express
const app = express();
const port = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/fornecedores', fornecedoresRoutes);
app.use('/api/produtos', produtosRoutes);
app.use('/api/estoque', estoqueRoutes);
app.use('/api/movimentacoes', movimentacoesRoutes);

// Inicialização do servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

CREATE DATABASE nutrisys-poc;
USE nutrisys-poc;

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL
);

CREATE TABLE fornecedores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  razao_social VARCHAR(255) NOT NULL,
  cpf_cnpj VARCHAR(20) UNIQUE NOT NULL
);

CREATE TABLE produtos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  codigo VARCHAR(50) UNIQUE NOT NULL,
  descricao VARCHAR(255) NOT NULL,
  tipo VARCHAR(100) NOT NULL,
  valor_estimado DECIMAL(10, 2) NOT NULL
);

CREATE TABLE estoque (
  id INT AUTO_INCREMENT PRIMARY KEY,
  local ENUM('Principal', 'Secundário', 'Outros') NOT NULL,
  produto_id INT NOT NULL,
  quantidade INT NOT NULL,
  FOREIGN KEY (produto_id) REFERENCES produtos(id)
);

CREATE TABLE movimentacoes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  local ENUM('Principal', 'Secundário', 'Outros') NOT NULL,
  produto_id INT NOT NULL,
  tipo ENUM('Entrada', 'Saída') NOT NULL,
  quantidade INT NOT NULL,
  data_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (produto_id) REFERENCES produtos(id)
);
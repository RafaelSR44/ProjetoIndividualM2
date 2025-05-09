CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    departamento VARCHAR(50),
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ativo BOOLEAN DEFAULT TRUE
);

-- Tabela de salas disponíveis para reserva
CREATE TABLE salas (
    id_sala SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    capacidade INTEGER NOT NULL,
    localizacao VARCHAR(100),
    descricao TEXT,
    possui_projetor BOOLEAN DEFAULT FALSE,
    possui_videoconferencia BOOLEAN DEFAULT FALSE,
    ativa BOOLEAN DEFAULT TRUE
);

-- Tabela de status possíveis para uma reserva
CREATE TABLE status_reserva (
    id_status SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    descricao TEXT
);

-- Tabela de reservas de salas
CREATE TABLE reservas (
    id_reserva SERIAL PRIMARY KEY,
    id_usuario INTEGER NOT NULL REFERENCES usuarios(id_usuario),
    id_sala INTEGER NOT NULL REFERENCES salas(id_sala),
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT,
    data_inicio TIMESTAMP NOT NULL,
    data_fim TIMESTAMP NOT NULL,
    data_solicitacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_status INTEGER NOT NULL REFERENCES status_reserva(id_status),
    observacoes TEXT,
    CONSTRAINT check_datas CHECK (data_fim > data_inicio)
);

-- Tabela para registrar o histórico de alterações nas reservas
CREATE TABLE historico_reservas (
    id_historico SERIAL PRIMARY KEY,
    id_reserva INTEGER NOT NULL REFERENCES reservas(id_reserva),
    id_usuario INTEGER NOT NULL REFERENCES usuarios(id_usuario),
    data_alteracao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status_anterior INTEGER REFERENCES status_reserva(id_status),
    status_novo INTEGER REFERENCES status_reserva(id_status),
    observacao TEXT
);

-- Inserção de dados iniciais (valores padrão)
INSERT INTO status_reserva (nome, descricao) VALUES 
('Pendente', 'Reserva solicitada, aguardando confirmação'),
('Confirmada', 'Reserva confirmada e agendada'),
('Cancelada', 'Reserva cancelada pelo usuário'),
('Recusada', 'Reserva recusada pelo administrador'),
('Concluída', 'Reserva realizada e concluída');

-- Índices para melhorar a performance de consultas frequentes
CREATE INDEX idx_reservas_data ON reservas(data_inicio, data_fim);
CREATE INDEX idx_reservas_sala ON reservas(id_sala);
CREATE INDEX idx_reservas_usuario ON reservas(id_usuario);
CREATE INDEX idx_reservas_status ON reservas(id_status);
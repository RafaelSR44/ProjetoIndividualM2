-- Tabelas existentes permanecem inalteradas
-- Novas tabelas para funcionalidade do site de LoL

-- Tabela de usuários para autenticação
CREATE TABLE usuarios_lol (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de páginas de runas salvas
CREATE TABLE rune_pages (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES usuarios_lol(id) ON DELETE CASCADE,
    name VARCHAR(50) NOT NULL,
    primary_tree VARCHAR(20) NOT NULL, -- precisao, dominacao, feiticaria, determinacao, inspiracao
    primary_keystone VARCHAR(50) NOT NULL,
    primary_slot1 VARCHAR(50) NOT NULL,
    primary_slot2 VARCHAR(50) NOT NULL,
    primary_slot3 VARCHAR(50) NOT NULL,
    secondary_tree VARCHAR(20) NOT NULL,
    secondary_slot1 VARCHAR(50) NOT NULL,
    secondary_slot2 VARCHAR(50) NOT NULL,
    shard1 VARCHAR(20) NOT NULL,
    shard2 VARCHAR(20) NOT NULL,
    shard3 VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
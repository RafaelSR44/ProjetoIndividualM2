# Web Application Document - Projeto Individual - Módulo 2 - Inteli

**_Os trechos em itálico servem apenas como guia para o preenchimento da seção. Por esse motivo, não devem fazer parte da documentação final._**

## ReservaAI

#### Rafael Santana Rodrigues

## Sumário

1. [Introdução](#c1)  
2. [Visão Geral da Aplicação Web](#c2)  
3. [Projeto Técnico da Aplicação Web](#c3)  
4. [Desenvolvimento da Aplicação Web](#c4)  
5. [Referências](#c5)  

<br>

## <a name="c1"></a>1. Introdução (Semana 01)

O ReservaAI é um sistema para gestão de reservas de salas em ambientes corporativos, educacionais ou coworkings. Ele permite visualizar a disponibilidade de salas em tempo real, realizar reservas de forma prática.

A aplicação oferece autenticação para diferentes perfis de usuários, como administradores e colaboradores. Administradores podem gerenciar salas e horários, enquanto colaboradores podem buscar salas por critérios específicos e efetuar reservas.

---

## <a name="c2"></a>2. Visão Geral da Aplicação Web

### 2.1. Personas (Semana 01 - opcional)

*Posicione aqui sua(s) Persona(s) em forma de texto markdown com imagens, ou como imagem de template preenchido. Atualize esta seção ao longo do módulo se necessário.*

### 2.2. User Stories (Semana 01 - opcional)

*Posicione aqui a lista de User Stories levantadas para o projeto. Siga o template de User Stories e utilize a referência USXX para numeração (US01, US02, US03, ...). Indique todas as User Stories mapeadas, mesmo aquelas que não forem implementadas ao longo do projeto. Não se esqueça de explicar o INVEST de 1 User Storie prioritária.*

---

## <a name="c3"></a>3. Projeto da Aplicação Web

### 3.1. Modelagem do banco de dados  (Semana 3)

#### Modelo Relacional do Banco de dados 
<img src="assets/EsquemaBaseDeDados.png">

<hr>

#### Modelo Fisico do Banco de Dados
```sql
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
```


### 3.1.1 BD e Models (Semana 5)
*Descreva aqui os Models implementados no sistema web*

### 3.2. Arquitetura (Semana 5)

*Posicione aqui o diagrama de arquitetura da sua solução de aplicação web. Atualize sempre que necessário.*

**Instruções para criação do diagrama de arquitetura**  
- **Model**: A camada que lida com a lógica de negócios e interage com o banco de dados.
- **View**: A camada responsável pela interface de usuário.
- **Controller**: A camada que recebe as requisições, processa as ações e atualiza o modelo e a visualização.
  
*Adicione as setas e explicações sobre como os dados fluem entre o Model, Controller e View.*

### 3.3. Wireframes (Semana 03 - opcional)

*Posicione aqui as imagens do wireframe construído para sua solução e, opcionalmente, o link para acesso (mantenha o link sempre público para visualização).*

### 3.4. Guia de estilos (Semana 05 - opcional)

*Descreva aqui orientações gerais para o leitor sobre como utilizar os componentes do guia de estilos de sua solução.*


### 3.5. Protótipo de alta fidelidade (Semana 05 - opcional)

*Posicione aqui algumas imagens demonstrativas de seu protótipo de alta fidelidade e o link para acesso ao protótipo completo (mantenha o link sempre público para visualização).*

### 3.6. WebAPI e endpoints (Semana 05)

*Utilize um link para outra página de documentação contendo a descrição completa de cada endpoint. Ou descreva aqui cada endpoint criado para seu sistema.*  

### 3.7 Interface e Navegação (Semana 07)

*Descreva e ilustre aqui o desenvolvimento do frontend do sistema web, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.*

---

## <a name="c4"></a>4. Desenvolvimento da Aplicação Web (Semana 8)

### 4.1 Demonstração do Sistema Web (Semana 8)

*VIDEO: Insira o link do vídeo demonstrativo nesta seção*
*Descreva e ilustre aqui o desenvolvimento do sistema web completo, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.*

### 4.2 Conclusões e Trabalhos Futuros (Semana 8)

*Indique pontos fortes e pontos a melhorar de maneira geral.*
*Relacione também quaisquer outras ideias que você tenha para melhorias futuras.*



## <a name="c5"></a>5. Referências

_Incluir as principais referências de seu projeto, para que o leitor possa consultar caso ele se interessar em aprofundar._<br>

---
---
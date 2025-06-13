# League of Legends Guide - Sistema de Runas

### Rafael Santana Rodrigues

## 📖 Descrição do Sistema

O **League of Legends Guide** é uma aplicação web educativa desenvolvida para ajudar jogadores iniciantes a compreender os fundamentos do League of Legends. O sistema oferece guias interativos, um construtor de páginas de runas e funcionalidades de autenticação para personalização.

**Principais Funcionalidades:**
- 🎮 Guias educativos sobre mecânicas do jogo
- ⚡ Construtor interativo de páginas de runas
- 🔐 Sistema de autenticação (login/registro)
- 💾 Armazenamento de configurações personalizadas
- 📱 Interface responsiva e intuitiva

## 🏗️ Arquitetura

A aplicação segue o padrão **MVC (Model-View-Controller)** com:
- **Backend:** Node.js + Express.js
- **Frontend:** EJS + CSS + JavaScript
- **Banco de Dados:** PostgreSQL (Supabase)
- **Autenticação:** Express Sessions + bcryptjs

## 📁 Estrutura de Pastas e Arquivos

```
ProjetoIndividualM2/
│
├── config/                    # Configurações da aplicação
│   └── database.js           # Configuração do PostgreSQL
│
├── controllers/              # Controladores MVC
│   ├── AuthController.js     # Autenticação e registro
│   ├── RunesController.js    # Sistema de runas
│   ├── HomeController.js     # Página inicial
│   ├── ChampionsController.js # Classes de campeões
│   ├── SpellsController.js   # Feitiços de invocador
│   ├── DamageController.js   # Tipos de dano
│   ├── LanesController.js    # Lanes do mapa
│   └── MinionsController.js  # Minions e gold
│
├── docs/                     # Documentação do projeto
│   ├── assets/               # Imagens da documentação
│   │   └── EsquemaBaseDeDados.png
│   ├── BD.sql               # Modelo físico original
│   └── WAD.md               # Documentação WAD
│
├── models/                   # Modelos de dados
│   ├── User.js              # Model de usuários
│   └── RunePage.js          # Model de páginas de runas
│
├── routes/                   # Definição das rotas
│   └── index.js             # Roteamento principal
│
├── services/                 # Serviços auxiliares
│   └── userService.js       # Serviços de usuário (vazio)
│
├── public/                   # Arquivos públicos/estáticos
│   ├── assets/              # Recursos visuais
│   │   ├── champions/       # Imagens dos campeões
│   │   ├── classes/         # Ícones das classes
│   │   ├── items/           # Imagens dos itens
│   │   ├── runes/           # Ícones das runas
│   │   ├── shards/          # Ícones dos fragmentos
│   │   └── spells/          # Ícones dos feitiços
│   ├── scripts/             # JavaScript do frontend
│   │   ├── script.js        # Script principal
│   │   ├── auth.js          # Scripts de autenticação
│   │   ├── rune-builder.js  # Construtor de runas
│   │   ├── my-runes.js      # Gerenciamento de runas
│   │   ├── home.js          # Página inicial
│   │   ├── champions.js     # Página de campeões
│   │   ├── spells.js        # Página de feitiços
│   │   ├── damage.js        # Página de tipos de dano
│   │   ├── lanes.js         # Página de lanes
│   │   ├── minions.js       # Página de minions
│   │   └── runes.js         # Página de runas
│   └── stylesheet/          # Estilos CSS
│       └── style.css        # CSS principal
│
├── views/                    # Templates EJS
│   ├── pages/               # Páginas principais
│   │   ├── home.ejs         # Página inicial
│   │   ├── runes.ejs        # Sistema de runas
│   │   ├── rune-builder.ejs # Construtor de runas
│   │   ├── my-runes.ejs     # Minhas runas
│   │   ├── champions.ejs    # Classes de campeões
│   │   ├── spells.ejs       # Feitiços
│   │   ├── damage.ejs       # Tipos de dano
│   │   ├── lanes.ejs        # Lanes
│   │   └── minions.ejs      # Minions e gold
│   ├── auth/                # Páginas de autenticação
│   │   ├── login.ejs        # Formulário de login
│   │   └── register.ejs     # Formulário de registro
│   ├── partials/            # Componentes reutilizáveis
│   │   ├── header.ejs       # Cabeçalho
│   │   └── footer.ejs       # Rodapé
│   └── error.ejs            # Página de erro
│
├── scripts/                  # Scripts de configuração
│   ├── BD.sql               # Modelo físico original
│   ├── BD2.sql              # Modelo físico atual
│   ├── runSQLScript.js      # Executor de scripts SQL
│   └── test-db-connection.js # Teste de conexão DB
│
├── tests/                    # Testes unitários
│   └── example.test.js      # Exemplo de teste (vazio)
│
├── .env                     # Variáveis de ambiente
├── .env.example             # Exemplo de variáveis
├── .gitignore               # Arquivos ignorados pelo Git
├── .gitattributes           # Configurações do Git
├── jest.config.js           # Configuração do Jest
├── package.json             # Dependências e scripts
├── package-lock.json        # Lock das dependências
├── rest.http                # Testes de endpoints
├── server.js                # Arquivo principal do servidor
└── README.md                # Este arquivo
```

## 🛠️ Configuração do Ambiente

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [PostgreSQL](https://www.postgresql.org/) ou conta no [Supabase](https://supabase.com/)
- [Git](https://git-scm.com/)

### 1. Clone o Repositório

```bash
git clone <url-do-repositorio>
cd ProjetoIndividualM2
```

### 2. Instale as Dependências

```bash
npm install
```

### 3. Configuração do Banco de Dados

#### Opção A: Usando Supabase (Recomendado)

1. Crie uma conta no [Supabase](https://supabase.com/)
2. Crie um novo projeto
3. Acesse as configurações do projeto e copie as credenciais

#### Opção B: PostgreSQL Local

1. Instale o PostgreSQL
2. Crie um banco de dados para o projeto
3. Configure as credenciais de acesso

### 4. Configuração das Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto baseado no `.env.example`:

```env
# Configurações do Banco de Dados
DB_USER=seu_usuario
DB_HOST=seu_host
DB_DATABASE=seu_banco
DB_PASSWORD=sua_senha
DB_PORT=5432
DB_SSL=true

# Porta do Servidor
PORT=3100

# Chave Secreta para Sessões
SESSION_SECRET=sua_chave_secreta_aqui
```

### 5. Configuração do Banco de Dados

Execute o script para criar as tabelas:

```bash
npm run db:setup
```

Ou execute manualmente:

```bash
node scripts/runSQLScript.js
```

### 6. Teste a Conexão do Banco

```bash
node scripts/test-db-connection.js
```

## 🚀 Como Executar o Projeto

### Desenvolvimento

```bash
npm run dev
```

### Produção

```bash
npm start
```

O servidor estará rodando em `http://localhost:3100`

## 🗄️ Scripts Disponíveis

| Script | Comando | Descrição |
|--------|---------|-----------|
| Desenvolvimento | `npm run dev` | Inicia com nodemon (auto-reload) |
| Produção | `npm start` | Inicia o servidor normalmente |
| Testes | `npm test` | Executa testes com Jest |
| Setup DB | `npm run db:setup` | Executa scripts de migração |

## 🧪 Testando as APIs

### Usando o arquivo rest.http

O projeto inclui um arquivo `rest.http` para testar os endpoints. Use extensões como REST Client no VS Code.

### Endpoints Principais

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| `GET` | `/` | Página inicial | ❌ |
| `GET` | `/runes` | Sistema de runas | ❌ |
| `GET` | `/runes/builder` | Construtor de runas | ✅ |
| `GET` | `/runes/my-runes` | Páginas salvas | ✅ |
| `POST` | `/runes/save` | Salvar página de runas | ✅ |
| `DELETE` | `/runes/:id` | Deletar página | ✅ |
| `POST` | `/login` | Fazer login | ❌ |
| `POST` | `/register` | Registrar usuário | ❌ |
| `GET` | `/logout` | Fazer logout | ✅ |

### Exemplos de Requests

```http
### Registrar novo usuário
POST http://localhost:3100/register
Content-Type: application/x-www-form-urlencoded

username=testuser&email=test@example.com&password=123456&confirmPassword=123456

### Fazer login
POST http://localhost:3100/login
Content-Type: application/x-www-form-urlencoded

username=testuser&password=123456

### Salvar página de runas (requer autenticação)
POST http://localhost:3100/runes/save
Content-Type: application/json

{
  "name": "Jinx ADC Build",
  "primaryTree": "precisao",
  "primaryKeystone": "lethal_tempo",
  "primarySlot1": "triumph",
  "primarySlot2": "legend_alacrity",
  "primarySlot3": "coup_de_grace",
  "secondaryTree": "dominacao",
  "secondarySlot1": "taste_of_blood",
  "secondarySlot2": "treasure_hunter",
  "shard1": "adaptive_force",
  "shard2": "adaptive_force",
  "shard3": "health"
}
```

## 🏗️ Banco de Dados

### Schema Principal

```sql
-- Tabela de usuários
CREATE TABLE usuarios_lol (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de páginas de runas
CREATE TABLE rune_pages (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES usuarios_lol(id) ON DELETE CASCADE,
    name VARCHAR(50) NOT NULL,
    primary_tree VARCHAR(20) NOT NULL,
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
```

### Backup e Restauração

Para fazer backup:
```bash
pg_dump -h seu_host -U seu_usuario -d seu_banco > backup.sql
```

Para restaurar:
```bash
psql -h seu_host -U seu_usuario -d seu_banco < backup.sql
```

## 🧪 Testes

O projeto está configurado com Jest para testes unitários:

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm test -- --watch

# Executar com coverage
npm test -- --coverage
```

Estrutura de testes recomendada:
```
tests/
├── controllers/
├── models/
├── routes/
└── utils/
```

## 📋 Funcionalidades Implementadas

### ✅ Sistema de Autenticação
- [x] Registro de usuários com validação
- [x] Login com hash de senhas (bcrypt)
- [x] Sessões persistentes
- [x] Proteção de rotas sensíveis
- [x] Logout seguro

### ✅ Sistema de Runas
- [x] Construtor visual interativo
- [x] Validação de regras do jogo LoL
- [x] Preview em tempo real
- [x] Salvar páginas personalizadas
- [x] Gerenciar páginas salvas
- [x] Exclusão com confirmação

### ✅ Conteúdo Educativo
- [x] Página inicial com história do LoL
- [x] Sistema de runas explicado
- [x] Feitiços de invocador
- [x] Tipos de dano
- [x] Classes de campeões
- [x] Lanes do mapa
- [x] Minions e gold

### ✅ Interface e UX
- [x] Design responsivo
- [x] Animações CSS suaves
- [x] Navegação intuitiva
- [x] Feedback visual
- [x] Acessibilidade básica

## ▶️ Video

### ⛓️‍💥 Link para o video de demonstração



## 🖥️ Interface e Navegação

**Frontend Desenvolvido:**

1. **Sistema de Navegação**
   - Menu responsivo com estados ativos
   - Breadcrumbs contextuais
   - Navegação por teclado (Alt + setas)

2. **Páginas Educativas**
   - Conteúdo interativo com JavaScript
   - Cards expansíveis e tooltips
   - Animações CSS suaves

3. **Sistema de Runas**
   - Construtor visual interativo
   - Preview em tempo real
   - Validação de seleções

4. **Autenticação**
   - Formulários com validação
   - Feedback visual de estados
   - Proteção de rotas sensíveis

#### **Capturas de Tela das Interfaces**

**1. Página Inicial**
<img src="docs/assets/home.png">

Página principal da aplicação apresentando a navegação principal e uma visão geral do League of Legends Guide. Interface clean com design inspirado no universo do jogo.

**2. Tela de Login**
<img src="docs/assets/login.png">

Formulário de autenticação com validação em tempo real, design consistente com a identidade visual da aplicação e feedback visual para estados de erro.

**3. Tela de Registro**
<img src="docs/assets/register.png">

Interface de cadastro de novos usuários com validação de campos, confirmação de senha e tratamento de erros para melhor experiência do usuário.

**4. Sistema de Runas - Visão Geral**
<img src="docs/assets/runes.png">

Página introdutória ao sistema de runas, explicando os conceitos fundamentais e fornecendo navegação para o construtor e páginas salvas.

**5. Construtor de Runas**
<img src="docs/assets/createRunes.png">

Interface interativa para criação de páginas de runas, com seleção visual de árvores primárias e secundárias, validação de regras e preview em tempo real.

**6. Minhas Runas**
<img src="docs/assets/myRunes.png">

Página de gerenciamento das páginas de runas salvas pelo usuário, com visualização em cards, opções de edição e exclusão com confirmação.

**7. Guia de Campeões**
<img src="docs/assets/champions.png">

Seção educativa sobre as diferentes classes de campeões, com cards interativos e informações detalhadas sobre cada categoria de personagem.

**8. Guia de Feitiços**
<img src="docs/assets/spells.png">

Interface educativa apresentando os feitiços do invocador, com descrições detalhadas, cooldowns e dicas de uso estratégico.

**9. Guia de Lanes**
<img src="docs/assets/lanes.png">

Página explicativa sobre as diferentes rotas do mapa, suas responsabilidades e características específicas de cada posição.

**10. Tipos de Dano**
<img src="docs/assets/damageType.png">

Seção educativa sobre os diferentes tipos de dano no jogo, explicando dano físico, mágico e verdadeiro com exemplos práticos.

**11. Guia de Minions**
<img src="docs/assets/minions.png">

Interface educativa sobre as unidades minions, suas características, valores de ouro e estratégias de farm para novos jogadores.


## 🚧 Melhorias Futuras

### 🚀 Roadmap
- [ ] PWA (Progressive Web App)
- [ ] Integração com API oficial da Riot
- [ ] Sistema de compartilhamento
- [ ] Dashboard administrativo
- [ ] Sistema de favoritos
- [ ] Modo offline

## Tecnologias Utilizadas

- **Backend:** Node.js + Express.js
- **Frontend:** EJS + CSS + JavaScript
- **Banco de Dados:** PostgreSQL (Supabase)
- **Autenticação:** Express Sessions + bcryptjs

## 🐛 Troubleshooting

### Problemas Comuns

**Erro de conexão com banco:**
```bash
# Verifique as credenciais no .env
node scripts/test-db-connection.js
```

**Porta já em uso:**
```bash
# Mude a porta no .env ou termine o processo
lsof -ti:3100 | xargs kill -9
```

**Dependências quebradas:**
```bash
# Limpe e reinstale
rm -rf node_modules package-lock.json
npm install
```

**Sessões não funcionam:**
```bash
# Verifique se SESSION_SECRET está definido no .env
```
---

**Boa sorte no Rift, Invocador! 🎮⚡**
# Projeto Individual M2

### Rafael Santana Rodrigues

## Descrição do Sistema

O **ReservaAI** é um sistema de reserva de salas que permite aos usuários agendar e gerenciar reservas de forma eficiente. Ele foi projetado para ser simples de usar, com uma interface intuitiva e funcionalidades robustas para atender às necessidades de gerenciamento de espaços.

## Estrutura de Pastas e Arquivos

A estrutura do projeto é organizada da seguinte forma:

```
ProjetoIndividualM2/
│
├── config/                # Arquivos de configuração
│   └── database.js
├── controllers/           # Lógica de controle das requisições
│   └── HomeController.js
├── docs/           # Documentação WAD
│   ├──assets/
│   │   └── EsquemaBaseDeDados.png # imagem do modelo conceitual
│   ├──BD.sql #Modelo fisico do Banco de dados
│   └── WAD.md
├── models/                # Definição de modelos de dados 
│   └── User.js
├── routes/                # Definição das rotas do sistema
│   └── index.js
├── services/              # Serviços auxiliares do sistema
│   └── userService.js
├── public/                # Arquivos públicos
│   ├── assets/            # Arquivos públicos como imagens e fontes
│   └── stylesheet/        # Arquivos públicos como .css
│   │   └──style.css
├── views/                # Arquivos .ejs
│   └── pages/        # Arquivos .ejs das paginas do site
│   │   └──home.ejs
├── scripts/               # Arquivos de JavaScript públicos
├── tests/                 # Arquivos de testes unitários
│   └── example.test.js
├── .gitignore             # Arquivo para ignorar arquivos no Git
├── .gitattributes         # Configurações específicas para o Git
├── .env.example           # Arquivo de exemplo para variáveis de ambiente
├── jest.config.js         # Arquivo de configuração do Jest
├── package-lock.json      # Gerenciador de dependências do Node.js
├── package.json           # Gerenciador de dependências do Node.js
├── readme.md              # Documentação do projeto (Markdown)
├── server.js              # Arquivo principal que inicializa o servidor
└── rest.http              # Teste de endpoints
```

## Como Executar o Projeto Localmente

Siga os passos abaixo para executar o projeto localmente:

1. Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina.
2. Clone este repositório para o seu ambiente local.
3. Navegue até o diretório do projeto:
   ```bash
   cd ProjetoIndividualM2
   ```
4. Instale as dependências do projeto:
   ```bash
   npm install
   ```
5. Inicie o servidor:
   ```bash
   node server.js
   ```
6. O servidor estará rodando em `http://localhost:3100` (ou outra porta configurada).

Agora você pode acessar o sistema e começar a gerenciar suas reservas de salas com o **ReservaAI**!
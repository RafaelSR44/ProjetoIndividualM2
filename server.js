const express = require('express');
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
// Rotas
require('dotenv').config();


// Middleware para processar JSON
app.use(express.json());

// Configura o mecanismo de views para EJS
app.set("view engine", "ejs");
// Define onde ficam as views
app.set("views", path.join(__dirname, "views"));


// Define a pasta pública com CSS e outros arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));


// Rotas
const routes = require('./routes/index');
app.use('/', routes);

// Inicializa o servidor
const PORT = process.env.PORT || 3100;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`); 
});
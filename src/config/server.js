/* Dependencias */
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

/* Constante que contem o servidor */
const server = express();

/* Habilita as Variaveis de Ambiente */
require("dotenv").config();

/* Habilita o CORS na Aplicação */
const allowCors = require("./cors");

/* Configurações do Servidor */
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(morgan("dev"));
server.use(allowCors);

/* Armazena a porta da Aplicação */
const port = process.env.PORT || 3100;

/* Starta o Servidor */
server.listen(port, () => console.log(`Server's Running - Port: ${port}`));

/* Exporta o servidor para o arquivo inicializador */
module.exports = server;
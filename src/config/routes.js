/* Dependencias */
const express = require("express");
const multer = require("multer");

/* Configurações do Multer */
const multerConfig = require("../config/multer");

/* Controller */
const ctrl = require("../controllers/ctrl");

/* Exporta as rotas para o arquivo inicializar */
module.exports = function(server) {

    /* Rota da API */
    const api = express.Router();
    server.use("/api", api);

    /* Rotas */
    api.get("/", (req, res, next) => {
        return res.status(200).send(`The API's Running! - Status: "Ok"`);
    });

    api.get("/imgs", ctrl.getImgs);
    api.post("/imgs", multer(multerConfig).single("file"), ctrl.insertImg);

}
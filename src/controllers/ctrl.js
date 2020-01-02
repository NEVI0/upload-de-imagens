/* Dependencias */
const crypto = require("crypto");
const mongoose = require("mongoose");

/* Traz os Schemas/Models para o controller */
require("../models/Image");
const Img = mongoose.model("Img");

/* ================ Controllers / Middlewares ================ */

/* Busca todas as Imagens */
const getImgs = (req, res, next) => {
    Img.find((err, resp) => {
        if (err) {
            return res.json(err);
        } else {
            return res.json(resp);
        }
    });
}

/* Inseri novas documentos */
const insertImg = (req, res, next) => {
    return res.json(req.file);
}

/* Exporta os controllers para as Rotas */
module.exports = { getImgs, insertImg }
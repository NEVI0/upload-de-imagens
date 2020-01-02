/* Dependencias */
const mongoose = require("mongoose");
const fs = require("fs");

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

/* Inseri uma nova Imagem */
const insertImg = (req, res, next) => {
    
    /* Armazena os dados contidos em: req.file */
    const { originalname, filename, size, path } = req.file;

    /* Amazena os Dados */
    Img.create({
        name: originalname,
        hashName: filename,
        url: path,
        size: size
    }, (err, resp) => {
        if (err) {
            return res.json(err);
        } else {
            return res.json(resp);
        }
    });

}

/* Atualiza uma Imagem */
const updateImg = (req, res, next) => {

    /* Dados do Arquivo */
    const { originalname, filename, size, path } = req.file;

    /* Busca os dados do arquivo */
    Img.findById(req.params.id, (err, resp) => {
        if (err) {
            return res.json(err);
        }

        /* Deleta o arquivo antigo */
        fs.unlink(resp.url, (err) => {
            if (err) {
                return res.json(err);
            }
        });
    });

    /* Atualiza o Documento */
    Img.findByIdAndUpdate(req.params.id, {
        name: originalname,
        hashName: filename,
        url: path,
        size: size
    }, { new: true }, (err, resp) => {
        if (err) {
            return res.json(err);
        } else {
            return res.json(resp);
        }
    })

}

/* Deleta um Imagem */
const deleteImg = (req, res, next) => {
    
    /* Busca os dados do arquivo */
    Img.findById(req.params.id, (err, resp) => {
        if (err) {
            return res.json(err);
        } 
    
        /* Deleta o arquivo */
        fs.unlink(resp.url, (err) => {
            if (err) {
                return res.json(err);
            }
        });
    });

    /* Deleta o Documento */
    Img.findByIdAndDelete(req.params.id, (err, resp) => {
        if (err) {
            return res.json(err);
        } else {
            return res.status(200).send("Document deleted Successfully!");
        }
    });
}

/* Exporta os controllers para as Rotas */
module.exports = { getImgs, insertImg, updateImg, deleteImg }
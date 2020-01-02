/* Dependencias */
const multer = require("multer");
const crypto = require("crypto");
const path = require("path");

/* Configurações do Multer */
module.exports = {

    /* Envia o arquivo para o diretório tmp/uploads */
    dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
    storage: multer.diskStorage({

        /* Envia o arquivo para o diretório tmp/uploads */
        destination: (req, file, callback) => {
            callback(null, path.resolve(__dirname, "..", "..", "tmp", "uploads"));
        }, 

        /* Função para adicionar um hash no arquivo */
        filename: (req, file, callback) => {

            /* Gera um hash de 16 Bites */
            crypto.randomBytes(16, (err, hash) => {

                /* Para a execução se houver errors */
                if (err) {
                    callback(err);
                }

                /* Contém o nome do arquivo com o hash */
                const hashName = `${hash.toString("hex")}-${file.originalname}`;

                /* Retorna na callback o nome com o hash */
                callback(null, hashName);

            });

        }

    }),
    limits: {
        fileSize: 4 * 1024 *1024 /* Limita o tamanho do arquivo para 4MB */
    },
    fileFilter: (req, file, callback) => {
        
        /* Tipos de extenções de arquivos aceitaveis */
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/jpg'
        ];

        /* Verifica se o arquivo conta as extenções */
        if (allowedMimes.includes(file.mimetype)) {
            callback(null, true);
        } else {
            callback(new Error("Invalid file type"));
        }
    }

}
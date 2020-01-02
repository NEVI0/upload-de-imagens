/* Dependencias */
const mongoose = require("mongoose");

/* Schema das Imagens */
const ImgSchema = new mongoose.Schema({
    name: { type: String, required: true },
    hashName: { type: String, required: true },
    url: { type: String, required: true },
    size: { type: Number, required: true }
});

/* Exporta o Schema */
module.exports = mongoose.model("Img", ImgSchema);
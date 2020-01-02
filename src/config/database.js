/* Dependencias */
const mongoose = require("mongoose");

/* Habilita as Variaveis de Ambiente */
require("dotenv").config();

/* Exporta a Conexão */
module.exports = mongoose.connect(`mongodb://localhost:27017/test_upload_imgs`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(resp => {
    console.log(`MongoDB's Connected!`);
}).catch(err => {
    console.log(`An error occured! \n Error: ${err}`);
})
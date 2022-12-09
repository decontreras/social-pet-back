const mongoose = require('mongoose');

const dbConection = async () => {
    try {
        await mongoose.connect(process.env.DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Base de datos conectada'.blue);
    } catch (error) {
        throw new Error("Error al conectar base de datos".red);
    }
}


module.exports = {
    dbConection
};
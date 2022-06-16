const mongosse = require('mongoose');

const dbConnection = async () => {
    try {
        await mongosse.connect('')
        .then(console.info('DB Online'))
        .catch(err => console.warn(err));
    } catch (error) {
        throw new Error('Error al iniciar base de datos', error);
    }
}

module.exports = {
    dbConnection
}
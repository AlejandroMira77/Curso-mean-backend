const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN)
        .then(console.info('DB online'))
        .catch(err => console.warn(err));
    } catch (error) {
        throw new Error('Error init bd ', error);
    }
}

module.exports = {
    dbConnection
}
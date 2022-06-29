const { response } = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

const login = async(req, res = response) => {
    const { email, password } = req.body;
    try {
        // Verificar email
        const userDB = await User.findOne({ email });
        if (!userDB) {
            return res.status(404).json({
                msg: 'Email no valido'
            });
        }

        // Verificar password
        const validatePass = bcrypt.compareSync(password, userDB.password);
        if (!validatePass) {
            return res.status(400).json({
                msg: 'Constraseña no valido'
            });
        }
        
        // Generar un token - jwt
        const token = await generateJWT(userDB.id);
        res.json({
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hubo un error en el servidor'
        });
    }
}

module.exports = { login };
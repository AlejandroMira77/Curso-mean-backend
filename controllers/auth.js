const { response } = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSignIn = async (req, res = response) => {
    try {
        // const google = await googleVerify(req.body.token);
        const { name, email, picture } = await googleVerify(req.body.token);
        const userDB = await User.findOne({ email });
        let user;
        if (!userDB) {
            user = new User({
                name,
                email,
                password: '@@@',
                img: picture,
                google: true
            })
        } else {
            user = userDB;
            user.google = true;
        }
        await user.save();
        const token = await generateJWT(user.id);
        res.json({
            name, email, picture,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Token de Google no es correcto'
        });
    }
}

module.exports = { login, googleSignIn };
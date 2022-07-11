const User = require('../models/user');
const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

const getUsers = async (req, res) => {
    try {
        // consulta de usuarios con paginación
        const from = Number(req.query.from) || 0;
        // const users = await User.find({}, 'name email role google')
        //                         .skip(from).limit(5);
        // const totalUsers = await User.count();
        //-----------------------
        // resolver todo en un solo llamado
        const [ users, totalUsers ] = await Promise.all([
            User.find({}, 'name email role google img').skip(from).limit(5),
            User.countDocuments()
        ]);
        res.json({
            users,
            totalUsers
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado revisar logs'
        });
    }
}

const createUser = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        const existEmail = await User.findOne({ email });
        if (existEmail) {
            return res.status(400).json({
                msg: 'El correo ya esta registrado'
            });
        }
        const user = new User(req.body);

        // encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        // guarda en BD
        await user.save();

        // Generar un token - jwt
        const token = await generateJWT(user.id);
        res.json({
            user,
            token
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error inesperado revisar logs'
        });
    }
}

const updateUser = async (req, res = response) => {
    const uid = req.params.id;
    try {
        const userDB = await User.findById(uid);
        if (!userDB) {
            return res.status(404).json({
                msg: 'No existe el usuario'
            });
        }

        const {password, google, email, ...fields} = req.body;
        if (userDB.email !== email)     {
            const existEmail = await User.findOne({ email });
            if (existEmail) {
                return res.status(400).json({
                    msg: 'El correo ya esta registrado'
                });
            }
        }
        fields.email = email;
        const updatedUser = await User.findByIdAndUpdate(uid, fields, {new: true});

        res.json({
            user: updatedUser
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
}

const deleteUser = async (req, res = response) => {
    const uid = req.params.id;
    try {
        const userDB = await User.findById(uid);
        if (!userDB) {
            return res.status(404).json({
                msg: 'No existe el usuario'
            });
        }
        await User.findByIdAndDelete(uid);
        res.json({
            user: 'usuario eliminado...'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
}

module.exports = { getUsers, createUser, updateUser, deleteUser };
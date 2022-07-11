const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { uploadImg } = require('../helpers/upload-img');
const path = require('path');
const fs = require('fs');

const fileUpload = (req, res = response) => {
    const type = req.params.type;
    const id = req.params.id;
    const validTypes = [ 'hospitals', 'medicals', 'users' ];
    if (!validTypes.includes(type)) {
        return res.status(400).json({
            msg: 'No es un médico, usuario u hospital'
        });
    }
    // valida que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            msg: 'No hay ningun archivo'
        });
    }
    // procesar la imagen
    // se require el middleware para acceder a los files
    const file = req.files.img;
    const cutName = file.name.split('.');
    const fileExtension = cutName[cutName.length - 1];
    const validExtensions = ['png', 'jpg', 'jpeg', 'gif'];
    if (!validExtensions.includes(fileExtension)) {
        return res.status(400).json({
            msg: 'No es una extensión permitida'
        });
    }
    // generar nombre del archivo
    const fileName = `${ uuidv4() }.${ fileExtension }`;

    // path para guardar la imagen
    const path = `./uploads/${ type }/${ fileName }`;

    try {
        // mover la imagen
        file.mv(path, (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    msg: 'Error al mover la imagen'
                });
            }
            // actualizar base de datos
            uploadImg(type, id, fileName);
            return res.json({
                msg: 'Archivo subido',
                fileName
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado revisar logs'
        });
    }
}

const getImg = (req, res = response) => {
    const type = req.params.type;
    const img = req.params.img;
    const pathImg = path.join( __dirname, `../uploads/${ type }/${ img }`);
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        const pathImg = path.join( __dirname, `../uploads/no-img.jpg`);
        res.sendFile(pathImg);
    }
}

module.exports = { fileUpload, getImg };
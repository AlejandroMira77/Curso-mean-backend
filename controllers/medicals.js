const { response } = require('express');
const Medical = require('../models/medical');

const getMedicals = async (req, res = response) => {
    try {
        const medicals = await Medical.find().populate('user', 'name img').populate('hospital', 'name');
        res.json({
            medicals
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
}

const createMedicals = async (req, res = response) => {
    try {
        const uid = req.uid;
        const medical = new Medical({
            user: uid,
            ...req.body
        });
        const savedMedical = await medical.save();
        res.json({
            msg: 'create Medicals',
            savedMedical
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
}

const updateMedicals = (req, res = response) => {
    res.json({
        msg: 'update Medicals'
    });
}

const deleteMedicals = (req, res = response) => {
    res.json({
        msg: 'delete Medicals'
    });
}

module.exports = {
    getMedicals,
    createMedicals,
    updateMedicals,
    deleteMedicals
};
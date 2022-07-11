const { response } = require('express');
const Hospital = require('../models/hospital');

const getHospitals = async (req, res = response) => {
    try {
        const hospitals = await Hospital.find().populate('user', 'name img');
        res.json({
            hospitals
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
}

const createHospitals = async (req, res = response) => {
    try {
        const uid = req.uid;
        const hospital = new Hospital({
            user: uid,
            ...req.body
        });
        const savedHospital = await hospital.save();
        res.json({
            msg: 'create Hospitals',
            savedHospital
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
}

const updateHospitals = (req, res = response) => {
    res.json({
        msg: 'update Hospitals'
    });
}

const deleteHospitals = (req, res = response) => {
    res.json({
        msg: 'delete Hospitals'
    });
}

module.exports = {
    getHospitals,
    createHospitals,
    updateHospitals,
    deleteHospitals
};
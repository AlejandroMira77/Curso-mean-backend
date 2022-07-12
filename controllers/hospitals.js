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

const updateHospitals = async (req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;
    try {
        const hospital = await Hospital.findById(id);
        if (!hospital) {
            return res.status(404).json({
                msg: 'Hospital no encontrado por id'
            });
        }
        const changeHospital = {
            ...req.body,
            user: uid
        }
        // que devuelva el ultimo documento actualizado -- new: true
        const updateHospital = await Hospital.findByIdAndUpdate(id, changeHospital, { new: true });
        res.json({
            hospital: updateHospital
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
}

const deleteHospitals = async (req, res = response) => {
    const id = req.params.id;
    try {
        const hospital = await Hospital.findById(id);
        if (!hospital) {
            return res.status(404).json({
                msg: 'Hospital no encontrado por id'
            });
        }
        await Hospital.findByIdAndDelete(id);
        res.json({
            msg: 'Hospital eliminado...'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
}

module.exports = {
    getHospitals,
    createHospitals,
    updateHospitals,
    deleteHospitals
};
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

const updateMedicals = async (req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;
    try {
        const medical = await Medical.findById(id);
        if (!medical) {
            return res.status(404).json({
                msg: 'Medico no encontrado por id'
            });
        }
        const changeMedical = {
            ...req.body,
            user: uid
        }
        const updateMedical = await Medical.findByIdAndUpdate(id, changeMedical, { new: true });
        res.json({
            medico: updateMedical
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
}

const deleteMedicals = async (req, res = response) => {
    const id = req.params.id;
    try {
        const medical = await Medical.findById(id);
        if (!medical) {
            return res.status(404).json({
                msg: 'Medico no encontrado por id'
            });
        }
        await Medical.findByIdAndDelete(id);
        res.json({
            msg: 'Medico eliminado...'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
}

module.exports = {
    getMedicals,
    createMedicals,
    updateMedicals,
    deleteMedicals
};
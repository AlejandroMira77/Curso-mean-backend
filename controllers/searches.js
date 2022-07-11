const { response } = require("express");
const User = require('../models/user');
const Medical = require('../models/medical');
const Hospital = require('../models/hospital');

const getAll = async (req, res = response) => {
    try {
        const search = req.params.search;
        const regex = new RegExp( search, 'i');
        const [ userSearch, medicalSearch, hospitalSearch ] = await Promise.all([
            User.find({ name: regex }),
            Medical.find({ name: regex }),
            Hospital.find({ name: regex })
        ]);
        res.json({
            userSearch,
            medicalSearch,
            hospitalSearch
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado revisar logs'
        });
    }
}

const getAllCollection = async (req, res = response) => {
    try {
        const table = req.params.table;
        const search = req.params.search;
        const regex = new RegExp( search, 'i');
        let data = [];

        switch (table) {
            case 'medicals':
                data = await Medical.find({ name: regex }).populate('user', 'name img').populate('hospital', 'name');
                break;
            case 'hospitals':
                data = await Hospital.find({ name: regex }).populate('user', 'name img');
                break;
            case 'users':
                data = await User.find({ name: regex });
                break;
            default:
                return res.status(400).json({
                    msg: 'La tabla tiene que ser users/medicals/hospitals'
                });
        }
        res.json({
            data
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado revisar logs'
        });
    }
}

module.exports = { getAll, getAllCollection };
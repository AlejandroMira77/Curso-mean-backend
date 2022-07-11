const User = require('../models/user');
const Medical = require('../models/medical');
const Hospital = require('../models/hospital');
const fs = require('fs');

const uploadImg = async (type, id, fileName) => {
    switch (type) {
        case 'hospitals':
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                return false;
            }
            const pathOldHospital = `./uploads/hospitals/${ hospital.img }`;
            deleteImg(pathOldHospital);
            hospital.img = fileName;
            await hospital.save();
            return true;
            break;
        case 'medicals':
            const medical = await Medical.findById(id);
            if (!medical) {
                return false;
            }
            const pathOldMedical = `./uploads/medicals/${ medical.img }`;
            deleteImg(pathOldMedical);
            medical.img = fileName;
            await medical.save();
            return true;
            break;
        case 'users':
            const user = await User.findById(id);
            if (!user) {
                return false;
            }
            const pathOldUsers = `./uploads/users/${ user.img }`;
            deleteImg(pathOldUsers);
            user.img = fileName;
            await user.save();
            return true;
            break;
        default:
            break;
    }
}

const deleteImg = (path) => {
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
}

module.exports = { uploadImg };
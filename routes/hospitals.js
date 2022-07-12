/*
    Route: /api/hospitals
*/
const { Router } = require('express');
const { getHospitals, createHospitals, updateHospitals, deleteHospitals } = require('../controllers/hospitals');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/', getHospitals);

router.post('/', 
    [
        validateJWT,
        check('name', 'El nombre del hospital es obligatorio').not().isEmpty(),
        validateFields
    ],
    createHospitals
);

router.put('/:id', 
    [
        validateJWT,
        check('name', 'El nombre del hospital es obligatorio').not().isEmpty(),
        validateFields
    ],
    updateHospitals
);

router.delete('/:id', validateJWT, deleteHospitals);

module.exports = router;
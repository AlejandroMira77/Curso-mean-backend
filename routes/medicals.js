/*
    Route: /api/medicals
*/
const { Router } = require('express');
const { getMedicals, createMedicals, updateMedicals, deleteMedicals } = require('../controllers/medicals');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/', getMedicals);

router.post('/', 
    [
        validateJWT,
        check('name', 'El nombre del medico es obligatorio').not().isEmpty(),
        check('hospital', 'El hospital id debe ser válido').isMongoId(),
        validateFields
    ],
    createMedicals
);

router.put('/:id', 
    [],
    updateMedicals
);

router.delete('/:id', deleteMedicals);

module.exports = router;
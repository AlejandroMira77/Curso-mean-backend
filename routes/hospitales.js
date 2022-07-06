/*
    Route: /api/hospitales
*/
const { Router } = require('express');

const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/', validateJWT, );

router.post('/',
    [
        check(),
        validateFields
    ],
);

router.put('/:id',
    [
        validateJWT,
        check(),
        validateFields
    ],
);

router.delete('/:id',
    validateJWT,
);

module.exports = router;
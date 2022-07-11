const { response } = require('express');
const { validationResult } = require('express-validator');

const validateFields = (req, res = response, next) => {
    // creara un arreglo de errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.mapped()
        });
    }
    next();
}

module.exports = { validateFields };
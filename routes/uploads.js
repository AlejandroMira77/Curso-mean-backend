/*
    Route: /api/upload
*/
const { Router } = require('express');
const expressFileUpload = require('express-fileupload');
const { validateJWT } = require('../middlewares/validate-jwt');
const { fileUpload, getImg } = require('../controllers/uploads');

const router = Router();

// esto es un middleware
// para hacer la carga de archivo
router.use(expressFileUpload());

router.put('/:type/:id', validateJWT, fileUpload);
router.get('/:type/:img', getImg);

module.exports = router;
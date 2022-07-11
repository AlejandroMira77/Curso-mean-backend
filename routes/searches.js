/*
    Route: /api/all/
*/
const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');
const { getAll, getAllCollection } = require('../controllers/searches');

const router = Router();

router.get('/:search', validateJWT, getAll);
router.get('/collection/:table/:search', validateJWT, getAllCollection);

module.exports = router;
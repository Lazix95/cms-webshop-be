const express = require('express');
const router = express.Router();

const initApp = require('./../controllers/initApp');

router.get('/init-app', initApp["init-app"]);

module.exports = router;
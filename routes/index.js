const express = require('express');
const router = express.Router();
const home = require('../controllers/HomeController');



// Rota principal
router.get('/', home.index);

module.exports = router;
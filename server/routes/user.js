const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userController');
//Routes
router.get('/',userControllers.view)
//Exporting the router
module.exports = router;
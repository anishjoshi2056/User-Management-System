const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userController');
//Routes for create,find,update,delete
//For Viewing all the data
router.get('/',userControllers.view);
//Find the User by Search
router.post('/',userControllers.find);
//Exporting the router
module.exports = router;
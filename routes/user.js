const express = require('express');
const {getusers} =require('../controllers/usercontroller');
const authenticateToken = require('../middleware/authcontrollerToken');
const router = express.Router();

router.get('/getusers',authenticateToken, getusers);



module.exports = router
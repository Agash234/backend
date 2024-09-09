const express = require('express');
const {getproducts, addproduct} =require('../controllers/productcontroller')
const authenticateToken= require('../middleware/authcontrollerToken')
const router = express.Router();

router.get('/getproducts',authenticateToken,getproducts);
router.post('/addproduct',authenticateToken,addproduct);



module.exports = router;
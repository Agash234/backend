const express = require('express');
const {refreshToken}=require('../controllers/refreshController');
const router=express.Router();

router.post('/refreshtoken',refreshToken);

module.exports=router;

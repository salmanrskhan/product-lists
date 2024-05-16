const express = require('express');
const router = express.Router();

const loginController=require('../controller/loginController')

router.post('/login', loginController.addLogin)

router.post('/login/admin', loginController.loginAdmin)

router.get('/login', loginController.getAllLogin);


module.exports=router;
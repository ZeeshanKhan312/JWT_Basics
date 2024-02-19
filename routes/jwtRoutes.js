const express=require('express');
const router=express.Router();

const {login,dashboard}=require('../controllers/mainController');
const jwtAuth=require('../middleware/auth');

router.route('/login').post(login);
router.route('/dashboard').get(jwtAuth,dashboard);

module.exports=router;
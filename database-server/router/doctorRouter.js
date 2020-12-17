var express = require('express');
var doctorController = require('../controller/doctorController');
var authController = require('../controller/authController');

const router = express.Router();
router.get("/" , (req ,res ,next) => {
    res.status(200).json({
        status : "success",
        message : "Hello"
    })
})
router.post('/signup' , doctorController.signup);
router.get('/validate/:token' , doctorController.validateDoctor)
router.post('/signin', doctorController.signin)
router.post('/insert/:disease',authController.protectedUser, doctorController.insertDisease);
router.get('/me',authController.protectedUser, doctorController.me);



module.exports = router;
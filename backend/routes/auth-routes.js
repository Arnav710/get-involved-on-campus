const {Router} = require('express');
const authController = require('./../controllers/authController');

const router = Router();

// getting data for signup
router.get('/signup', authController.signup_get);

// adding a new user
router.post('/signup', authController.signup_post);

// getting data for login
router.get('/login', authController.login_get);

// logging in a user
router.post('/login', authController.login_post);


module.exports = router;
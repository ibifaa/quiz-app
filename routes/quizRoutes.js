const router = require('express').Router();

const {
    getHomePage,
    getRegistrationForm,
    getLoginForm,
    userRegistrationRequest,
} = require('../controllers/quizControllers');

router.get('/', getHomePage);
router.get('/registration-form', getRegistrationForm);
router.post('/registration-form', userRegistrationRequest);

router.get('/login-form', getLoginForm);


module.exports = router;
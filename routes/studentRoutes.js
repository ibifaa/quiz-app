
const router = require('express').Router();

const { authenticateUser } = require('../middlewares/userAuth');

const {
    getSignupForm,
    signupRequest,
    getLoginForm,
    loginRequest,
    getStudentDashboard,
    submitQuiz, 
    getQuizQuestions, 
    getSingleQuiz,
    logout} = require('../controllers/studentController')


router.get('/signup', getSignupForm);
router.post('/signup', signupRequest);
    
router.get('/login', getLoginForm);
router.post('/login', loginRequest );

router.get('/student-dashboard', getStudentDashboard);

router.get('/take-quiz/:id',  getQuizQuestions);

router.get('/single-quiz/:id', getSingleQuiz);
router.post('/submit-quiz',  submitQuiz);

router.post('/logout', logout)

module.exports = router;
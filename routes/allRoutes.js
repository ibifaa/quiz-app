// const router = require('express').Router();
// const bodyParser = require("body-parser"); 
// const {authenticateUser} = require('../middlewares/userAuth');
// const {authorizeStudent} = require('../middlewares/studentAuth')

// router.use(bodyParser.json());

// const {
//     getHomePage,

//     getRegistrationForm,
//     userRegistrationRequest,

//     getLoginForm,
//     loginRequest, 

//     getStudentDashboard,

//     submitQuiz, 
//     getQuizQuestions, 

//     getTeacherDashboard,
//     getCreateQuiz,

//     getSingleQuiz,
//     createQuizRequest,
    
// } = require('../controllers/allControllers');

// router.get('/', getHomePage);

// router.get('/registration-form', getRegistrationForm);
// router.post('/registration-form', userRegistrationRequest);

// router.get('/login-form', getLoginForm);
// router.post('/login-form', loginRequest );

// router.get('/student-dashboard', authenticateUser, authorizeStudent, getStudentDashboard);
// router.get('/take-quiz/:id',  getQuizQuestions);


// router.get('/single-quiz/:id',  getSingleQuiz);
// router.post('/submit-quiz', authenticateUser, authorizeStudent,  submitQuiz);

// const {
//   } = require('../controllers/teacherController');



// router.get('/teacher-dashboard',  getTeacherDashboard);

// router.get('/create-quiz', getCreateQuiz);

// router.post('/create-quiz', createQuizRequest);

// module.exports = router;

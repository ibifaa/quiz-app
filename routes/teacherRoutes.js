const router = require('express').Router();
const {authorizeTeacher} = require('../middlewares/teacherAuth');
const {authenticateUser} = require('../middlewares/userAuth');


const {
    getTeacherDashboard,
     getCreateQuiz,
     createQuizRequest,} = require('../controllers/teacherController')


router.get('/teacher-dashboard', getTeacherDashboard);

router.get('/create-quiz', getCreateQuiz);

router.post('/create-quiz', createQuizRequest);

module.exports = router;
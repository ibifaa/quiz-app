const UserModel = require('../models/userModel');
const QuizModel = require('../models/quizModel');
const ResultModel =require('../models/resultModel')
const jwt = require('jsonwebtoken');


const secretKey = process.env.SECRET_KEY;



const getTeacherDashboard = async (req, res) =>{
    try {
        const userToken = req.cookies.userToken;
        let user;

        if (userToken) {
            const decodedToken = jwt.verify(userToken, `${secretKey}`);
            const userId = decodedToken.userId;
            console.log(userId)
            user = await UserModel.findById(userId);
        }

        res.render('teacherDashboard', { user });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
    };



const getCreateQuiz = (req, res) => {
    try {
        res.render('createQuiz');
    } catch (error) {
        console.log(error.message);
    }
};



const createQuizRequest = async(req, res) =>{
    try {
        const{title, questions} = req.body;
       

       const newQuiz = new QuizModel({ 

        title: title,
        questions: questions.map((question) => ({
        questionText: question.questionText,
        options: question.options,
        correctOption: parseInt(question.correctOption),
    })),
        
    });
       const savedQuiz = await newQuiz.save();
        // console.log(savedQuiz);

    res.redirect('/teacher-dashboard');
    } catch (error) {
        console.log(error.message);
    }
}


module.exports = {
    getTeacherDashboard, getCreateQuiz,createQuizRequest,}
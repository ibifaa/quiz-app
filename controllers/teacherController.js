const UserModel = require('../models/userModel');
const QuizModel = require('../models/quizModel');
const ResultModel =require('../models/resultModel')
const jwt = require('jsonwebtoken');



const getTeacherDashboard = async (req, res) =>{
    if(!req.session || !req.session.user){
        res.redirect('/login-form');
        return
    }
    
        const user = req.session.user;
        res.render('teacherDashboard', {user});
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
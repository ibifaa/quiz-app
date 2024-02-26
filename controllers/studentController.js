const UserModel = require('../models/userModel');
const QuizModel = require('../models/quizModel');
const ResultModel =require('../models/resultModel')
const jwt = require('jsonwebtoken');
const bcrypt = require ('bcrypt');
const {errorHandler} = require('../utils/error/errorHandler');

const secretKey = process.env.SECRET_KEY;




const getSignupForm = (req, res)=>{
    try {
        res.status(200).render('signupForm');
    } catch (error) {
        console.log(error.message)
    }
}

const signupRequest  = async(req, res) =>{
    try {
        const {name, username, email, password, role} = req.body;
        const userExist = await UserModel.findOne({username});
        if(userExist){
          throw new Error('user with this username already exist')
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUserDetails = new UserModel({
            name: name,
            username: username,
            email: email,
            password: hashedPassword,
            role: role
        });

        const savedUser = await newUserDetails.save();
        console.log(savedUser);
        res.status(201).redirect('/login')
    } catch (error) {
      console.log(error.message)
        res.status(500).json({error:error.message});
    }
}

const getLoginForm = (req, res)=>{
    try {
        res.status(200).render('loginForm');
    } catch (error) {
        console.log(error.message)
    }
}

const loginRequest = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await UserModel.findOne({ username });
        
                
        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                await jwt.sign({ userId: user._id, name: user.name, username:user.username}, `${secretKey}`, { expiresIn: '1h' },
                async(err, token)=> {
                    console.log(" The token is "+token)
                    
                    if(token) {
                        res.cookie("userToken", token);
                        res.status(200).json({
                            success: true,
                            user,
                        })
                    }
                    else {
                        throw new Error(err.message);
                    }
                })
            }
            else {
                throw new Error("incorrect password")
            }
        }
        else {
            throw new Error("invalid email address");
        }
    }
    catch (err) {
        const error = errorHandler(err);
        console.log(error);
        res.status(400).json({
            success: false,
            error
        });
    }
};


const logout = (req, res) => {
  req.session.destroy((err) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Failed to logout' });
      }
      res.clearCookie('session'); // Clear the session cookie
      res.json({ message: 'Logged out successfully' });
  });
};





const getStudentDashboard = async(req, res) =>{
    try {
        const userToken = req.cookies.userToken;
        let user;

        if (userToken) {
            const decodedToken = jwt.verify(userToken, `${secretKey}`);
            const userId = decodedToken.userId;
            console.log(userId)
            user = await UserModel.findById(userId);
        }

        const quizzes = await QuizModel.find();
        res.render('studentDashboard', { quizzes, user });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
}




    const getQuizQuestions = async (req, res) => {
        try {
          const quiz = await QuizModel.findById(req.params.id);
          res.render('takeQuiz', { quiz });
        } catch (error) {
          console.error('Error fetching quiz:', error);
          res.status(500).send('Internal Server Error');
        }
      };
    

const  getSingleQuiz =  async (req, res)=>{
    try {
        const {id} = req.params;
        const quizzes = await QuizModel.findById(id);
        res.status(200).render('singleQuiz', {quizzes, quizId:id});
    } 
    catch (error) {
        console.log(error.message)
    }
}



const submitQuiz = async (req, res) => {
    try {
        const userToken = req.cookies.userToken;
        let totalScore = 0;
      
        if (userToken) {
            const decodedToken = jwt.verify(userToken, `${secretKey}`);
            const userId = decodedToken.userId;
            let user = await UserModel.findById(userId);

            // Assuming quizId is available in req.params
            const { quizId } = req.params;

            // Retrieve the specific quiz using the ID
            const quiz = await QuizModel.findById(quizId);

            // Check if the quiz exists
            if (!quiz) {
                return res.status(404).send('Quiz not found');
            }

            // Calculate score for the quiz
            let score = 0;
            quiz.questions.forEach((question, index) => {
                const selectedOptionIndex = parseInt(selectedOptions[index], 10);
                const correctOptionIndex = question.correctOption;
                   
                if (selectedOptionIndex === correctOptionIndex) {
                    score++;
                }
            });

            // Update the total score
            totalScore = score;

            // Store quiz name and score in Results array
            user.Results.push({ quizName: quiz.name, score: score });

            // Render the dashboard with the total score
            return res.render('/student-dashboard', { totalScore });
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    getStudentDashboard,
    submitQuiz, 
    getSingleQuiz,
    getQuizQuestions,
    signupRequest,
    loginRequest,
    getLoginForm,
    getSignupForm,
    logout
}
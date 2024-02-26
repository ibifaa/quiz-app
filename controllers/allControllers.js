// const express = require('express');
// const UserModel = require('../models/userModel');
// const QuizModel = require('../models/quizModel');
// const cookieParser = require('cookie-parser');




// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');


// const secretKey =  process.env.SECRET_KEY;


// const getHomePage =  (req, res)=>{
//     try {
//         res.status(200).render('index');
//     } catch (error) {
//         console.log(error)
//     }
// }

// const getRegistrationForm = (req, res)=>{
//     try {
//         res.status(200).render('registrationForm');
//     } catch (error) {
//         console.log(error.message)
//     }
// }

// const userRegistrationRequest  = async(req, res) =>{
//     try {
//         const {name, username, email, password, role} = req.body;
//         const userExist = await UserModel.findOne({username});
//         if(userExist){
//           throw new Error('user with this username already exist')
//         }

//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt)

//         const newUserDetails = new UserModel({
//             name: name,
//             username: username,
//             email: email,
//             password: hashedPassword,
//             role: role
//         });

//         const savedUser = await newUserDetails.save();
//         console.log(savedUser);
//         res.status(201).redirect('/login-form')
//     } catch (error) {
//       console.log(error.message)
//         res.status(500).json({error:error.message});
//     }
// }

// const getLoginForm = (req, res)=>{
//     try {
//         res.status(200).render('loginForm');
//     } catch (error) {
//         console.log(error.message)
//     }
// }

// const loginRequest = async (req, res) => {
//     const { username, password } = req.body;
//     const user = await UserModel.findOne({ username, password });
//     try {
//         // Find the user based on the provided username
//         const user = await UserModel.findOne({ username });

//         if (user) {
//             // Compare the provided password with the hashed password stored in the database
//             const passwordMatch = await bcrypt.compare(password, user.password);

//             if (passwordMatch) {
//                 // Generate a JWT token
//                 const token = jwt.sign({ userId: user.id, username: user.username, role: user.role }, `${secretKey}`, { expiresIn: '1h' });
//                 if(user.role === 'student'){
//                     // Fetch quizzes or any necessary data here if needed
//                     const quizzes = await QuizModel.find();
//                     res.render('studentDashboard', { quizzes, user });
//                 } else if(user.role === 'teacher'){
//                     // Render the teacherDashboard or any other dashboard for teachers
//                     res.redirect('/teacher-dashboard');
//                 }
//                 // res.json({ token: token,
//                 //     user: {
//                 //         id: user.id,
//                 //         username: user.username,
//                 //         role: user.role,
//                 //         // Include other user details as needed
//                 //     }});
//             } else {
//                 // Password doesn't match
//                 res.status(401).send('Invalid username or password');
//             }
//         } else {
//             // User not found
//             res.status(401).send('Invalid username or password');
//         }
//     } catch (error) {
//         console.error('Error during login:', error);
//         res.status(500).send('Internal Server Error');
//     }
// };


// const logout = (req, res) => {
//   req.session.destroy((err) => {
//       if (err) {
//           console.error(err);
//           return res.status(500).json({ message: 'Failed to logout' });
//       }
//       res.clearCookie('session'); // Clear the session cookie
//       res.json({ message: 'Logged out successfully' });
//   });
// };


// const getStudentDashboard = async (req, res) => {
//     try {
//         // Get user information from the token payload
//         const user = req.user;
        
//         // Fetch quizzes (assuming QuizModel is a Mongoose model for quizzes)
//         const quizzes = await QuizModel.find();

//         // Render the studentDashboard view, passing quizzes and user data
//         res.render('studentDashboard', { quizzes, user });
//     } catch (error) {
//         console.error('Error fetching student dashboard:', error);
//         res.status(500).render('error', { message: 'Internal Server Error' });
//     }
// };


// // const getTakeQuiz = async (req, res) => {
// //         try {
// //             const quizId = req.params.id;
// //           const quiz = await QuizModel.findById(quizId);
// //           res.render('takeQuiz', {quizzes:quiz});
// //         } catch (error) {
// //           console.error('Error fetching quiz:', error);
// //           res.status(500).send('Internal Server Error');
// //         }
// //     }

//     const getQuizQuestions = async (req, res) => {
//         try {
//           const quiz = await QuizModel.findById(req.params.id);
//           res.render('takeQuiz', { quiz });
//         } catch (error) {
//           console.error('Error fetching quiz:', error);
//           res.status(500).send('Internal Server Error');
//         }
//       };
    

// const  getSingleQuiz =  async (req, res)=>{
//     try {
//         const {id} = req.params;
//         console.log(id);
//         const quizzes = await QuizModel.findById(id);
//         console.log(quizzes)
//         res.status(200).render('singleQuiz', {quizzes});
//     } 
//     catch (error) {
//         console.log(error.message)
//     }
// }

// // const submitQuiz = async (req, res) => {
// //     try {
// //       const selectedOptions = req.body.selectedOptions;
  
// //       const quizId = req.params.id;
// //       const quiz = await QuizModel.findById(quizId);
  
// //       let score = 0;
  
// //       quiz.questions.forEach((question, index) => {
// //         const selectedOptionIndex = parseInt(selectedOptions[index], 10);
// //         const correctOptionIndex = question.correctOption;
  
// //         if (selectedOptionIndex === correctOptionIndex) {
// //           score++;
// //         }
// //       });
  
// //       const userId = req.user._id;
  
// //       await UserModel.findByIdAndUpdate(
// //         userId,
// //         {
// //           $push: {
// //             scores: {
// //               quizId: quiz._id,
// //               score: score,
// //             },
// //           },
// //         },
// //         { new: true }
// //       );
  
// //       res.send(`Your score is: ${score}`);
// //     } catch (error) {
// //       console.log(error.message);
// //       res.status(500).send('Internal Server Error');
// //     }
// //   };

// const submitQuiz = async (req, res) => {
//     try {
//         const selectedOptions = req.body.selectedOptions;
//         console.log(selectedOptions)

//         const quizzes = await QuizModel.find();
        
//         let totalScore = 0;
  
//         const token = req.headers.authorization;
//         if (!token) {
//             return res.status(401).send('JWT must be provided');
//         }
//         console.log(token)

//         const decoded = jwt.verify(token, `${process.env.SECRET_KEY}`);
//         if (!decoded || !decoded.user) {
//             return res.status(401).send('Invalid JWT token');
//         }
        
//         const userId = decoded.user._id;
//         console.log(userId);
  
//         // Loop through each quiz
//         for (const quiz of quizzes) {
//             let score = 0;
  
//             // Loop through each question in the quiz
//             for (let i = 0; i < quiz.questions.length; i++) {
//                 const selectedOptionIndex = parseInt(selectedOptions[i], 10);
//                 const correctOptionIndex = quiz.questions[i].correctOption;
  
//                 if (selectedOptionIndex === correctOptionIndex) {
//                     score++;
//                 }
//             }
  
//             // Update the user's scores for each quiz
//             await UserModel.findByIdAndUpdate(
//                 userId,
//                 {
//                     $push: {
//                         scores: {
//                             quizId: quiz._id,
//                             score: score,
//                         },
//                     },
//                 },
//                 { new: true }
//             );
  
//             // Accumulate the score for all quizzes
//             totalScore += score;
//         }

//         console.log(totalScore)
  
//         // Update the user model with the total score
//         await UserModel.findByIdAndUpdate(
//             userId,
//             { $set: { totalScore: totalScore } },
//             { new: true }
//         );
  
//         res.redirect('/student-dashboard'); // Redirect without passing data
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send('Internal Server Error');
//     }
// };


//       const getTeacherDashboard = async (req, res) =>{
//         if(!req.session || !req.session.user){
//             res.redirect('/login-form');
//             return
//         }
        
//             const user = req.session.user;
//             res.render('teacherDashboard', {user});
//         };
    
    
    
//     const getCreateQuiz = (req, res) => {
//         try {
//             res.render('createQuiz');
//         } catch (error) {
//             console.log(error.message);
//         }
//     };
    
    
    
//     const createQuizRequest = async(req, res) =>{
//         try {
//             const{title, questions} = req.body;
           
    
//            const newQuiz = new QuizModel({ 
    
//             title: title,
//             questions: questions.map((question) => ({
//             questionText: question.questionText,
//             options: question.options,
//             correctOption: parseInt(question.correctOption),
//         })),
            
//         });
//            const savedQuiz = await newQuiz.save();
//             // console.log(savedQuiz);
    
//         res.redirect('/teacher-dashboard');
//         } catch (error) {
//             console.log(error.message);
//         }
//     }
    
    

// module.exports =
// {getHomePage,

// getRegistrationForm,
// userRegistrationRequest,

// getLoginForm,
// loginRequest,
// logout,

// getStudentDashboard,
// submitQuiz, 
// getSingleQuiz,
// getQuizQuestions,
// getTeacherDashboard, 
// getCreateQuiz,
// createQuizRequest,
//  }

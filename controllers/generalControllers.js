const express = require('express');
const UserModel = require('../models/userModel');
const QuizModel = require('../models/quizModel');
const cookieParser = require('cookie-parser');




const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const secretKey =  process.env.SECRET_KEY;


const getHomePage =  (req, res)=>{
    try {
        res.status(200).render('index');
    } catch (error) {
        console.log(error)
    }
}

const getRegistrationForm = (req, res)=>{
    try {
        res.status(200).render('registrationForm');
    } catch (error) {
        console.log(error.message)
    }
}

const userRegistrationRequest  = async(req, res) =>{
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
        res.status(201).redirect('/login-form')
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

    console.log('User:', user); // Log the user to verify its contents

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
   
     
  

    // Check if redirection logic is reached
    console.log('User role:', user.role); // Log the user's role
    if (user.role === 'student') {
      console.log('Redirecting to student dashboard');
      res.status(200).render('/student-dashboard');
    } else if (user.role === 'teacher') {
      console.log('Redirecting to teacher dashboard');
      res.redirect('/teacher-dashboard');
    }

    // If the user role is neither 'student' nor 'teacher', send the token as JSON response
    const token = jwt.sign({ userId: user._id }, `${secretKey}`, {
      expiresIn: '1h',
    });

    console.log('Sending token as response');
    // res.status(200).json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
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

module.exports =
{getHomePage,

getRegistrationForm,
userRegistrationRequest,

getLoginForm,
loginRequest,
logout

 }

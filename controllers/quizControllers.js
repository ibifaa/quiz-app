const UserModel = require('../models/userModel');


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

const getLoginForm = (req, res)=>{
    try {
        res.status(200).render('loginForm');
    } catch (error) {
        console.log(error.message)
    }
}


const userRegistrationRequest  = async(req, res) =>{
    try {
        const {name, username, email, password, role} = req.body;

        const newUserDetails = new UserModel({
            name: name,
            username: username,
            email: email,
            password: password,
            role: role
        });

        const savedUser = await newUserDetails.save();
        console.log(savedUser);
        res.status(201).redirect('/login-form')
    } catch (error) {
        console.log(error.message)
    }
}
module.exports = {getHomePage, getRegistrationForm, getLoginForm, userRegistrationRequest}
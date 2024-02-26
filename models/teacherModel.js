const mongoose = require('mongoose');
const {isEmail} = require('validator');


const passwordChecker = (value) => {
  let passwordRegex = /[!@#$%^&*(),.{}|<>]/;
  return passwordRegex.test(value);
}

const teacherSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true,
    },
  
    username:{
        type: String,
        required: true,
        unique: true,
      },

      email:{
        type: String,
        required: [true, "kindly enter an email address"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please enter a valid email"]
      },

    password:{
        type: String,
        required: true,
        validate:{
          validator: passwordChecker,
          message:"password must contain special characters or symbol"
        }
      },


}, {timestamps:true});

const UserModel = mongoose.model('Teacher', teacherSchema);

module.exports = UserModel;
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({

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
        required: true,
        unique: true,
      },

    password:{
        type: String,
        required: true,
      },
     
      role: { type: String, enum: ['teacher', 'student'], default: 'student' },
      is_active: { type: Boolean, default: true },

      Results:[{
        quizName:{type: String},
        score:{type: Number, default:0}
       
      }],


}, {timestamps:true});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
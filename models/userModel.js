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
     
      role: { type: String, enum: ['admin', 'user'], default: 'user' },
      is_active: { type: Boolean, default: true },
  
      created_at: { type: Date, default: Date.now },
      updated_at: { type: Date, default: Date.now },
    
});

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;
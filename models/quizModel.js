const mongoose = require('mongoose');

const commonFields = {
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  };

const quizSchema = new mongoose.Schema({
    entity_type: { type: String, required: true },
  
      // User Schema
      username:{
        type: String,
        required: true,
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
  
      // Exam Schema
    
      title:{
        type: String,
        required: true,
        unique: true,
      },
      
      questions: [{
        text: String,
        options: [String],
        correct_option: Number,
        is_active: { type: Boolean, default: true }, // Added is_active to Questions schema
      }],

      created_by: { type: Schema.Types.ObjectId, ref: 'quizApp' },
      is_active: { type: Boolean, default: true }, // Added is_active to Exam schema
  
      
  
      // Leaderboard Schema
      exam_id: { type: Schema.Types.ObjectId, ref: 'quizApp' },
      user_scores: [{
        user_id: { type: Schema.Types.ObjectId, ref: 'quizApp' },
        score: Number,
      }],
  
    ...commonFields,
});

const QuizModel = mongoose.model('quiz', quizSchema);

module.exports = QuizModel;
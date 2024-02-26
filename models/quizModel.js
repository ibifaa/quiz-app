const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  questions: [
    {
      questionText: {
        type: String,
        required: true,
      },
      options: [
        {
          type: [],
          required: true,
        },
      ],
 
      correctOption: {
        type: Number,
        required: true,
      },
    },
  ],
}, {timestamps:true});

const QuizModel = mongoose.model('Quiz', quizSchema);

module.exports = QuizModel;
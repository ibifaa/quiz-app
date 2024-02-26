const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true
    },
    results:{
        type: Array,
        default: []
    }
}, {timestamps: true});

const ResultModel = mongoose.model('result', resultSchema);

module.exports = {ResultModel};
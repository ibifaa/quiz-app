// const { MongoDBStore } = require('connect-mongodb-session');
const mongoose = require('mongoose');

async function connectDb(){
    try {
        const res = await mongoose.connect(process.env.MONGO_DB_URL)
    console.log("connect to db successfully")
        
    } catch (error) {
        console.log(error.message)
    }
}

// const store = new MongoDBStore({
//     uri: process.env.MONGO_DB_URL,
//   collection: 'sessions',
// })

module.exports = {connectDb};

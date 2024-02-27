const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser"); 
const {authenticateUser} = require('./middlewares/userAuth');
const homeRoute = require('./routes/homeRoute');
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');


const {connectDb} = require('./database/db');

require('dotenv').config();

const methodOverride = require('method-override');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');



const app = express();
const port = process.env.PORT || 4000;  

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(cookieParser());
app.use(  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60 * 60 * 24 },
  }));

app.set('view engine' , 'ejs');
app.use(express.static("public"));




// ROUTES MIDDLEWARES
app.use(homeRoute);
app.use(studentRoutes);
app.use(teacherRoutes);





(async function(){
    try {
        await connectDb();
    app.listen(port, ()=>{
        console.log(`Server is running in port: ${process.env.PORT}`)
    })
    } catch (error) {
        console.log(error.message)
    }
    
})()
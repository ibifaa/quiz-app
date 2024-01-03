const express = require('express');
const {connectDb} = require('./database/db');
const quizRoutes = require('./routes/quizRoutes');

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.set('view engine' , 'ejs');
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(quizRoutes);




(async function(){
    await connectDb();
    app.listen(port, ()=>{
        console.log(`Server is running in port: ${port}`)
    })
})()
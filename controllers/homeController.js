
const getHomePage =  (req, res)=>{
    try {
        res.status(200).render('index');
    } catch (error) {
        console.log(error)
    }
}

module.exports= {getHomePage}
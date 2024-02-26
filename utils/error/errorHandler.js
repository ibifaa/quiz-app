
function errorHandler(err){
    let errors = {email: "", password: ""}
    if(err.message == "this email is already registered"){
        errors.email = "This email is already used"
        return errors;
    }
    if(err.message == "incorrect password"){
        errors.password = "The password you entered is incorrect"
        return errors;
    }
    if(err.message == "invalid email address"){
        errors.email = "The email you entered does not exist"
        return errors;
    }
    if(err.message == "kindly enter an email address"){
        errors.email = "kindly enter an email address";
        return errors;
    }
    if(err.message == "admin validation failed: email: Please enter a valid email"){
       errors.email = "Please enter a valid email";
       return errors;
    }
    if(err.message == "kindly enter a password"){
       errors.password = "kindly enter a password";
       return errors;
    }
    if(err.message == 'Minimum password length is 6 characters'){
        errors.password = 'Minimum password length is 6 characters';
        return errors;
    }
    if(err.message == "Password must contain a special character/symbol"){
       errors.password = "Password must contain a special character/symbol";
       return errors;
    }
    return errors;
};

module.exports = {errorHandler};
const jwt = require('jsonwebtoken');

function authorizeTeacher(req, res, next) {
    const userToken = req.cookies.userToken;

    if (req.user && req.user.role === 'teacher') {
        return next(); // User is a teacher, continue to next middleware
    } else {
        return res.status(403).send('Forbidden: You must be a teacher to access this resource');
    }
}

module.exports = { authorizeTeacher };
const jwt = require('jsonwebtoken');

function authorizeTeacher(req, res, next) {
    if (req.user && req.user.role === 'teacher') {
        return next(); // User is a teacher, continue to the next middleware
    } else {
        return res.status(403).send('Forbidden'); // User is not authorized, send a Forbidden response
    }
}

module.exports = { authorizeTeacher };
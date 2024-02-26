const jwt = require('jsonwebtoken');

function authorizeStudent(req, res, next) {
    if (req.user && req.user.role === 'student') {
        return next(); // User is a student, continue to the next middleware
    } else {
        return res.status(403).send('Forbidden'); // User is not authorized, send a Forbidden response
    }
}

module.exports = { authorizeStudent };

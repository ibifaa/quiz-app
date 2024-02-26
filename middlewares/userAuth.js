const jwt = require('jsonwebtoken');

const secretKey =  process.env.SECRET_KEY;

const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.sendStatus(403);
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(401).send('Invalid token');
        }
        req.user = user;
        next();
})
};

module.exports = { authenticateUser };


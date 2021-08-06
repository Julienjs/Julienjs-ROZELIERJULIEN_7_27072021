const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './.env' });

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, '4bea540f75ac82d5dfea72aefd96d3c9');
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
        } else {
            next();
        }
    } catch {
        res.status(401).json({ error: error | 'Invalid request!' });
    }
};
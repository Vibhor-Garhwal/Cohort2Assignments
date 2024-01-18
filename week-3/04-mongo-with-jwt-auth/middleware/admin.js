// Middleware for handling auth
const jwt = require('jsonwebtoken');
const secret = require('../config');
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];

    const decoded = jwt.verify(jwtToken, secret);
    if (decoded.username) {
        next();
    }
    else {
        res.json({
            message: "You are not authorized"
        })
    }
    // try {
    //     jwt.verify(jwtToken, secret);
    //     next();
    // } catch (e) {
        
    // } 
    // console.log(jwtToken);
}

module.exports = adminMiddleware;
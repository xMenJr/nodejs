const jwt = require('jsonwebtoken')

class MiddlewareController {

    loginToken (req, res, next) {
        const token = req.headers.token
        if(token) {
            const accessToken = token.split(" ")[1]
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, data) => {
                if(err) {
                    res.status(403).json({ message: 'Token is not valid'})
                    return;
                }
                req.data = data;
                next();
            })
        }
        else {
            res.status(401).json({ message: 'You are not authenticated'})
        }
    }

    deleteToken (req, res, next) {
        const token = req.headers.token;
        if (token) {
            const accessToken = token.split(" ")[1];
                jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, data) => {
                    if(err) {
                        res.status(403).json({ message: 'Token is not valid' });
                        return;
                    }
                    if(data.id == req.params.id) {
                        req.data = data;
                        next();
                    }
                    else{
                        res.status(403).json({ message: 'You are not allowed to delete other' });
                    }
                });
            }
        else {
            res.status(401).json({ message: 'You are not authenticated' });
        }
    }
}

module.exports = new MiddlewareController
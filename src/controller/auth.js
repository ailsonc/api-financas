const jwt = require("jsonwebtoken")
     ,logger = require("../config/log")
     ,userModel = require("../model/user.model")
     ,crypt = require("../utils/crypt")
     ,SSO_SECRET = process.env.SSO_SECRET || "s3nh4";

/**
 * expiresIn: 300 sec is equal to 10 mins
 */
const signUserToken = user =>
    jwt.sign({
        user: user,
      }, SSO_SECRET, { expiresIn: '1h' })
;  

module.exports.authentication = async (req, res) => {
    try {
        const user = await userModel.getUser(req.body.email);

        if (user && await crypt.compare(req.body.password, user.password)) {
            return res.status(200).send({ 'x-access-token' : signUserToken(user) });       
        } else {
          res.status(400).send({ messege: "Invalid Authentication"});
        }
            
    } catch(error) {
        return res.status(400).send(error);
    }
}

module.exports.requireAuthentication = function(req, res, next) {
    try {
        var token = req.header('x-access-token'); 

        if(token) {
            logger.debug('Request ' + req.method + ' to ' + req.baseUrl);
            logger.debug('Token received. Decoding...');

            jwt.verify(token, SSO_SECRET, function(err, decoded) {   
                if (err) {
                    throw err;
                } else {
                    logger.debug('Token ACCEPTED');
                    logger.debug('Logged user: ' + decoded.email);
                    req.decoded = decoded;
                    next();
                }
            });

        } else {
            throw err;
        }
    } catch(error) {
        logger.error('No token received');
        return res.sendStatus(401);
    }
}
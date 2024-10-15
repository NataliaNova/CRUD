const tokens = require('../config/tokens.config');
const User = require('../models/user.model');

module.exports.checkSession = (req, res, next) => {
    try {
        const token = req.headers.cookie.split("=")[1];
        const userId = tokens.loadSession(token);
        
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        User.findOne( {_id:userId, verified: true} )
        .then((user) => {
            if (!user) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            req.user = user;

            next();
        })
        .catch((error) => {
            res.status(401).json({ error: error.message });
        });
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};  

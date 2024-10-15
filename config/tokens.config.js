const uuid = require('uuid').v4;
const sessionTokens = {};


module.exports.createSesssion= (userId) => {
    const token = uuid()

    sessionTokens[token] = userId;
    return token;
};

module.exports.loadSession = (token) => {
    return sessionTokens[token];
};
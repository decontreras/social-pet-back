const jwt = require('jsonwebtoken');

const generateJSW = (uid = '', complete = false) => {
    return new Promise((resolve, reject) => {
        const payload = { uid, complete }
        jwt.sign(payload, process.env.SECRET_KEY, (err, token) => {
            if (err) {
                reject('error generating token');
            } else {
                resolve(token);
            }
        })
    })
}

module.exports = {
    generateJSW
};
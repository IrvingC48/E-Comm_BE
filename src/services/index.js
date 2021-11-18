const jwt = require('jwt-simple');
const dayjs = require('dayjs');
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter');
const SECRET = process.env.SECRET;

const createToken = user => {
    const payload = {
        sub: user._id,
        iat: dayjs(Date.now()),
        exp: dayjs(Date.now()).add(1, 'day')
    };

    return jwt.encode(payload, SECRET);
};

const decodeToken = token => {
    dayjs.extend(isSameOrAfter);
    const decoded = new Promise((resolve, reject) => {
        try {
            const payload = jwt.decode(token, SECRET);

            const isExpiredToken = dayjs(Date.now()).isSameOrAfter(payload.exp)

            if (isExpiredToken) {
                return reject({
                    status: 401,
                    message: 'El token ha expirado'
                });
            };
            resolve(payload.sub);

        } catch (err) {
            return reject({
                status: 401,
                message: 'Token invalido'
            });
        };
    });

    return decoded;
};

// const refreshToken = (token, user) => {

// };

module.exports = {
    createToken,
    decodeToken
};

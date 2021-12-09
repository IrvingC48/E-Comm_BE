const services = require('../services');
const { User, Role } = require('../database/models');


const isAuth = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if (!token) {
        return res.status(401).send({
            message: 'Token no recibido'
        });
    };

    services.decodeToken(token)
        .then(response => {
            res.user = response
            req.userId = response
            next()
        })
        .catch(response => {
            return res.status(response.status).send({
                message: response.message
            });
        });
};

const isAdmin = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            return res.status(500).send({
                message: err
            });
        };

        Role.find({ _id: {$in: user.roles}}, (err, roles) => {
            if (err) {
                return res.status(500).send({
                    message: err
                });
            };

            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === 'admin') {
                    next();
                    return;
                };
            };

            return res.status(403).send({
                message: "Requiere Role de Admin"
            });
        });
    });
};

const authJwt = {
    isAuth,
    isAdmin
};

module.exports = authJwt

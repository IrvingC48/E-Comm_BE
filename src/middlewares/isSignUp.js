const { User, ROLES } = require('../database/models');

const validateDuplicateUserorEmail = (req, res, next) => {
    //Username
    User.findOne({
        userName: req.body.userName
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({
                message: err
            });
            return;
        };

        if (user) {
            res.status(400).send({
                message: 'El username ya existe'
            });
            return;
        };

        //Email
        User.findOne({
            email: req.body.email
        }).exec((err, user) => {
            if(err) {
                res.status(500).send({
                    message: err
                });
                return;
            };

            if (user) {
                res.status(400).send({
                    message: 'El email ya existe'
                });
                return;
            };

            next();
        });
    });
};

const validateRoleExist = (req, res, next) => {
    const resRole = req.body.roles;
    if (resRole) {
        for (let index = 0; index < resRole.length; index++) {
            if (!ROLES.includes(resRole[index])) {
                res.status(400).send({
                    message: `El Role ${resRole} no existe!`
                });
                return;
            };
        };
    };

    next();
};

const isSignUp = {
    validateDuplicateUserorEmail,
    validateRoleExist
};

module.exports = isSignUp;

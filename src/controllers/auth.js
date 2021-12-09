const mongoose = require('mongoose');
const { User, Role } = require('../database/models');
const service = require('../services');
const bcrypt = require('bcrypt');

const signUp = (req, res) => {
    const user = new User({
        email: req.body.email,
        userName: req.body.userName,
        password: req.body.password
    });

    user.save((err, saveUser) => {
        if (err) return res.status(500).send({
                message: `Error al crear el usuario: ${err}`
            });

        if (req.body.roles) {
            Role.find({ name: {$in: req.body.roles } }, (err, roles) => {
                if (err) {
                    return res.status(500).send({
                        message: `Error en el rol ${err}`
                    });
                };

                user.roles = roles.map(role => role._id);
                user.save((err, saveUser) => {
                    if (err)
                        res.status(500).send({
                            message: err
                        });

                    res.status(201).send({
                        message: 'Usuario creado existosamente',
                        id: saveUser._id,
                        token: service.createToken(user)
                    });
                })
            });
        } else {
            Role.findOne({ name: "user" }, (err, role) => {
                if (err) {
                    return res.status(500).send({
                        message: `Error en el rol ${err}`
                    });
                };

                user.roles = [role._id];
                user.save((err, saveUser) => {
                    if (err)
                        res.status(500).send({
                            message: err
                        });

                    res.status(201).send({
                        message: 'Usuario creado existosamente',
                        id: saveUser._id,
                        token: service.createToken(user)
                    });
                });
            });
        }
    });
};

const signIn = async (req, res) => {
    //Busca usuario por email
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        // return res.status(404).send({
        return res.status(404).send({
            message: 'Usuario o contraseña invalida'
        });
    };

    //Valida la contraseña
    const passIsValid = await bcrypt.compare(req.body.password, user.password);

    if (!passIsValid) {
        return res.status(401).send({
            message: 'Usuario o contraseña invalida'
        });
    };

    //Valida los roles del usuario
    const authorities = [];
    const ROLES = await Role.find({ _id: {$in: user.roles} });
    if (!ROLES) {
        return res.status(401).send({
            message: 'Usuario no cuenta con Role definido'
        });
    };

    for (let i = 0; i < ROLES.length; i++) {
        authorities.push("ROLE_" + ROLES[i].name.toUpperCase());
    };

    res.status(200).send({
        message: 'Te has logueado correctamente',
        id: user._id,
        userName: user.userName,
        email: user.email,
        roles: authorities,
        token: service.createToken(user)
    });
};

module.exports = {
    signUp,
    signIn
};
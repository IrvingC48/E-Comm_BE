const express = require('express');
const router = express.Router();
const { authJwt } = require('../middlewares');
const userCtrl = require('../controllers/users');

//middleware user
router.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Context-Type, Accept"
    );
    next();
});

// Acceso libre
router.get("/test/all", userCtrl.allAccess);
// Acceso usuario
router.get("/test/user", [authJwt.isAuth], userCtrl.userBoard);
// Acceso admin
router.get("/test/mod", [authJwt.isAuth, authJwt.isAdmin], userCtrl.adminBoard);


module.exports = router;

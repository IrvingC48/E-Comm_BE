const express = require('express');
const router = express.Router();

const { isSignUp } = require('../middlewares');
const controller = require('../controllers/auth')

router.use((req, res, next) =>{
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.post(
    "/signup",
    [isSignUp.validateDuplicateUserorEmail, isSignUp.validateRoleExist],
    controller.signUp
);

router.post("/signin", controller.signIn);

module.exports = router;
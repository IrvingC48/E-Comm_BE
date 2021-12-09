const express = require('express');
const router = express.Router();
const { authJwt } = require('../middlewares');
const categorieCtrl = require('../controllers/categories');

router.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Context-Type, Accept"
    );
    next();
});

//Obtiene todas las categorias
router.get('/', categorieCtrl.allCategories);
//Crea una categoría nueva
router.post('/', [authJwt.isAuth, authJwt.isAdmin], categorieCtrl.createCategorie)

module.exports = router;
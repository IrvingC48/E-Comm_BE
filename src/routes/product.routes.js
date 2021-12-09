const express = require('express');
const router = express.Router();
const { authJwt } = require('../middlewares');
const productCtrl = require('../controllers/products');

router.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Context-Type, Accept"
    );
    next();
});

//Obtiene todos los productos
router.get('/', productCtrl.allProducts);
//Obtiene un producto por _id
router.get('/:id', productCtrl.findById);
//Obtiene productos por categoria
router.get('/categorie/:categorie', productCtrl.findByCategorie);
//Obtiene productos por marca
router.get('/brand/:brand', productCtrl.findByBrand);
//Crea un producto nuevo
router.post('/', [authJwt.isAuth, authJwt.isAdmin], productCtrl.createProduct);

module.exports = router;
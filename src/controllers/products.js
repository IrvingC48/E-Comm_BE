const mongoose = require('mongoose');
const { Product } = require('../database/models')
const options = {
    limit: 32
};

//GETS
const allProducts = async (req, res) => {
    options.page = req.query.page || 1;
    const products = await Product.paginate({}, options);

    if (!products.docs.length) {
        return res.status(404).send({
            message: 'No hay productos existentes'
        });
    };

    res.status(200).send(products);
};

const findById = (req, res) => {
    Product.findById(req.params.id, (err, product) => {
        if (err) {
            return res.status(500).send({
                message: err
            });
        };

        if (!product) {
            return res.status(404).send('Product not found');
        };

        res.status(200).send(product);
    });
};

const findByCategorie = (req, res) => {
    options.page = req.query.page || 1;
    Product.paginate({ categories: {$in: req.params.categorie} }, options, (err, products) => {
        if (err) {
            return res.status(500).send({
                message: err
            });
        };

        if (!products.docs.length) {
            return res.status(404).send('Not products with that categorie');
        };

        res.status(200).send(products);
    });
};

const findByBrand = async (req, res) => {
    options.page = req.query.page || 1;
    const products = await Product.paginate({ brand: req.params.brand }, options);

    if (!products.docs.length) {
        return res.status(404).send({
            message: 'Products not found with this brand'
        });
    }

    res.status(200).send(products);
}

//POST
const createProduct = (req, res) => {
    const body = req.body;
    const product = new Product({
        name: body.name,
        brand: body.brand,
        imageUrl: body.imageUrl,
        description: body.description,
        sku: body.sku,
        price: body.price,
        stock: body.stock,
        isSale: body.isSale,
        shoeGender: body.shoeGender,
    });

    product.save((err) => {
        if (err) return res.status(500).send({
            message: `Error al crear el producto: ${err}`
        });

        if (body.sizes) {
            const sizes = body.sizes.split(",").sort((a,b) => a-b);
            product.sizes = sizes;
        };

        if (body.categories) {
            const categories = body.categories.split(",");
            let uniq = a => [...new Set(a)]; //Elimina los valores duplicados
            const categoriesUniq = uniq(categories);
            product.categories = categoriesUniq;
        };

        if (body.colors) {
            const colors = body.colors.split(",");
            product.colors = colors;
        };

        product.save(err => {
            if (err) return res.status(500).send({
                message: `Error fatal ${err}`
            });

            res.status(201).send({
                message: 'Producto creado correctamente'
            });
        });
    });
};

module.exports = {
    allProducts,
    findById,
    findByCategorie,
    findByBrand,
    createProduct
};
const mongoose = require('mongoose');
const { Categorie } = require('../database/models');

const allCategories = async (req, res) => {
    const categories = await Categorie.find();

    if(!categories.length) {
        return res.status(404).send({
            messsage: 'No hay categorias existentes'
        });
    };

    res.status(200).send(categories);
};

const createCategorie = (req, res) => {
    const categorie = new Categorie({
        name: req.body.name
    });

    categorie.save((err) => {
        if (err) return res.status(500).send({
            message: `Error al crear la categoria: ${err}`
        });

        res.status(201).send({
            message: 'Categoría creada correctamente'
        });
    });
};

module.exports = {
    allCategories,
    createCategorie
}
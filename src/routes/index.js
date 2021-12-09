const api = {};

api.userRouter = require('./user.routes');
api.authRouter = require('./auth.routes');
api.productRouter = require('./product.routes');
api.categorieRouter = require('./categorie.routes');

module.exports = api;

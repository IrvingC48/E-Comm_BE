const express =  require('express');
const cors = require('cors');
const dotenv = require('dotenv');
// Database
const db = require('./database/config');
//rutas
const {
    userRouter,
    authRouter,
    productRouter,
    categorieRouter
} = require('../src/routes');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/product', productRouter);
app.use('/categorie', categorieRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server corriendo en el puerto ${process.env.PORT}`)
    console.log(`=> Hora Server ${new Date(Date.now())}`)
});
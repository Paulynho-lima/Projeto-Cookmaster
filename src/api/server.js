const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = require('./app');
const { userControlCreate, createLogin } = require('../controllers/usersControllers');
const midllewareError = require('../midllewares/errorHandler');
const { recipesControlCreate, recipesControlAll,
     recipesControlById, 
     recipesControlUpdate, 
     recipesControlDelete, 
     recipesControlImage } = require('../controllers/recipesControllers');
const validAuth = require('../midllewares/errorAuth');
const upload = require('../utills/multer');

app.use(express.static(path.resolve(__dirname, '..', 'src/uploads')));

const PORT = 3000;

app.use(bodyParser.json());

app.post('/users', userControlCreate);
app.post('/login', createLogin);
app.post('/recipes', validAuth, recipesControlCreate);
app.get('/recipes', recipesControlAll);
app.get('/recipes/:id', recipesControlById);
app.put('/recipes/:id', validAuth, recipesControlUpdate);
app.delete('/recipes/:id', validAuth, recipesControlDelete);
app.put('/recipes/:id/image', validAuth, upload.single('image'), recipesControlImage);
app.use(midllewareError);

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));

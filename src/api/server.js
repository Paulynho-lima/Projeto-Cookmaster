const bodyParser = require('body-parser');
const app = require('./app');
const { userControlCreate, createLogin } = require('../controllers/usersControllers');
const midllewareError = require('../midllewares/errorHandler');
const { recipesControlCreate, recipesControlAll,
     recipesControlById, 
     recipesControlUpdate, 
     recipesControlDelete } = require('../controllers/recipesControllers');
const validAuth = require('../midllewares/errorAuth');

const PORT = 3000;

app.use(bodyParser.json());

app.post('/users', userControlCreate);
app.post('/login', createLogin);
app.post('/recipes', validAuth, recipesControlCreate);
app.get('/recipes', recipesControlAll);
app.get('/recipes/:id', recipesControlById);
app.put('/recipes/:id', validAuth, recipesControlUpdate);
app.delete('/recipes/:id', validAuth, recipesControlDelete);
app.use(midllewareError);

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));

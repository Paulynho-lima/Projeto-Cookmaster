const { recipesCreate, recipesAllGet, recipeById,
     recipesUpdate, 
     recipesDelete, 
     recipesAddImage } = require('../services/recipesServices');

const recipesControlCreate = async (req, res, next) => {
    try {
        const { name, ingredients, preparation } = req.body;
        const id = await recipesCreate(name, ingredients, preparation);

        const idu = req.user;

    return res.status(201)
      .json({ recipe: { name, ingredients, preparation, userId: idu, _id: id } });
    } catch (error) {
        console.log(`POST CREATERECIPES: ${error.message}`);
        next(error);
    }
};

const recipesControlAll = async (req, res, next) => {
    try {
        const all = await recipesAllGet();
        return res.status(200).json(all);
    } catch (error) {
        console.log(`POST GETALLRECIPE: ${error.message}`);
        next(error);
    }
};

const recipesControlById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const byId = await recipeById(id);
        
        return res.status(200).json(byId);
    } catch (error) {
        console.log(`POST GETRECIPESBYID: ${error.message}`);
        next(error);
    }
};

const recipesControlUpdate = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, ingredients, preparation } = req.body;
         await recipesUpdate(id, name, ingredients, preparation);

        const idu = req.user;

    return res.status(200)
      .json({ _id: id, name, ingredients, preparation, userId: idu });
    } catch (error) {
        console.log(`POST CREATERECIPES: ${error.message}`);
        next(error);
    }
};

const recipesControlDelete = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { bodys } = req.body;
         
       const del = await recipesDelete(id, bodys);
        return res.status(204).json(del);
    } catch (error) {
        console.log(`POST ERROR DELETERECIPES: ${error.message}`);
        next(error);
    }
};

const recipesControlImage = async (req, res, next) => {
  try {
      const { id } = req.params;
      const idu = req.user;
    
      const images = `localhost:3000/src/uploads/${id}.jpeg`;

        const add = await recipesAddImage(id);
        const { name, ingredients, preparation } = add;
        
       // console.log(add);
      return res.status(200)
      .json({ _id: id, name, ingredients, preparation, userId: idu, image: images });
  } catch (error) {
      console.log(`POST ERROR_ADDIMAGE: ${error.message}`);
      next(error);
  }
};

module.exports = {
    recipesControlCreate,
    recipesControlAll,
    recipesControlById,
    recipesControlUpdate,
    recipesControlDelete,
    recipesControlImage,
};

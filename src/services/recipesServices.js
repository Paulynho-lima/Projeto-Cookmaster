const Joi = require('joi');
const { createRecipes, getAllRecipes, getRecipesById,
   updateRecipes, 
   deleteRecipes } = require('../models/recipesModels');
 const errorMessages = require('../utills/errosUtills');

 const validRecipes = Joi.object({
    name: Joi.string().required().messages({
      'any.required': 'Invalid entries. Try again.',
    }), 
    ingredients: Joi.string().required().messages({
      'any.required': 'Invalid entries. Try again.',
    }),
    preparation: Joi.string().required().messages({
      'any.required': 'Invalid entries. Try again.',
    }), 
  }); 
  
const recipesCreate = async (name, ingredients, preparation) => {
    const { error } = validRecipes.validate({
      name, ingredients, preparation,
    });
    if (error) throw errorMessages(400, error.message); 

    const id = await createRecipes(name, ingredients, preparation);

    return id;
};

const recipesAllGet = async () => {
   const all = await getAllRecipes();

   return all;
};

const validId = Joi.object({
  id: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{24}$')).messages({
    'string.pattern.base': 'recipe not found',
  }), 
});

const recipeById = async (id) => {
  const { error } = validId.validate({ id });

  if (error) throw errorMessages(404, error.message);
  
  const byId = await getRecipesById(id);
   console.log(byId);
  return byId;
};

const recipesUpdate = async (id, name, ingredients, preparation) => {
   await updateRecipes(id, name, ingredients, preparation);
  console.log(id);
  return id;
};

const recipesDelete = async (id) => {
  await deleteRecipes(id);
};

module.exports = {
    recipesCreate,
    recipesAllGet,
    recipeById,
    recipesUpdate,
    recipesDelete,
};
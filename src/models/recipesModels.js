const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipes = async (name, ingredients, preparation) => {
    const connect = await connection();
    const { insertedId } = await connect.collection('recipes').insertOne({
        name, ingredients, preparation,
    });
    return insertedId;
};

const getAllRecipes = async () => {
    const connect = await connection();
    const all = await connect.collection('recipes').find({}).toArray();
    return all;
};

const getRecipesById = async (id) => {
    const connect = await connection();
    const byId = await connect.collection('recipes').findOne({ _id: ObjectId(id) });
    console.log(byId);
    return byId;
};

const updateRecipes = async (id, name, ingredients, preparation) => {
    const connect = await connection();
    const { insertedId } = await connect.collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } });

    return { id: insertedId };
};

const deleteRecipes = async (id) => {
    const connect = await connection();
    await connect.collection('recipes').deleteOne({ _id: ObjectId(id) });
};

const addImageRecipes = async (id, image) => {
  const connect = await connection();
  const add = await connect.collection('recipes')
    .update({ _id: ObjectId(id) }, { $set: { image } });
  
  return add;
};

module.exports = {
    createRecipes,
    getAllRecipes,
    getRecipesById,
    updateRecipes,
    deleteRecipes,
    addImageRecipes,
};
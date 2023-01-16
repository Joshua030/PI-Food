const express = require("express");
const router = express.Router();
const axios = require("axios");
const { findRecipe, findRecipeById, mapData } = require("../helpers/model");
const { Recipe,Diets } = require("../db");
const { Op } = require("sequelize");

const apiKey = "af3e2f1866f747d6997fcec100f1a4a3";

router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    const resp = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true&number=100`,
      {
        headers: { "Accept-Encoding": "gzip,deflate,compress" },
      }
    );
    const database = await Recipe.findAll({
      where: {
        title: name,
      },
    });
    const data = await findRecipe(resp.data.results, name);
    res.status(200).json([...database, ...data]);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.get("/search", async (req, res) => {
  try {
    // const bar2 = await Diets.create({ name: 'vegan' });
    // const bar1 = await Diets.create({ name: 'another-bar1' });
    //              await Recipe.create({title:'cauliflower', summary: 'pene'})
    const  database = await Recipe.findAll();
    // await database[0].setDiets(bar2)
    // await database[0].setDiets(bar1)
    // await database[0].addDiets([bar1, bar2])

    const result = await Recipe.findAll({ include: Diets });
    // const resp = await database[0].getDiets()
    // console.log(resp)
    const resp = await mapData(result);
    res.status(200).json(resp);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});


router.get("/:idReceta", async (req, res) => {
  try {
    const { idReceta } = req.params;
    const resp = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true&number=100`,
      {
        headers: { "Accept-Encoding": "gzip,deflate,compress" },
      }
    );
    let database = [];
    
    if (idReceta.length > 11) {
      database = await Recipe.findAll({
        where: {
          id: idReceta,
        },
         include: Diets 
      });
      databaseFiltered = await mapData(database)

    }
    const data = await findRecipeById(resp.data.results, idReceta);
    console.log("x:",data)
    if (data.length >0) return  res.status(200).json([...data]);
    res.status(200).json([...databaseFiltered]);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.post('/', async(req, res) => {
  const {title,summary,healthScore,diets,analyzedInstructions} = req.body;

  if(!title || !summary ) return res.status(404).send('Falta enviar datos obligatorios');
  try {
      const resp = await Recipe.create( {title,summary,healthScore,analyzedInstructions});
      // const  database = await Recipe.findAll();
      // const newDiets = JSON.parse(JSON.stringify(diets))
      // console.log(database[database.length-1])
    // const bar2 = await Diets.create({ name: 'vegan' });
    // const bar1 = await Diets.create({ name: 'another-bar1' });
    // await database[0].addDiet(diets)
    // 2. Find the Classes row
   
    const prueba = await Diets.findAll({
      where: {
        [Op.or]: diets,     
      }
    });
// const classRow = await Diets.findByPk(1);
// console.log(prueba)
// 3. INSERT the association in Enrollments table
await resp.addDiet(prueba, {through: 'recipe_roleId'});
    //  const promises = diets.map(e=> database[0].addDiets(e))
    // await database[database.length-1].addDiets([diets[0]])
    // await Promise.all(promises);
      // await database[database.length-1].addDiets({ name: "gluten free" })
    res.status(201).json(resp);
  } catch (error) {
    res.status(404).send("Error en alguno de los datos provistos");
  }
});


module.exports = router;

const express = require("express");
const router = express.Router();
const { Recipe,Diets } = require("../db")

router.get("/", async (req, res) => {
    try {
      const diets = [{ name: 'gluten free' },{ name: 'dairy free' },{ name: 'vegan' },{ name: 'ketogenic' },{ name: 'primal' },{ name: 'lacto ovo vegetarian' },{ name: 'whole 30' },{ name: 'pescatarian' }]
      const  database = await Diets.findAll();
      if(database.length === 0) {
    const promises =diets.map(e=>Diets.create(e))
    await Promise.all(promises);
}
const result = await Diets.findAll();
// res.send('OK');
      res.status(200).json(result);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });
  
  module.exports = router;
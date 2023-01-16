const { Router } = require("express");
const recipesList = require("./recipes");
const dietList = require("./diets")
const express = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use("/diets", dietList )
router.use("/recipes", recipesList);

module.exports = router;

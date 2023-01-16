const { DataTypes,Sequelize } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
   id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.literal("gen_random_uuid()"),
    primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    summary: {
      type: DataTypes.STRING,
      allowNull:false
    },
    healthScore: {
      type: DataTypes.INTEGER,
    
    },
    analyzedInstructions:{
    type:DataTypes.JSON,
    defaultValue: []
    }

  },{
    timestamps: false,
  });
};

const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    'country',
    {
      id: {
        type: DataTypes.STRING(3),
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      flag_img: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      continent: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      capital: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sub_region: {
        type: DataTypes.STRING,
      },
      area: {
        type: DataTypes.INTEGER,
      },
      population: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false,
    }
  );
};

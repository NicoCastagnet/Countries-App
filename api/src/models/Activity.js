const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    'activity',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      difficulty: {
        type: DataTypes.ENUM(
          'Super easy',
          'Easy',
          'Normal',
          'Hard',
          'Ultra Hard'
        ),
        allowNull: false,
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 24,
          isEven(value) {
            if (value > 24 || value < 1) {
              throw new Error('Duration must be between 1 & 24 hours.');
            }
          },
        },
      },
      season: {
        type: DataTypes.ENUM('Summer', 'Autumn', 'Winter', 'Spring'),
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
};

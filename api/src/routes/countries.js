const { Router } = require('express');
const axios = require('axios');
const { Country, Activity } = require('../db.js');
const { Op } = require('sequelize');

const router = Router();

// Getting API info.
const apiCall = async () => {
  const getApiData = await axios('https://restcountries.com/v3/all');
  const apiDataMap = await getApiData.data.map((e) => {
    return {
      id: e.cca3,
      name: e.name.common,
      flag_img: e.flags != null ? e.flags[1] : 'No image',
      continent: e.continents[0],
      capital: e.capital != null ? e.capital[0] : 'No data found.',
      sub_region: e.subregion,
      area: e.area,
      population: e.population,
    };
  });
  return apiDataMap;
};

router.get('/countries', async (req, res) => {
  const queryName = req.query.name; //Saving query name.

  try {
    //Checking if DB has any data.
    let fullDB = await Country.findAll({
      include: {
        model: Activity,
      },
    });

    if (!fullDB.length) {
      const countriesData = await apiCall(); //Saving api data into variable.
      await Country.bulkCreate(countriesData);
    }
  } catch (err) {
    console.log(err);
  }

  if (queryName) {
    const countryName = await Country.findAll({
      where: {
        name: {
          [Op.iLike]: `%${queryName}%`,
        },
      },
    });
    countryName.length
      ? res.status(200).send(countryName)
      : res.status(404).send('No data found.');
  } else {
    let fullDB = await Country.findAll({
      include: {
        model: Activity,
      },
    });
    res.status(200).send(fullDB);
  }
});

router.get('/countries/:id', async (req, res) => {
  const countryIDData = req.params.id;

  if (countryIDData) {
    const countryID = await Country.findByPk(countryIDData, {
      include: {
        model: Activity,
      },
    });
    countryID === null
      ? res.status(404).send('No data found.')
      : res.status(200).send(countryID);
  }
});

module.exports = router;

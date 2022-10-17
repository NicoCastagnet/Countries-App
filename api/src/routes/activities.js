const { Router } = require('express');
const { Activity, Country } = require('../db.js');

const router = Router();

router.get('/allactivities', async (req, res) => {
  try {
    let activities = await Activity.findAll({
      include: {
        model: Country,
      },
    });
    res.status(200).send(activities);
  } catch (error) {
    res.status(404).send('Error! ' + error);
  }
});

router.post('/activities', async (req, res) => {
  try {
    const { name, difficulty, duration, season, countries, url } = req.body;
    if (name && difficulty && duration && season && countries) {
      const [newActivity, created] = await Activity.findOrCreate({
        where: {
          name,
        },
        defaults: {
          difficulty,
          duration,
          season,
          url,
        },
      });

      if (created) {
        await newActivity.setCountries(countries);
      } else {
        return res.status(404).json('Nope');
      }
    } else {
      return res.status(404).json('Whoops! Missing data.');
    }
  } catch (error) {
    res.send(error);
  }
});

router.delete('/activities/:id', async (req, res) => {
  const activityNameData = req.params.id;

  try {
    await Activity.destroy({
      where: {
        id: activityNameData,
      },
    });
    res.status(200).json('Deleted');
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;

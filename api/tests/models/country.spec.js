const { Country, Activity } = require('../../src/db');
const { expect } = require('chai');

describe('Testing | Models', () => {
  beforeEach(async () => {
    await Country.sync({ force: true });
  });
  describe('Country:', () => {
    it("Model shouldn't be created without all requirements.", function (done) {
      Country.create({
        name: 'Argentina',
      })
        .then(() =>
          done(
            "Whoops! Something went wrong, model shouldn't have been created!"
          )
        )
        .catch(() => done());
    });
    it("Model shouldn't be created without all requirements.", function (done) {
      Country.create({
        difficulty: 'Hard',
      })
        .then(() =>
          done(
            "Whoops! Something went wrong, model shouldn't have been created!"
          )
        )
        .catch(() => done());
    });
  });

  describe('Activity:', function () {
    beforeEach(async function () {
      await Activity.sync({ force: true });
    });
    it("Model shouldn't be created without all requirements.", function (done) {
      Activity.create({
        name: 'Running',
      })
        .then(() =>
          done(
            "Whoops! Something went wrong, model shouldn't have been created!"
          )
        )
        .catch(() => done());
    });
    it('Activity name should be typeof string.', function () {
      expect(typeof Activity.name).equal('string');
    });
  });
});

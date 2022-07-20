const { getAllPlanets } = require('../../model/planets.model.js');

async function httpGetAllPlanets(req, res) {
    res.status(200).json(await getAllPlanets());
}

module.exports = httpGetAllPlanets;
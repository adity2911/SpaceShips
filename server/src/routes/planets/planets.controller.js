const { getAllPlanets } = require("../../model/planets.model.js").default;

export default async function httpGetAllPlanets(req, res) {
  res.status(200).json(await getAllPlanets());
}

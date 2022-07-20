const {
  getLaunchesData,
  scheduleNewLaunch,
  idExists,
  deleteIdFromData,
} = require("../../model/launches.model");

async function httpGetLaunchesData(req, res) {
  const launchesData = await getLaunchesData();
  return res.status(200).json(launchesData);
}

async function httpSetLaunchesData(req, res) {
  const data = req.body;

  if (!data.launchDate || !data.target || !data.rocket || !data.mission) {
    return res.status(400).json({ error: "Data is missing" });
  }

  data.launchDate = new Date(data.launchDate);
  if (isNaN(data.launchDate)) {
    return res.status(400).json({ error: "Invalid Launch Date" });
  }

  await scheduleNewLaunch(data);
  return res.status(201).json(data);
}

async function httpAbortLaunch(req, res) {
  const deleteId = Number(req.params.id);

  if (!(await idExists(deleteId))) {
    return res.status(404).json({ error: `Id: ${deleteId} does not exists..` });
  }

  const deleted = deleteIdFromData(deleteId);
  if (deleted) return res.status(200).json({ WordDone: true });
  return res.status(400).json({
    error: "Data couldnot be deleted",
  });
}

module.exports = { httpGetLaunchesData, httpSetLaunchesData, httpAbortLaunch };

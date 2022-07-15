const { getLaunchesData, addNewLaunch, idExists, deleteIdFromData } = require('../../model/launches.model');

function httpGetLaunchesData(req, res) {
    return res.status(200).json(getLaunchesData());
}

function httpSetLaunchesData(req, res) {
    const data = req.body;

    if (!data.launchDate || !data.target || !data.rocket || !data.mission) {
        return res.status(400).json({
            error: 'Data is missing',
        });
    }

    data.launchDate = new Date(data.launchDate);
    if (isNaN(data.launchDate)) {
        return res.status(400).json({
            error: "Invalid Launch Date"
        });
    }
    addNewLaunch(data);
    return res.status(201).json(data);
}

function httpAbortLaunch(req, res) {
    const deleteId = Number(req.params.id);

    if (!idExists(deleteId)) {
        return res.status(404).json({ error: `Id: ${deleteId} does not exists..` });
    }

    const deleted = deleteIdFromData(deleteId);
    return res.status(200).json(deleted);
}


module.exports = { httpGetLaunchesData, httpSetLaunchesData, httpAbortLaunch };
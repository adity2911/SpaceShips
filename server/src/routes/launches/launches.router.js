const express = require('express');
const { httpGetLaunchesData, httpSetLaunchesData, httpAbortLaunch } = require('./launches.controller');

const launchesRouter = express.Router();

launchesRouter.get('/', httpGetLaunchesData);
launchesRouter.post('/', httpSetLaunchesData);
launchesRouter.delete('/:id', httpAbortLaunch);

module.exports = launchesRouter;
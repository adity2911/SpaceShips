const launches = new Map();

let currentFlight = 100;
const launch = {
    flightNumber: 100,
    mission: 'Kepler ExplorationX',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27,2030'),
    target: 'Kepler-442b',
    customer: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,
};

launches.set(launch.flightNumber, launch);

function idExists(deleteId) {
    console.log(launches.has(deleteId));
    return launches.has(deleteId);
}

function getLaunchesData() {
    return (Array.from(launches.values()));
}

function addNewLaunch(launch) {
    currentFlight++;

    launches.set(
        currentFlight,
        Object.assign(launch, {
            flightNumber: currentFlight,
            upcoming: true,
            success: true,
            customer: ['ZTM', 'NASA'],
        })
    );
}

function deleteIdFromData(id) {
    const aborted = launches.get(id);
    aborted.upcoming = false;
    aborted.success = false;
    return aborted;
}

module.exports = {
    idExists,
    getLaunchesData,
    addNewLaunch,
    deleteIdFromData,
};
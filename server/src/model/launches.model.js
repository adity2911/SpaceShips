import { find, findOneAndUpdate, findOne, updateOne } from "./launches.mongo";
import planets from "./planets.mongoose";

async function getLaunchesData() {
  return await find({}, { _id: 0, __v: 0 });
}

async function saveLaunch(launch) {
  const planet = await planets.findOne({
    keplerName: launch.target,
  });

  if (!planet) {
    throw new Error("Planet is not A Habitable Planet!!");
  }

  await findOneAndUpdate({ flightNumber: launch.flightNumber }, launch, {
    upsert: true,
  });
}

async function getLatestFlightNumber() {
  const number = await findOne() //returns the topmost flightNumber after sorting the data from the database!!!
    .sort("-flightNumber");
  if (!number) {
    return 100; //default
  }
  return number.flightNumber + 1;
}

async function scheduleNewLaunch(launch) {
  let currentFlightNumber = await getLatestFlightNumber();

  const newLaunch = Object.assign(launch, {
    flightNumber: currentFlightNumber,
    upcoming: true,
    success: true,
    costumer: ["Sun Inc.", "NASA"],
  });
  try {
    await saveLaunch(newLaunch);
  } catch (e) {
    console.error(e);
  }
}

async function idExists(deleteId) {
  return await findOne({
    flightNumber: deleteId,
  });
}

async function deleteIdFromData(id) {
  const abortedFlight = await updateOne(
    { flightNumber: id },
    {
      success: false,
      upcoming: false,
    }
  );
  return abortedFlight.modifiedCount === 1;
}

export default {
  getLaunchesData,
  scheduleNewLaunch,
  idExists,
  deleteIdFromData,
};

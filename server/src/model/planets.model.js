import { parse } from "csv-parse";
import { createReadStream } from "fs";
import { join } from "path";

import habitablePlanets from "./planets.mongoose";

function isHabitable(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

async function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    createReadStream(join(__dirname, "..", "..", "data", "kepler_data.csv"))
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", (data) => {
        if (isHabitable(data)) {
          insertPlanets(data);
        }
      })
      .on("error", (err) => {
        console.log(err);
        reject(err);
      })
      .on("end", async () => {
        let habitablePlanetLength = (await getAllPlanets()).length;
        console.log(`Habitable Planets Found: ${habitablePlanetLength}`);
        resolve();
      });
  });
}

async function getAllPlanets() {
  return await habitablePlanets.find({});
}

async function insertPlanets(data) {
  try {
    await habitablePlanets.updateOne(
      { keplerName: data.kepler_name },
      { keplerName: data.kepler_name },
      { upsert: true }
    );
  } catch (e) {
    console.error(`Couldnot Insert the file to the database: ${e}`);
  }
}

export default { loadPlanetsData, getAllPlanets };

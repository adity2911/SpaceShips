import { createServer } from "http";
import { connection, connect } from "mongoose";

import app from "./app.js";
import { loadPlanetsData } from "./model/planets.model";

const PORT = process.env.PORT || 8000;
const mongoose_url =
  "mongodb+srv://nasa-cluster:0VVnsustQHrHHjDT@nasa-api.u6efh.mongodb.net/?retryWrites=true&w=majority";

const server = createServer(app);

connection.once("open", () => {
  console.log("Mongoose Connection stablished");
});

connection.on("error", (e) => {
  console.error(e);
});

async function listenServer() {
  connect(mongoose_url);
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`listening on PORT: ${PORT}`);
  });
}

listenServer();

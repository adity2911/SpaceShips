import express, { json } from "express";
import cors from "cors";
import { join } from "path";
import morgan from "morgan";
import plantetsRouter from "./routes/planets/planets.router";
import launchesRouter from "./routes/launches/launches.router";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(morgan("combined"));
app.use(json());
app.use(express.static(join(__dirname, "..", "public")));

app.use(plantetsRouter);
app.use("/launches", launchesRouter);
app.use("/*", (req, res) => {
  res.sendFile(join(__dirname, "..", "public", "index.html"));
});

export default app;

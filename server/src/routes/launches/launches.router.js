import { Router } from "express";
import {
  httpGetLaunchesData,
  httpSetLaunchesData,
  httpAbortLaunch,
} from "./launches.controller";

const launchesRouter = Router();

launchesRouter.get("/", httpGetLaunchesData);
launchesRouter.post("/", httpSetLaunchesData);
launchesRouter.delete("/:id", httpAbortLaunch);

export default launchesRouter;

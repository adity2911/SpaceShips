import { Router } from "express";

import httpGetAllPlanets from "./planets.controller";
const planetsRouter = Router();

planetsRouter.get("/planets", httpGetAllPlanets);

export default planetsRouter;

import express from "express";
import addRegister from "../controllers/addRegister.js";
import getRegisters from "../controllers/getRegisters.js";
import auth from "../middlewares/auth.js";

const routerRegisters = express.Router();

routerRegisters.post("/", auth, addRegister);

routerRegisters.get("/", auth, getRegisters);

export default routerRegisters;
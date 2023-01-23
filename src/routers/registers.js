import express from "express";
import addRegister from "../controllers/registers/addRegister.js";
import getRegisters from "../controllers/registers/getRegisters.js";
import auth from "../middlewares/auth.js";

const routerRegisters = express.Router();

routerRegisters.post("/", auth, addRegister);

routerRegisters.get("/", auth, getRegisters);

export default routerRegisters;
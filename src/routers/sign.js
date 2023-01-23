import express from "express";
import signin from "../controllers/signin.js";
import signout from "../controllers/signout.js";
import signup from "../controllers/signup.js";
import auth from "../middlewares/auth.js";
const signRouter = express.Router();

signRouter.post("/signin", signin);
signRouter.post("/signup", signup);
signRouter.delete("/signout", auth ,signout);

export default signRouter;
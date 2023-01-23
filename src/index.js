import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import signin from "./controllers/signin.js";
import signup from "./controllers/signup.js";
import routerRegisters from "./routers/registers.js";
import signout from "./controllers/signout.js";
import signRouter from "./routers/sign.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", signRouter);
app.use("/registers", routerRegisters);

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log("Error starting server :" + err.message);
  } else {
    console.log("Server started on port " + process.env.PORT);
  }
});

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import signin from "./controllers/signin.js";
import signup from "./controllers/signup.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.post("/signup", signup);

app.post("/signin", signin);

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log("Error starting server :" + err.message);
  } else {
    console.log("Server started on port " + process.env.PORT);
  }
});

import bcrypt from "bcrypt";
import { close, connect } from "../services/database/mongoDB.js";
import signupFormSchema from "../models/signupFormSchema.js";

export default async function signup(req, res) {
  const newUser = req.body;
  const validateResult = signupFormSchema.validate(newUser, {
    abortEarly: false,
  });

  if (validateResult.error) {
    return res.status(422).send(validateResult.error.details);
  }

  const encryptedPassword = bcrypt.hashSync(
    newUser.password + process.env.CUSTOM_PEPPER_KEY,
    10
  );

  delete newUser.confirmPassword;
  newUser.password = encryptedPassword;

  try {
    const db = await connect();
    await db.collection("users").insertOne(newUser);
    await close();
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send("Internal error: " + error);
  }
}

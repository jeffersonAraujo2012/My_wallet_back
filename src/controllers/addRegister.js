import registerScheme from "../models/registerScheme.js";
import { connect, close } from "../services/database/mongoDB.js";

export default async function addRegister(req, res) {
  const register = req.body;
  const validateResult = registerScheme.validate(register);

  if (validateResult.error)
    return res.status(422).send(validateResult.error.details);

  try {
    const db = await connect();

    await db.collection("registers").insertOne({
      userId: res.locals.userId,
      date: Date.now(),
      ...register,
    });

    return res.sendStatus(201);
  } catch (error) {
    return res.sendStatus(500);
  } finally {
    close();
  }
}

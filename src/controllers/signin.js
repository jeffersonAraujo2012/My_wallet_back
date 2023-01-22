import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import { connect, close } from "../services/database/mongoDB.js";
import signinFormSchema from "../models/signinFormSchema.js";

export default async function signin(req, res) {
  const user = req.body;
  const validateResult = signinFormSchema.validate(user);

  if (validateResult.error) {
    return res.status(422).send(validateResult.error.details);
  }

  try {
    const db = await connect();

    //verificar se usuário existe.
    const queryUser = await db
      .collection("users")
      .findOne({ email: user.email });

    if (!queryUser) return res.status(422).send("Email e/ou senha incorretos");

    //verificar se senha está correta.
    const passwordResult = bcrypt.compareSync(
      user.password + process.env.CUSTOM_PEPPER_KEY,
      queryUser.password
    );
    if (!passwordResult)
      return res.status(422).send("Email e/ou senha incorretos");

    //gerar o token do usuário
    const token = uuid();

    //registrar no coleção de sessoes.
    const session = {
      userId: queryUser._id,
      token: token,
    };

    //verificar se usuário já possui sessão registrada
    const findedSession = await db
      .collection("sessions")
      .findOne({ userId: queryUser._id });

    if (findedSession) {
      await db
        .collection("sessions")
        .updateOne({ userId: queryUser._id }, { $set: { token: token } });
      console.log("Token updated");
    } else {
      await db.collection("sessions").insertOne(session);
    }

    await close();

    //enviar token ao usuário.
    return res.status(201).send(token);
  } catch (error) {
    await close();
    return res.sendStatus(500);
  }
}

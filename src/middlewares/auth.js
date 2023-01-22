import { connect, close } from "../services/database/mongoDB.js";

export default async function auth(req, res, next) {
  const { authorization, user_email } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).send("Credenciais inválidas");
  }

  //verificar se sessão do token pertece ao usuário recebido
  try {
    const db = await connect();
    const findedUser = await db
      .collection("users")
      .findOne({ email: user_email });
    const findedSession = await db
      .collection("sessions")
      .findOne({ token: token });

    console.log(findedSession?.userId);
    console.log(findedUser?._id);
    console.log(typeof findedSession?.userId);
    console.log(findedSession.userId !== findedUser._id);
    if (
      !findedUser ||
      !findedSession ||
      !findedSession.userId.equals(findedUser._id)
    ) {
      return res.status(401).send("Credenciais inválidas");
    }
    
    res.locals.userId = findedUser._id;
    next();
  } catch (error) {
    return res.sendStatus(500);
  } finally {
    await close();
  }
}

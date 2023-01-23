import { connect, close } from "../services/database/mongoDB.js";

export default async function signout(req, res) {
  const userId = res.locals.userId;

  try {
    const db = await connect();
    await db.collection("sessions").deleteOne({ userId: userId });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).send("Something has been faild on internal process");
  } finally {
    await close();
  }
}

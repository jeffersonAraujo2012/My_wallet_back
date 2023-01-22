import { connect, close } from "../services/database/mongoDB.js";

export default async function getRegisters(req, res) {
  const userId = res.locals.userId;

  try {
    const db = await connect();
    
    const findedRegisters = await db
      .collection("registers")
      .find({ userId: userId })
      .toArray();
    
    findedRegisters.reverse();
    
    return res.status(200).send(findedRegisters);
  } catch (error) {
    return res.sendStatus(500);
  } finally {
    await close();
  }
}

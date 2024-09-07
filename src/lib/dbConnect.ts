import mongoose from "mongoose";
import { DB_NAME } from "../../contants";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already Connected to database");
    return;
  }
  try {
    const db = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}` || "",
      {}
    );
    // console.log("db =", db);

    connection.isConnected = db.connections[0].readyState;
    // console.log("db.connections =", db.connections);

    console.log("DB connected Successfully");
  } catch (error) {
    console.log("Database connection failed", error);

    process.exit(1);
  }
}
export default dbConnect;

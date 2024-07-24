import mongoose from "mongoose";

const dbUrl: string = process.env.CONNECTION_STRING ?? "";
const dbUser: string = process.env.DB_USERNAME ?? "";
const dbPass: string = process.env.DB_PASSWORD ?? "";

const options = {
  user: dbUser,
  pass: dbPass,
};

export const createDBConnection = async () => {
  try {
    await mongoose.connect(dbUrl, options);
    console.log("Database Connected!");
  } catch (error: any) {
    console.log("Error connecting Database", error);
    setTimeout(createDBConnection, 5000);
  }
};

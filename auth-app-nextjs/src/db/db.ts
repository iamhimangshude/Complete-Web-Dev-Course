import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB connected successfully!");
    });
    connection.on("error", (err) => {
      console.error(
        "MongoDB connection error. Please ensure MongoDB is running or check if connection string is valid. Err:" +
          err
      );
    });
  } catch (error) {
    console.log("Something goes wrong!");
    console.log(error);
  }
}

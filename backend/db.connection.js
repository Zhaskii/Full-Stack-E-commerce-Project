import mongoose from "mongoose";

const dbName = "mini-project";
const dbUserName = "vscode";
const dbPassword = encodeURIComponent("vscode123");
const dbHost = "cluster0.4kulq.mongodb.net";
const dbOptions = "retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    const url = `mongodb+srv://${dbUserName}:${dbPassword}@${dbHost}/${dbName}?${dbOptions}`;

    await mongoose.connect(url);

    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("Database Connection Failed!");
    console.log(error.message);
    process.exit(1);
  }
};

export default connectDB;

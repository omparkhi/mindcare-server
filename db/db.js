import mongoose from "mongoose";
import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

function connectDB() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("mongoDB connected successfully");
    })
    .catch((err) => {
      console.error("❌ MongoDB connection failed:", err.message);
    });
}

export default connectDB;

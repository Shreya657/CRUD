const mongoose = require("mongoose");
const dotenv = require("dotenv");


const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: process.env.DB_NAME,  // ✅ dbName option use karo
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB Connected 🚀");
  } catch (err) {
    console.error("Error connecting to the database:", err);
    process.exit(1);
  }
};

module.exports = { connectDb };

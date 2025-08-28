// deleteAllUsers.js
import mongoose from "mongoose";
import User from "./models/user.model.js"; // adjust the path if needed
import dotenv from "dotenv";

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// Delete all users
const deleteAllUsers = async () => {
  try {
    const result = await User.deleteMany({});
    console.log(`${result.deletedCount} users deleted`);
    mongoose.connection.close();
  } catch (err) {
    console.log(err);
    mongoose.connection.close();
  }
};

deleteAllUsers();

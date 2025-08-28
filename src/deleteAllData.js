// deleteAllMessages.js
import mongoose from "mongoose";
import Message from "./models/message.model.js"; // adjust path if needed
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from backend folder
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// Verify the URI
if (!process.env.MONGODB_URI) {
  console.error("Error: MONGODB_URI not found. Check your .env file!");
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Delete all messages
const deleteAllMessages = async () => {
  try {
    const result = await Message.deleteMany({});
    console.log(`${result.deletedCount} messages deleted`);
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
    mongoose.connection.close();
  }
};

deleteAllMessages();

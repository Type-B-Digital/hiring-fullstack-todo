import dotenv from "dotenv";
dotenv.config();

export const mongo_uri =
  process.env.mongodb_url ||
  "mongodb+srv://test:test@cluster0.aioene4.mongodb.net/todoApp?retryWrites=true&w=majority&appName=Cluster0";
export const port = process.env.port || 8000;

import express from "express";
import cors from "cors";
import todoRoutes from "./routes/todoRoutes";
import { errorHandler } from "./middlewares/errorHandler";
import { connectDB } from "./config/db";
import { port } from "./config";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/todos", todoRoutes);

app.use(errorHandler);

(async () => {
  await connectDB();
  app.listen(port, (err?: Error) => {
    if (err) console.log(err);
    console.log(`Server is running on port: ${port}`);
  });
})();

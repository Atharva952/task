import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/user.route";
import feedBackRoutes from "./routes/feedback.route";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT;
const db = process.env.MONGO_URL;
const dbName = process.env.MONGO_DB_NAME;

app.use(
  cors({
    origin: ["http://localhost:5174"],
  }),
);

mongoose
  .connect(db, { dbName })
  .then(async () => {
    console.log(`mongodb is connected (${dbName})`);
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

app.use("/api/user", userRouter);
app.use("/api/user", feedBackRoutes);

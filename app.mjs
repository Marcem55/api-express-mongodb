import express from "express";
import mongoose from "mongoose";
import { userRoute } from "./routes/users.mjs";
import { courseRoute } from "./routes/courses.mjs";
import { authRoute } from "./routes/auth.mjs";
import "dotenv/config";

mongoose
  .connect(process.env.HOST)
  .then(() => console.log("Conected to MongoDB"))
  .catch((err) => console.log("Cannot conect to MongoDB...", err));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRoute);
app.use("/api/courses", courseRoute);
app.use("/api/auth", authRoute);

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});

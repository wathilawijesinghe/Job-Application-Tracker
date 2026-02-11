import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Job Tracker API running"));
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

connectDB();
app.listen(process.env.PORT || 5000, () => console.log("Server started"));

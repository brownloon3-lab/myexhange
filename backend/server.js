import express from "express";
import dotenv from "dotenv";
import {connectDB } from "./src/config/connectDB.js";
import rateRoutes from "./src/routes/rateRoutes.js";
import cors from "cors";

const app = express();
dotenv.config();
app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.use(cors());
app.use(express.json());
app.use("/api/rate", rateRoutes);
const PORT = process.env.PORT || 5000;
connectDB().then(async () => {
    console.log("MongoDB connected");

    app.listen(PORT, () => {
        console.log("Server started on Port:", PORT);
    });
});
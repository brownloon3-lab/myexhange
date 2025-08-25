import express from "express";
import { todayRate, updateRate } from "../controllers/rateController.js";
import { Rate } from "../models/Rate.js";
const rateRoutes = express.Router();

rateRoutes.post("/", todayRate);
rateRoutes.put("/:id", updateRate);
rateRoutes.get("/", async (req, res) => {
  try {
    const rates = await Rate.find().sort({ date: -1 }).limit(10);
    res.json(rates);
  } catch (error) {
    console.error("Error fetching rates:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default rateRoutes;

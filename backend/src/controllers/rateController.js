import {Rate} from "../models/Rate.js";

// Save today's exchange rate
export const todayRate = async (req, res) => {
    try { 
        const  { thbToMmk, mmkToThb } = req.body;
        const newRate = new Rate({ thbToMmk, mmkToThb });
        await newRate.save();   
        res.json(newRate);
    }catch (error) {
        console.error("Error saving today's rate:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

export const updateRate = async (req, res) => {
    try {
        const { id } = req.params;
        const { thbToMmk, mmkToThb } = req.body;
        const updatedRate = await Rate.findByIdAndUpdate(
            id,
            { thbToMmk, mmkToThb },
            { new: true }
        );
        if (!updatedRate) {
            return res.status(404).json({ message: "Rate not found" });
        }
        res.json(updatedRate);
    } catch (error) {
        console.error("Error updating rate:", error);
        res.status(500).json({ message: "Server Error" });
    }
}
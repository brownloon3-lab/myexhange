import mongoose from "mongoose";

const rateSchema = new mongoose.Schema({
    date : { type: Date,  default: Date.now  },
    thbToMmk: { type: Number, required: true },
    mmkToThb: { type: Number, required: true }
});

export const Rate = mongoose.model("Rate", rateSchema);